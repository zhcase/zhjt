<!--
 * @Author: zeHua
 * @Date: 2021-11-18 09:55:13
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-26 20:47:27
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
              <li>{{datas.userName}}</li>
              <li>{{datas.createTime}}</li>
              <li>{{datas.orgName}}</li>
                            <li>{{datas.maintenance}}</li>

            </ul>
          </div>
          <!-- <div style="color: rgba(236, 67, 174, 1)">登高证/电工证</div> -->
        </div>
         <div class="content">
          <div class="role">配合人：</div>
          <div class="desc">
            <ul>
                           <li>{{datas.workStaffName}}</li>

              <!-- <li>13888888888</li>
              <li>xx去--xx项目--xx事情</li> -->
            </ul>
          </div>
          <!-- <div style="color: rgba(236, 67, 174, 1)">登高证/电工证</div> -->
        </div>
          <!-- <div class="content">
          <div class="role">配合人：</div>
          <div class="desc">
            <ul>
              <li>张三</li>
              <li>13888888888</li>
              <li>xx去--xx项目--xx事情</li>
            </ul>
          </div> -->
          <!-- <div style="color: rgba(236, 67, 174, 1)">登高证/电工证</div> -->
        <!-- </div> -->
        <div class="title" style="margin-top:30px">
          <img src="@/assets/images/yellow-title.png" />工作内容
        </div>
        <div class="desc" style="color:rgba(180, 241, 255, 1);padding:0 10px;text-align:left">
           <p> {{datas.workContent}}</p>
           
        </div>
          <!-- <div class="title" style="margin-top:30px">
          <img src="@/assets/images/yellow-title.png" />工作进程
        </div> -->
        <!-- <div class="desc" style="color:rgba(180, 241, 255, 1);padding:0 10px;text-align:left">
           <p>xx时xx分xx秒 ，出车，驾驶车辆粤B0001，司机王五 xx</p>
                      <p>xx时xx分xx秒 ，出车，驾驶车辆粤B0001，司机王五 xx</p>

           <p>xx时xx分xx秒 ，出车，驾驶车辆粤B0001，司机王五 xx</p>

           <p>xx时xx分xx秒 ，出车，驾驶车辆粤B0001，司机王五 xx</p>

        </div> -->
          <!-- <div class="title" style="margin-top:30px">
          <img src="@/assets/images/yellow-title.png" />工作结果
        </div>
        <div class="desc" style="color:rgba(180, 241, 255, 1);padding:0 10px;text-align:left">
           <p>故障原因：因为设备老化起火导致停电</p>
                      <p>解决方案：换个新的</p>

       

        </div> -->
      </div>
    
      <!-- 配合人 -->
      
    </div>
  </dv-border-box-11>
</template>

<script lang="ts">
import { Vue, Options} from "vue-class-component";
@Options({
  props: {
    datas: Object
  }
})
export default class userDetail extends Vue {
  datas=''
  mounted(){
    console.log(this.datas);
    
  }

}
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
