import * as cheerio from 'cheerio';
import { PornVideo } from '../../DocumentDB';
import { timeStringToSeconds } from '../Shared';
import PornScrapeBaseModule from '../Shared/base.module';

class ThreeMovsService extends PornScrapeBaseModule {
  constructor(url = 'https://www.3movs.com') {
    super(url);
    this.url = url;
    this.service_name = '3movs';
    this.category_path = '/categories/';
    this.category_list_path = '#list_categories_categories_list_items > .thumb_cat > a';
    this.video_list_path = '#list_videos_common_videos_list_items > div > div';
  }

  categoryPathSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode) {
    return $(element).attr('href') as string;
  }

  categoryTitleSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode) {
    let title = $(element).find('.title').text().split(' ');
    return title.length === 2 ? title[0] : title.slice(0, -1).join('-');
  }

  videoInfoSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): PornVideo {
    return {
      video_title: $(element).find('a').attr('title') as string,
      video_image: $(element).find('a > img').attr('src') as string,
      video_link: $(element).find('a').attr('href') as string,
      video_source: '3movs',
      video_length: timeStringToSeconds($(element).find('.time').text()),
      video_preview_link: $(element).find('img').attr('data-preview') as string,
      video_original_id: $(element).find('.ico-fav-0').attr('data-fav-video-id') as string,
    };
  }
}

export default ThreeMovsService;
