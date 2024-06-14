import { Browser, Page, launch } from 'puppeteer';
import { HEADLESS_STATUS } from '../Config/app.config';

export interface IPuppeteer {
  browser: Browser;
  page: Page;
}

export class PuppeteerService {
  async startDesktopBrowser(): Promise<IPuppeteer> {
    const launchOptions = {
      headless: JSON.parse(HEADLESS_STATUS),
      args: ['--no-sandbox'],
    };

    const browser = await launch(launchOptions);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    return { browser, page };
  }

  async closeBrowser(browser: Browser): Promise<void> {
    const pages = await browser.pages();
    await Promise.all(pages.map((p: Page) => p.close()));
    await browser.close();
  }
}

export const puppeteerService = new PuppeteerService();
