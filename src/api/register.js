import request from '../utils/request.js'
// import { serve } from '../utils/request.js'
// console.log(serve);
export function register(user) {
    return request({
        url: '/api/register',
        method: 'get',
        params:{
            ...user, // ... 展开运算符，获取user所有的key-value 添加到 params中
        }
    })
    // return serve({
    //     url: '/api/register',
    //     method: 'get',
    //     params:{
    //         ...user, // ... 展开运算符，获取user所有的key-value 添加到 params中
    //     }
    // })
}