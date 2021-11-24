/*
 * @Author: zeHua
 * @Date: 2021-11-20 10:50:51
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-24 19:56:36
 * @FilePath: /zhjt/src/config/bmpgl.js
 */
export function BMPGL(ak) {
  return new Promise(function(resolve, reject) {
    window.init = function() {
      // eslint-disable-next-line
      resolve(BMapGL)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?v=2.0&type=webgl&ak=${ak}&callback=init`
    script.onerror = reject
    document.head.appendChild(script)
  })
}
