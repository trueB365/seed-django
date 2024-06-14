import PornScrapeBaseModule from '../Shared/base.module';

class XgroovyService extends PornScrapeBaseModule {
  constructor(url = 'https://xgroovy.com/') {
    super(url);
    this.url = url;
    this.service_name = 'Xgroovy';
    this.category_path = '/genres/';
    this.category_list_path = '.__pagination__items > .col > .card-scene-genre';
    this.video_list_path = '.__pagination__items > .col > .card-scene';
  }
}
