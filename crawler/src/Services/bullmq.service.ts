import { Queue, Worker } from 'bullmq';
import { REDIS_HOST, REDIS_PORT } from '../Config/app.config';

class BullMQService {
  private readonly queue: Queue;
  private readonly queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
    this.queue = new Queue(queueName, { connection: { host: REDIS_HOST || '127.0.0.1', port: REDIS_PORT || 6379 } });
  }

  async addJob(jobName: string, data: any) {
    await this.queue.add(jobName, data);
  }
}

export default BullMQService;
