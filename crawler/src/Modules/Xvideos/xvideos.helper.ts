import * as cheerio from "cheerio";
import request from "request";
import Video, { IVideo } from "../../Database/models/Video.model";
import db from "../../Database";

export interface IXvideoDetails {
  title?: string;
  videoUrlHigh?: string;
  videoUrlLow?: string;
  preview?: string;
}

export const generateXvideosScrappingResult = (URL: string) => {
  request(URL, async (err: any, response: any, html: any) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const parentContainer = $(".mozaique")
        .find(".thumb-block")
        .find(".thumb-under");

      // @ts-ignore
      parentContainer.each(async (i, element) => {
        const videoLink = $(element).find("a").attr("href");
        const video_dt = await getVideoDetails(
          `https://xvideos.com${videoLink}`
        );

        const VideoItem: IVideo = {
          video_title: $(element).find("a").attr("title") as string,
          video_link: video_dt.url,
          video_url: `https://xvideos.com${videoLink}`,
          video_keyword: video_dt.tags,
          video_image: $(element)
            .prev()
            .find(".thumb")
            .find("img")
            .attr("data-src") as string,
          video_length: $(element).find(".metadata").find(".duration").text(),
          video_source: "xvideos",
        };
        console.log(VideoItem);
        try {
          const video = db.getRepository(Video);
          await video.create(VideoItem);
        } catch (error) {
          console.log(error);
          throw new Error("sequelize failed");
        }
      });
    }
  });
};

export const getVideoDetails = (
  URL: string
): Promise<{ url: string; tags: string }> => {
  return new Promise((resolve, reject) => {
    request(URL, async (err: Error, response: any, html: any) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const getVideoPlayerScript = $("#video-player-bg")
          .find("link")
          .next()
          .html();
        //        console.log(getVideoPlayerScript);
        let videoTagList = "";
        $(".video-metadata ul li > a.is-keyword").each((i, el) => {
          videoTagList += $(el).text() + ",";
        });
        console.log(videoTagList.slice(0, -1));
        // @ts-ignore
        const getVideoUrlHigh = getVideoPlayerScript.match(
          /setVideoUrlHigh+\('+([a-zA-Z0-9]).+(?='\))/g
        );
        // @ts-ignore
        const getVideoUrlLow = getVideoPlayerScript.match(
          /setVideoUrlLow+\('+([a-zA-Z0-9]).+(?='\))/g
        );

        if (getVideoUrlHigh) {
          resolve({
            url: getVideoUrlHigh[0].split("('")[1],
            tags: videoTagList.slice(0, -1),
          });
        } else if (getVideoUrlLow) {
          resolve({
            url: getVideoUrlLow[0].split("('")[1],
            tags: videoTagList.slice(0, -1),
          });
        } else {
          resolve({ url: "", tags: videoTagList.slice(0, -1) });
        }
      } else {
        reject(err);
      }
    });
  });
};
