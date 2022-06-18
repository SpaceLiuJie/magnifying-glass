import request from '../utils/request';

/*
* 获取商品列表
* @param {String} page第几页
* @returns
 */

export function getShopList(page) {
    /* 注意: 执行get ShopList时候,返回值是promise
    promise有:
        1: promisStatus:记录状态任务
        2: promiseValue 存放服务响应的数据 */
    return request ({
        url:'/api/goodlist',
        method: 'get',
        params:{
            page,
        }
    })
}
