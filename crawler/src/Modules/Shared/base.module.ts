import { Page } from 'puppeteer';
import * as cheerio from 'cheerio';
import { PuppeteerClusterService } from '../../Services/puppeteer.cluster.service';
import logger from '../../Config/logger.config';
import { PornVideo } from '../../DocumentDB';
import { puppeteerService } from '../../Services/puppeteer.service';

export interface SearchableTags {
  title: string;
  path: string;
}

export interface PornModuleScrapeEsssential {
  url: string;
  category_path: string;
  video_path: string;
  category_list_path: string;
  video_list_path: string;
  getCategories: (page: Page) => Promise<SearchableTags[]>;
  paginate: (url: string, title: string) => SearchableTags[];
  scrapeVideosBasedOnCategory: () => void;
}

class PornScrapeBaseModule extends PuppeteerClusterService implements PornScrapeBaseModule {
  url: string;
  category_path: string;
  video_path: string;
  category_list_path: string;
  video_list_path: string;
  service_name: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public categoryTitleSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): string {
    return '';
  }

  public categoryPathSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): string {
    return '';
  }

  public videoInfoSchema($: cheerio.CheerioAPI, element: cheerio.AnyNode): PornVideo {
    return {
      video_title: 'video title',
      video_image: '',
      video_link: '',
      video_source: '',
      video_length: 0,
    };
  }

  protected async getCategories(page: Page): Promise<SearchableTags[]> {
    await page.goto(`${this.url}/${this.category_path}`.replace(/\/{2,}/g, '/'));
    const html = await page.content();
    const $ = cheerio.load(html);
    let categories: SearchableTags[] = [];

    $(this.category_list_path).each((_, element) => {
      categories = [
        ...categories,
        ...this.paginate(this.categoryPathSchema($, element), this.categoryTitleSchema($, element)),
      ];
    });

    return categories;
  }

  protected paginate(url: string, title: string): SearchableTags[] {
    const pageUrls: SearchableTags[] = [];
    for (let i = 1; i < 10; i++) {
      pageUrls.push({ path: `${url}/${i}/`.replace(/\/{2,}/g, '/'), title });
    }
    return pageUrls;
  }

  protected async getVideos(page: Page, data: SearchableTags) {
    logger.info(`Fetching videos from ${data.path} for ${data.title} category`);
    await page.goto(data.path);
    const html = await page.content();
    const $ = cheerio.load(html);
    const videos: PornVideo[] = [];

    $(this.video_list_path).each((_, element) => {
      videos.push(this.videoInfoSchema($, element));
    });
  }

  public timeStringToSeconds(timeString: string) {
    const parts = timeString.split(':');
    let seconds = 0;

    if (parts.length === 2) {
      // Format: "MM:SS"
      const minutes = parseInt(parts[0], 10);
      seconds = parseInt(parts[1], 10);
      seconds += minutes * 60;
    } else if (parts.length === 3) {
      // Format: "HH:MM:SS"
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      seconds = parseInt(parts[2], 10);
      seconds += hours * 3600 + minutes * 60;
    }

    return seconds;
  }

  public async scrapeVideosBasedOnCategory() {
    logger.info(`============================================================`);
    const { page, browser } = await this.startDesktopBrowser();
    const categories: SearchableTags[] = await this.getCategories(page);
    logger.info(`Found ${categories.length} categories to scrape for ${this.service_name}`);
    this.closeBrowser(browser);

    // Fetch videos from each category
    const cluster = await this.createCluster<SearchableTags>();
    await cluster.task(async ({ page, data }) => this.getVideos(page, data));

    categories.forEach((category) => {
      cluster.queue(category);
    });
    await cluster.idle();
    await cluster.close();
    logger.info(`${this.service_name} scrapping has completed successfully.`);
    logger.info(`============================================================`);
  }
}

export default PornScrapeBaseModule;
