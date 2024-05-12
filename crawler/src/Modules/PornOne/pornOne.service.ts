import PornScrapeBaseModule from '../Shared/base.module';
import * as cheerio from 'cheerio';
import { PornVideo } from '../../DocumentDB';

class PornOneService extends PornScrapeBaseModule {
  constructor(url = 'https://www.pornone.com') {
    super(url);
    this.url = url;
    this.service_name = 'PornOne';
    this.category_path = '/categories/';
    this.category_list_path = 'main.flex-grow > div:nth-child(2) > .alpha-cont > .grid';
    this.video_list_path = 'a.vidLinkFX';
  }

  categoryPathSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): string {
    return $(element).find('a').attr('href') as string;
  }

  categoryTitleSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): string {
    return $(element).find('a > p').text();
  }

  videoInfoSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): PornVideo {
    return {
      video_title: $(element).find('.card-scene__text > a').text(),
      video_image: $(element).find('div > img').attr('src') as string,
      video_link: $(element).attr('href') as string,
      video_source: 'pornone',
      video_length: this.timeStringToSeconds($(element).find('div > span > span:first-child').text()),
      video_original_id: $(element).find('div > img').attr('id') as string,
    };
  }
}

export default PornOneService;
