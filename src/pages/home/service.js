import { request } from '../../utils/request';

export async function queryHots() {
  return request('/bbs/all-gambia');
}

export async function query(plate) {
  return request(`/mbbs/${plate}`);
}
