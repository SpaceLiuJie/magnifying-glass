import request from '../utils/request.js'

/**
 * 获取去商品列表 
 * @param {String} page 第几页
 * @returns 
 */
export function searchShopList(word){
    // 注意: 执行getShopList时候,返回值是promise
    // promise有:
    // 1:promiseStatus: 记录任务状态
    // 2:promiseValue 存放服务响应的数据
    return request({
        url:'/api/search',
        method:'get',
        params:{
            word,
        }
    })
}