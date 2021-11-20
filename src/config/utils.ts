/*
 * @Author: zeHua
 * @Date: 2021-11-04 13:33:27
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-20 10:51:07
 * @FilePath: /zhjt/src/config/utils.ts
 */
export class Utils {

 /**
  * 设置localStrong
  * @param  name 设置localStrong参数名称 
  * @param  content 设置localStrong参数内容
  */
  static setStore(name: string,content: string) {
    if (!name) return;
    if (typeof content !== 'string') {
      // tslint:disable-next-line:no-parameter-reassignment
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name,content);
  }

  /**
   * 获取 localStorage的值
   * @param name localStrong的key
   */
  static getStore(name: string) {
    if (!name) return undefined;
    return window.localStorage.getItem(name);
  }

  /**
   * 删除 localStrorage 
   * @param name localStrong的key
   */
  static removeStore(name: string) {
    if (!name) return;
    return window.localStorage.removeItem(name);
  }
}



