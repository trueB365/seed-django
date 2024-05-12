import * as cheerio from 'cheerio';
import PornScrapeBaseModule, { SearchableTags } from '../Shared/base.module';
import { PornVideo } from '../../DocumentDB';

class AnalVidsService extends PornScrapeBaseModule {
  constructor(url = 'https://analvids.com') {
    super(url);
    this.url = url;
    this.service_name = 'AnalVids';
    this.category_path = '/genres/';
    this.category_list_path = '.__pagination__items > .col > .card-scene-genre';
    this.video_list_path = '.__pagination__items > .col > .card-scene';
  }

  categoryPathSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode) {
    return $(element).find('a').attr('href') as string;
  }

  categoryTitleSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode) {
    return $(element).find('.card-scene__info > .card-scene__title').text();
  }

  timeStringToSeconds(timeString: string): number {
    let time_component = timeString.split(' ');
    return time_component.slice(0, -1)[0] === 'h'
      ? parseInt(time_component[0]) * 3600
      : parseInt(time_component[0]) * 60;
  }

  videoInfoSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): PornVideo {
    return {
      video_title: $(element).find('.card-scene__text > a').text(),
      video_image: $(element).find('.card-scene__view > a > img').attr('src') as string,
      video_link: $(element).find('.card-scene__view > a').attr('href') as string,
      video_source: 'analvids',
      video_length: this.timeStringToSeconds(
        $(element).find('.card-scene__view > .card-scene__time > .label--time').text(),
      ),
      video_preview_link: $(element).find('.card-scene__view > a').attr('data-preview') as string,
      video_original_id: $(element).attr('data-content') as string,
    };
  }
}

export default AnalVidsService;
