/*
 * @Author: zeHua
 * @Date: 2021-11-04 13:33:12
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-24 20:40:51
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

  /**
   * 获取省级数据
   * @param provinceName 省级名称
   * @returns
   */
  public static getProvinces(provinceName: string) {
    /* tslint:disable  */

  
    return request({
      url: "http://localhost:8080/beijing.json",
      method: "get",
    });
  }

  /**
   *  获取监控数据
   * @param event  事件 key值
   * @param pageNum  页数
   * @param pageSize  每页数量
   * @returns 
   */
  public static getMonitorData(event: string,pageNum?:number,pageSize?:number,vehicleCard?:string) {
    let data={
      event:event,
      body:{
        pageNum:pageNum,
        pageSize:pageSize,
        vehicleCard:vehicleCard
      }
    }
    /* tslint:disable  */
    return request({
      url: `http://192.168.0.24:8080/monitor`,
      method: "post",
      data
    });
  }
  
  
}

