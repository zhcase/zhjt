<!--
 * @Author: zeHua
 * @Date: 2021-11-18 09:55:13
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-18 16:55:34
 * @FilePath: /zhjt/src/components/content/components/userDetail.vue
-->
<template>
  <dv-border-box-11
    title="详情内容"
    style="height: auto; width: 500px"
    backgroundColor="rgba(15, 46, 132, 0.77)"
  >
   <!-- 人员信息 -->
    <div class="user-content">
     
      <div class="personnel-info">
        <div class="title">
          <img src="@/assets/images/yellow-title.png" />人员信息
        </div>
        <div class="content">
          <div class="role">上报人：</div>
          <div class="desc">
            <ul>
              <li>李四</li>
              <li>13888888888</li>
              <li>xx去--xx项目--xx事情</li>
            </ul>
          </div>
          <div style="color: rgba(236, 67, 174, 1)">登高证/电工证</div>
        </div>
         <div class="content">
          <div class="role">配合人：</div>
          <div class="desc">
            <ul>
              <li>小狗</li>
              <li>13888888888</li>
              <li>xx去--xx项目--xx事情</li>
            </ul>
          </div>
          <div style="color: rgba(236, 67, 174, 1)">登高证/电工证</div>
        </div>
          <div class="content">
          <div class="role">配合人：</div>
          <div class="desc">
            <ul>
              <li>张三</li>
              <li>13888888888</li>
              <li>xx去--xx项目--xx事情</li>
            </ul>
          </div>
          <div style="color: rgba(236, 67, 174, 1)">登高证/电工证</div>
        </div>
        <div class="title" style="margin-top:30px">
          <img src="@/assets/images/yellow-title.png" />工作信息
        </div>
        <div class="desc" style="color:rgba(180, 241, 255, 1);padding:0 10px;text-align:left">
           <p> 工单内容：提醒您收取专项盯防测试工SN-099-033-210423-06825,主题名:保定市望都县-由于市政修路施工原因，请代维安排1名人员于 （4月24日-4月25日），对望都县高速引线（保定清苑-保定望都二干主用、本地网主用（望都境内080号标石））光缆段进行施工盯防：受理,处理时限：2021-05-01 00:00:35</p>
            <p>工单编号：SN-099-033-210423-06825 </p>
            <p>站址信息：望都县高速引线（保定清苑-保定望都二干主用、本地网主用（望都境内080号标石））光缆段</p>
        </div>
          <div class="title" style="margin-top:30px">
          <img src="@/assets/images/yellow-title.png" />工作进程
        </div>
        <div class="desc" style="color:rgba(180, 241, 255, 1);padding:0 10px;text-align:left">
           <p>xx时xx分xx秒 ，出车，驾驶车辆粤B0001，司机王五 xx</p>
                      <p>xx时xx分xx秒 ，出车，驾驶车辆粤B0001，司机王五 xx</p>

           <p>xx时xx分xx秒 ，出车，驾驶车辆粤B0001，司机王五 xx</p>

           <p>xx时xx分xx秒 ，出车，驾驶车辆粤B0001，司机王五 xx</p>

        </div>
          <div class="title" style="margin-top:30px">
          <img src="@/assets/images/yellow-title.png" />工作结果
        </div>
        <div class="desc" style="color:rgba(180, 241, 255, 1);padding:0 10px;text-align:left">
           <p>故障原因：因为设备老化起火导致停电</p>
                      <p>解决方案：换个新的</p>

       

        </div>
      </div>
    
      <!-- 配合人 -->
      
    </div>
  </dv-border-box-11>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class userDetail extends Vue {}
</script>

<style lang="scss" scoped>
.user-content {
  padding: 60px 20px 20px 20px;
  .personnel-info {
    .title {
      color: rgba(255, 251, 7, 1);
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      text-align: left;
    }
    .content {
      margin-top: 10px;
      display: flex;
      .role {
        text-align: left;
        color: #fff;
      }
      .desc {
        width: 260px;
        text-align: left;
        color: #fff;
      }
    }
  }
}
</style>
