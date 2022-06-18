export function get(key){
    let str =  localStorage.getItem(key);
    if(!str){
      return
    }
    let reg= /[\{\[]/g
    if(str.match(reg).length !==0 ){
      return JSON.parse(str)
    }
    return str
  }
  export function set(key,value){
      return localStorage.setItem(key,value)
  }
  export function remove(key){
      localStorage.removeItem(key)
  }
  export function clear(){
      localStorage.clear()
  }
  