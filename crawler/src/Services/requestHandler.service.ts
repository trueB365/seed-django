import * as cheerio from 'cheerio';
import request from 'request';

export default class RequestHandler {
  public static async fetchHTMLPage(url: string) {
    request(url, (err: any, response: any, html: any) => {
      if (!err && response.statusCode === 200) {
        return cheerio.load(html);
      } else {
        return 'Failed to fetch the content';
      }
    });
  }
}
