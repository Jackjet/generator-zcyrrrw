/**
 * Created by chenkaixia on 2017/5/4.
 */
import request  from 'utils/request';

export function getMenus(data) {
  return request({
    url: '/api/article/list',
    method: 'get',
    params:data
  });
}
