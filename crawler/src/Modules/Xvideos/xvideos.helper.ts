import * as cheerio from 'cheerio';
import request from 'request';
import Video from '../../Database/models/Video.model';

export interface IListXvideos {
  title?: string;
  videoLink?: string;
  thumbImage?: string;
  source?: string;
  duration?: string;
  accountName?: string;
  accountLink?: string;
}

export interface IXvideoDetails {
  title?: string;
  videoUrlHigh?: string;
  videoUrlLow?: string;
  preview?: string;
}

export const generateXvideosScrappingResult = (URL: string) => {
  return new Promise((resolve, reject) => {
    request(URL, async (err: any, response: any, html: any) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const parentContainer = $('.mozaique').find('.thumb-block').find('.thumb-under');

        let VideoItem: IListXvideos = {};
        const VideoList: any = [];

        parentContainer.each((i, element) => {
          const title = $(element).find('a').attr('title');
          const videoLink = $(element).find('a').attr('href');
          const thumbImage = $(element).prev().find('.thumb').find('img').attr('data-src');
          const accountName = $(element).find('.metadata').find('a').find('.name').text();
          const accountLink = $(element).find('.metadata').find('a').attr('href');
          const duration = $(element).find('.metadata').find('.duration').text();
          const source = 'Xvideos';
          VideoItem = {
            title,
            videoLink,
            thumbImage,
            accountName,
            accountLink,
            duration,
            source,
          };
          VideoList.push(VideoItem);
        });
        resolve(VideoList);
      } else {
        reject('Ooop....failed to load data');
      }
    });
  });
};

const getNeccesaryVideoDetails = (JSONString: string) => {
  const convertedJSON = JSON.parse(JSONString);
  let VideoItem: IListXvideos = {};
  const VideoList: any = [];
  convertedJSON.map((video: any) => {
    const title = video.tf;
    const videoLink = video.u;
    const thumbImage = video.i;
    const accountName = video.p;
    const accountLink = video.pu;
    const duration = video.d;
    const source = 'Xvideos';
    VideoItem = {
      title,
      videoLink,
      thumbImage,
      accountName,
      accountLink,
      duration,
      source,
    };
    VideoList.push(VideoItem);
  });
  return VideoList;
};

export const getVideoDetails = (URL: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    request(URL, async (err: Error, response: any, html: any) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(html);
        let videoDetails: IXvideoDetails = {};

        const getVideoPlayerScript = $('#video-player-bg').find('link').next().html();
        const getRelatedVideoList = $('#video-player-bg').find('#html5video').prev().html();
        const previewPoster = $('#video-player-bg').find('img').attr('src');

        // @ts-ignore
        const JSONString: string = getRelatedVideoList.match(/\[+.+\]/g);
        const relatedVideoJSON = await getNeccesaryVideoDetails(JSONString);

        // @ts-ignore
        const getVideoTitle = getVideoPlayerScript.match(/setVideoTitle+\('+([a-zA-Z0-9]).+(?='\))/g)[0];
        // @ts-ignore
        const getVideoUrlHigh = getVideoPlayerScript.match(/setVideoUrlHigh+\('+([a-zA-Z0-9]).+(?='\))/g)[0];
        // @ts-ignore
        const getVideoUrlLow = getVideoPlayerScript.match(/setVideoUrlLow+\('+([a-zA-Z0-9]).+(?='\))/g)[0];
        videoDetails = {
          title: getVideoTitle.split("('")[1],
          videoUrlHigh: getVideoUrlHigh.split("('")[1],
          videoUrlLow: getVideoUrlLow.split("('")[1],
          preview: previewPoster,
        };
        resolve({ videoDetails, relatedVideos: relatedVideoJSON });
      } else {
        reject(err);
      }
    });
  });
};
