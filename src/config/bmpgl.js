/*
 * @Author: zeHua
 * @Date: 2021-11-20 10:50:51
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-28 14:49:42
 * @FilePath: /zhjt/src/config/bmpgl.js
 */
export function BMPGL(ak) {
  console.log()
  return new Promise(function(resolve, reject) {
    window.init = function() {
      // eslint-disable-next-line
      // console.log(BMapGL);
      resolve(window.BMapGL)
    }
    if(!window.BMapGL){

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://api.map.baidu.com/api?v=3.0&type=webgl&ak=${ak}&callback=init`
    script.onerror = reject
    document.head.appendChild(script)
  }else{
    resolve(window.BMapGL)

  }
  })
}
