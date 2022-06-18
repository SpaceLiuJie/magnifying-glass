import request from '../utils/request.js'
export function getDetail(goodId){
    return request({
        url: "/api/detail",
        method: "get",
        params: {
            goodId,
        }
    })
}
//获取相关商品
export function getShopList(type_one){
    return request({
        url: "/api/goodlist",
        method: "get",
        params: {
            type_one
        }
    })
}
export function addShopCar(data) {
    return request({
        url: "/api/add",
        method: "get",
        params: {
            ...data,
        }
    })
}
export function reduceShopCar(data) {
    return request({
        url: "/api/remove",
        method: "get",
        params: {
            ...data,
        }
    })
}

