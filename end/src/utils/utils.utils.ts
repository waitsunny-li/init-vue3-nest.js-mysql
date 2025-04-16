import crypto from 'crypto';
import dayjs from 'dayjs';

export class Utils {
    /**
     * @description: 生成订单
     * @param {} 
     * @return {string}  
     */
    static generateOrderNumber(): string {
      const timestamp = dayjs().format('YYYYMMDDHHmmss');
      const randomBytes = crypto.randomBytes(4).toString('hex');
      return `${timestamp}${randomBytes}`;
    }
}