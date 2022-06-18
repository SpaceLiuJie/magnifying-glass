import request from '../utils/request.js'

export function login(user) {
    return request({
        url: '/api/login',
        method: 'get',
        params:{
            ...user, // ... 展开运算符，获取user所有的key-value 添加到 params中
        }
    })
}