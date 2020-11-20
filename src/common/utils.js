export function debounce(func,delay){
  let timer = null
  return (...arg)=>{
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      func.apply(this,...arg)
    },delay)
  }
}