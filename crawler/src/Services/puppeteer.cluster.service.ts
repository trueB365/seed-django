import { Cluster } from 'puppeteer-cluster';

export class PuppeteerClusterService {
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
