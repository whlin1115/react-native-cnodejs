import { get, post } from '../../utils/request';
import { moment } from '../../utils/tool';

export async function createTopic(params) {
  return post('/topics', params);
}

export async function updateTopic(params) {
  return post('/topics/update', params);
}
