// 防抖
// fn 函数是: 每隔多长事件才能执行一次
// time 控制fn函数执行的事件
// todo: 做成混入还是做成指令.
//      做指令
export function _debounce(fn, time) {
    // 1: 接受限定时间
    let delay = time || 200; 
    // 2: 接受setTimeOut定时器
    let timer;
    return function () {
        const _this = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn(args);
            // fn.apply(_this, args); // 修改节流函数中this
        }, delay);
    };
}

