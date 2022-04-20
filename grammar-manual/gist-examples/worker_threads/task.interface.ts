import { Worker } from 'worker_threads'

export interface WorkerInstance {
  worker: Worker;
  status: boolean;
  index: number;
}

export interface WorkMessage {
  index: number;
}

export interface ParentMessage {
  index: number;
  checkRet: number;
}
