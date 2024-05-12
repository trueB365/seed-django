import PornScrapeBaseModule from '../Shared/base.module';
import * as cheerio from 'cheerio';
import { PornVideo } from '../../DocumentDB';

class XvideosService extends PornScrapeBaseModule {
  constructor(url = 'https://www.xvideos.com/') {
    super(url);
    this.url = url;
    this.service_name = 'xvideos';
    this.category_path = '/tags/';
    this.category_list_path = 'ul#tags > li > a';
    this.video_list_path = 'div.mozaique > div';
  }

  categoryPathSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): string {
    return `${this.url}/${$(element).find('a').attr('href')}`.replace(/\/{2,}/g, '/');
  }

  categoryTitleSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): string {
    return $(element).find('b').text().trim();
  }

  timeStringToSeconds(timeString: string): number {
    let time_component = timeString.split(' ');
    return time_component.slice(0, -1)[0] === 'h'
      ? parseInt(time_component[0]) * 3600
      : parseInt(time_component[0]) * 60;
  }

  videoInfoSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): PornVideo {
    return {
      video_title: $(element).find('.thumb-under > p.title > a').text(),
      video_image: $(element).find('.thumb-inside > .thumb > a > img').attr('src') as string,
      video_link: $(element).find('.thumb-inside > .thumb > a').attr('href') as string,
      video_source: 'blackporntube',
      video_length: this.timeStringToSeconds($(element).find('.thumb-under > p.title > a > span').text()),
      video_original_id: $(element).attr('data-id') as string,
    };
  }
}

export default XvideosService;
