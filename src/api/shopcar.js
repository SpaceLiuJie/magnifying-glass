import request from '../utils/request.js'
export  function getShopCarList(data){
     return request({
        url:'/api/shoplist',
        method:'get',
        params:{
            ...data
        }
     }) 
}
// 删除列表请i去
export function deletCar(data){
    // toke username goodid
    return request({
        url: "/api/del",
        method: 'get',
        params: {
            ...data
        }
    })
}