import PornScrapeBaseModule from '../Shared/base.module';
import * as cheerio from 'cheerio';
import { PornVideo } from '../../DocumentDB';

class BlackPornTubeService extends PornScrapeBaseModule {
  constructor(url = 'https://blackporn.tube') {
    super(url);
    this.url = url;
    this.service_name = 'blackporntube';
    this.category_path = '/categories/';
    this.category_list_path = 'div.thumbs > .thumb > a';
    this.video_list_path = 'div.thumbs > .thumb > a';
  }

  categoryPathSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): string {
    return `${this.url}/${$(element).find('a').attr('href')}`.replace(/\/{2,}/g, '/');
  }

  categoryTitleSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): string {
    return $(element).find('div.thumb__info > h2.thumb__title thumb__title_h2').text();
  }

  videoInfoSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): PornVideo {
    return {
      video_title: $(element).find('.thumb__info > .thumb__title').text(),
      video_image: $(element).find('.thumb_img > img').attr('src') as string,
      video_link: $(element).attr('href') as string,
      video_source: 'blackporntube',
      video_length: this.timeStringToSeconds($(element).find('.thumb_img > .thumb__duration').text()),
      video_original_id: $(element).find('.thumb_img > img').attr('data-video-id') as string,
    };
  }
}

export default BlackPornTubeService;
