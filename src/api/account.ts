/*
 * @Author: zeHua
 * @Date: 2021-11-04 13:33:12
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-04 14:22:04
 * @FilePath: /zhjt/src/api/account.ts
 */
import request from "../config/request";
const api = "/api/account/";

export class Account {
  /**
   * 登录
   * @param userName 用户名
   * @param password 用户密码
   */
  public static login(userName: string, password: string) {
    // let data = {
    //   username: userName,
    //   password: password,
    // };
    // return request({ url: api + "signin", method: "post", data });
  }
  /**
   * 前台登出方法
   */
  public static signOut() {
    return request({ url: api + "signout", method: "get" });
  }

  public static getCityList() {
    return request({
      url: "./data-1528971808162-BkOXf61WX.json",
      method: "get",
    });
  }
}
