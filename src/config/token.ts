/*
 * @Author: zeHua
 * @Date: 2021-11-04 13:33:27
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-04 13:58:37
 * @FilePath: /zhjt/src/config/token.ts
 */
const TokenKey = "user";
export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token: any) {
  const tokens = JSON.stringify(token);
  localStorage.setItem(TokenKey, tokens);
}

export function removeToken() {
  localStorage.removeItem(TokenKey);
}
export function getmyToken() {
  return localStorage.getItem(TokenKey);
}
