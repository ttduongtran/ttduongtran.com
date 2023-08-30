import BaseRequest from '../BaseRequest';
/**
 * key base on host:port
 */
export default class BlogRequest extends BaseRequest {
  getBlogs() {
    const url = '/blogs';
    return this.get(url);
  }
}
