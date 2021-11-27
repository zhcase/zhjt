/*
 * @Author: zeHua
 * @Date: 2021-11-20 10:50:51
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-27 11:16:25
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
    script.src = `http://api.map.baidu.com/api?v=2.0&type=webgl&ak=${ak}&callback=init`
    script.onerror = reject
    document.head.appendChild(script)
  }else{
    resolve(window.BMapGL)

  }
  })
}
