import { Queue, Worker } from 'bullmq';
import ModeGenerate from './generate';

const QUEUE_NAME = 'default'

if (!process.env.REDIS_HOST) console.warn('REDIS_HOST is not defined.')

const connection = {
    host: process.env.REDIS_HOST
}

type JobName = 'generateSubmissions'
export const myQueue = new Queue(QUEUE_NAME, {
    connection
});

const worker = new Worker(QUEUE_NAME, async job => {
    if(job.name === 'generateSubmissions') {
        const submissions = await ModeGenerate.submission()
        console.log(submissions);
    }  
  }, {
    connection
  });

export const enqueue = async (job:JobName, data?:any) => {
  await myQueue.add(job, data)
}