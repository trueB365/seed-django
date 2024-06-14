import { Cluster } from 'puppeteer-cluster';
import { PuppeteerService } from './puppeteer.service';

export class PuppeteerClusterService extends PuppeteerService {
  async createCluster<T>() {
    return await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_PAGE,
      maxConcurrency: 20,
      puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });
  }
}

export const puppeteerClusterService = new PuppeteerClusterService();
