import * as cheerio from 'cheerio';
import { Page } from 'puppeteer';
import logger from '../../Config/logger.config';
import { puppeteerClusterService } from '../../Services/puppeteer.cluster.service';
import { PuppeteerService } from '../../Services/puppeteer.service';
import { PornVideo, PornCollection } from '../../DocumentDB';
import { timeStringToSeconds } from '../Shared';

interface IThreeMovsCategories {
  path: string;
  title: string;
}

export class ThreeMovsService extends PuppeteerService {
  private url: string;

  constructor(url = 'https://www.3movs.com') {
    super();
    this.url = url;
  }

  private async getCategories(page: Page): Promise<IThreeMovsCategories[]> {
    await page.goto(`${this.url}/categories/`);
    const html = await page.content();
    const $ = cheerio.load(html);
    let categories: IThreeMovsCategories[] = [];
    $('#list_categories_categories_list_items > .thumb_cat > a').each((_, element) => {
      categories = [
        ...categories,
        ...this.paginate($(element).attr('href') as string, $(element).find('.title').text().split(' ')[0]),
      ];
    });

    return categories;
  }

  private async getVideos(page: Page, data: IThreeMovsCategories) {
    await page.goto(data.path);
    const html = await page.content();
    const $ = cheerio.load(html);
    const videos: PornVideo[] = [];
    $('#list_videos_common_videos_list_items > div > div').each((_, element) => {
      videos.push({
        video_title: $(element).find('a').attr('title') as string,
        video_image: $(element).find('a > img').attr('src') as string,
        video_link: $(element).find('a').attr('href') as string,
        video_source: '3movs',
        video_length: timeStringToSeconds($(element).find('.time').text()),
        video_preview_link: $(element).find('img').attr('data-preview') as string,
      });
    });

    if (videos.length > 0) {
      await PornCollection.insertMany(videos);
    }
  }

  private paginate(url: string, title: string): IThreeMovsCategories[] {
    const pageUrls: IThreeMovsCategories[] = [];
    for (let i = 1; i < 10; i++) {
      pageUrls.push({ path: `${url}/${i}/`, title });
    }
    return pageUrls;
  }

  public async getVideoDetails() {
    const { page, browser } = await this.startDesktopBrowser();
    const categories: IThreeMovsCategories[] = await this.getCategories(page);
    this.closeBrowser(browser);

    // Fetch videos from each category
    const cluster = await puppeteerClusterService.createCluster<IThreeMovsCategories>();
    await cluster.task(async ({ page, data }) => this.getVideos(page, data));

    categories.forEach((category) => {
      cluster.queue(category);
    });
    await cluster.idle();
    await cluster.close();
    logger.info('3movs scrapping has completed successfully.');
  }
}
