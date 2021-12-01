<!--
 * @Author: zeHua
 * @Date: 2021-09-29 11:27:01
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-28 15:25:20
 * @FilePath: /zhjt/src/components/leftSide/index.vue
-->
<template>
  <div
    class="l-side"
    v-if="abnormalConfig.data.length > 0 && warningConfig.data.length > 0"
  >
    <div class="l-side__abnormal">
      <!-- 出车异常 -->
      <dv-border-box-12
        :reverse="true"
        class="l-side__abnormal__content l-side__abnormal__item"
        backgroundColor="rgba(20,87,140, 0.29)"
      >
        <!-- 标题 -->
        <div class="l-side__title"><i></i> <span>出车异常</span></div>
        <!-- 异常内容 -->
        <div class="l-side__abnormal__content__container">
          <dv-scroll-board :config="abnormalConfig" />
        </div>
      </dv-border-box-12>
      <!-- 安全驾驶告警 -->
      <dv-border-box-12
        style="margin-top: 15px"
        :reverse="true"
        class="l-side__abnormal__content l-side__abnormal__item"
        backgroundColor="rgba(20,87,140, 0.29)"
      >
        <!-- 标题 -->
        <div class="l-side__title"><i></i> <span>安全驾驶告警</span></div>
        <!-- 异常内容 -->
        <div
          class="
            l-side__abnormal__content__container
            l-side__abnormal__content__warning
          "
        >
          <dv-scroll-board :config="warningConfig" ref="scrollBoard" />
        </div>
      </dv-border-box-12>
      <!-- OBD拔出警告 -->
      <dv-border-box-12
        style="margin-top: 15px"
        :reverse="true"
        class="l-side__abnormal__content l-side__abnormal__item"
        backgroundColor="rgba(20,87,140, 0.29)"
      >
        <div class="obd-content">
          <span class="box-title">OBD拔出告警</span>
          <div class="obd-content-container">
            <div class="img"><img src="@/assets/images/warning.png" /></div>
            <div class="desc">
              <vue-seamless-scroll
                :data="obdCarConifg.obdDataList"
                :class-option="{
                  singleHeight: 120
                }"
                class="obd-warpper"
              >
                <ul>
                  <li class="obd-item" v-for="(item, index) in obdCarConifg.obdDataList" :key="index">
                    <div class="obd-item-cell">
                      <span class="k">{{item.vehicleCard || '--'}}</span>
                      <!-- <span class="v">OBD拔出</span> -->
                    </div>
                    <div class="obd-item-cell" v-show="item.staffName && item.deptName">
                      <span class="k">{{item.staffName}}</span>
                      <span class="v">{{item.deptName}}</span>
                    </div>
                    <div class="obd-item-cell">
                      <span class="k">司机</span>
                      <span class="v">{{item.tel || '--'}}</span>
                    </div>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
      </dv-border-box-12>
      <!-- 告警内容 -->
    </div>
  </div>
</template>
<script>
import { Options, Vue } from "vue-class-component";
import { Account } from "@/api/index.ts";
import vueSeamlessScroll from "vue-seamless-scroll/src";
@Options({
  components: {
    vueSeamlessScroll,
  },
})
export default class Home extends Vue {
  // 出车异常接口数据配置
  catchCarApiConfig = {
    pages: 0, //当前页数
    size: 20, //每页大小
    totalPages: 0, // 获取总页数
  };
  animateUp = false; //obd是否滚动
  // 安全驾驶告警
  warningCarApiConfig = {
    pages: 0, //当前页数
    size: 20, //每页大小
    totalPages: 0, // 获取总页数
  };
  // OBD 配置
  obdCarConifg = {
    cureentNum: 0,
    obdDataList: [],
  };
  //车辆异常配置
  abnormalConfig = {
    header: ["项目驻点", "车牌", "出车", "总里程"], //["项目驻点", "车牌", "出车记录", "处理情况"]
    headerBGC: "linear-gradient(0deg, #38a0d6, #6DCDE6)",
    evenRowBGC: "rgba(109, 205, 230, 0.2)",
    oddRowBGC: "rgba(109, 205, 230, 0)",
    columnWidth:[110,95,50],
    columnHeight: [20],
    mouseover(){

    },
    data: [
      // ["西安项目", "豫A3256", "无", "联系司机"],
      // ["广州项目", "粤B342", "无", "联系管理员"],
      // ["佛山项目", "粤A342", "异常", "联系司机"],
      // ["上海项目", "沪49342", "无", "12564875129"],
      // ["新疆项目", "疆98A256", "异常", "联系司机"],
      // ["西安项目", "豫A3256", "无", "联系司机"],
      // ["广州项目", "粤B342", "无", "联系管理员"],
      // ["佛山项目", "粤A342", "异常", "联系司机"],
      // ["上海项目", "沪49342", "无", "12564875129"],
      // ["新疆项目", "疆98A256", "异常", "联系司机"],
    ],
  };
  // 安全驾驶告警
  warningConfig = {
    header: ["组织", "车牌", "告警详情"],
    headerBGC: "rgba(31, 147, 190, 1)",
    evenRowBGC: "rgba(109, 205, 230, 0)",
    oddRowBGC: "rgba(109, 205, 230, 0)",
    columnWidth:[143],
    data: [],
  };
  mounted() {
    this.getObdWarning();
    this.timer = setInterval(this.scrollAnimate, 1500);
      
    // 每五秒种获取安全驾驶与出车异常数据
    setInterval(() => {
      this.handleCatchCarData();
      this.getWarningAlarm();
    }, 5000);
  }
  updateRows(rows, index) {
  // ...
  console.log(rows);
  console.log(index);
}
  filterList(arr, filterId) {
    const id = filterId; //这里定义按照过滤的对象的属性名称,你想要过滤的那个对象属性
    // const id = 'name' //试一下name
    const newArr = arr.reduce(
      (all, next) =>
        all.some((item) => item[id] == next[id]) ? all : [...all, next],
      []
    );
    return newArr;
  }
  /**
   * 获取安全驾驶告警数据
   */
  async getWarningAlarm() {
    // 调用安全驾驶告警api
    let result = await Account.getMonitorData(
      "LIST_SAFE_DRIVING_ALARM",
      this.warningCarApiConfig.pages,
      this.warningCarApiConfig.size
    );
    // 判断当前获取最新的页面是否小宇当前页数
    if (result.data.pages < this.warningCarApiConfig.pages) {
      return;
    }
    // 当前页数+1
    this.warningCarApiConfig.pages += 1;
    // 循环赋值
    for (let i = 0; i < result.data.list.length; i++) {
      let dataList = result.data.list[i];
      this.warningConfig.data[this.warningConfig.data.length] = [
        // dataList.subDeptName,
        dataList.deptName,
        dataList.vehicleCard,
        dataList.alarmType,
      ];
    }
          // this.$refs["scrollBoard"].updateRows(rows, index)

  }
  // 处理出车异常数据
  async handleCatchCarData() {
    // 获取车辆异常数据
    let result = await Account.getMonitorData(
      "LIST_ABNORMAL_VEHICLE",
      this.catchCarApiConfig.pages,
      this.catchCarApiConfig.size
    );
    if (result.data.pages < this.catchCarApiConfig.pages) {
      return;
    }
    this.catchCarApiConfig.pages += 1;
    // 加载到显示数组
    for (let i = 0; i < result.data.list.length; i++) {
      let dataList = result.data.list[i];
      this.abnormalConfig.data[this.abnormalConfig.data.length] = [
        dataList.subDeptName,
        dataList.vehicleCard,
        dataList.carOutNum,
        dataList.totalMileage + "KM",
      ];
    }
  }
  /**
   * 获取obd拔出告警数据
   */
  async getObdWarning() {
    let result = await Account.getMonitorData("LIST_OBD_PULL_OUT_ALARM");
    console.log(result.data);
    this.obdCarConifg.obdDataList = result.data;
    // if(this.obdCarConifg.obdDataList.length===1){
    //   this.obdCarConifg.obdDataList.push(this.obdCarConifg.obdDataList[0])
    // }
  }

  // 动画
  scrollAnimate() {
    this.animateUp = true;
    setTimeout(() => {
      this.animateUp = false;
      // console.log(this.obdCarConifg.obdDataList);
      // this.obdCarConifg.obdDataList=this.obdCarConifg.obdDataList;
      // this.obdCarConifg.obdDataList.push(this.obdCarConifg.obdDataList[0]);
      // this.obdCarConifg.obdDataList.shift();
      //  this.obdCarConifg.obdDataList.push( this.obdCarConifg.obdDataList[0])
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.animate-up {
  transition: all 0.5s ease-in-out;
  transform: translateY(-30px);
}
/deep/ .dv-scroll-board .header .header-item{
    font-size: 13px;
}
.l-side {
  margin-left: 0;
  height: 96%;
  &__abnormal {
    /* overflow: hidden; */
    display: flex;

    height: 100%;
    // height: auto;
    flex-direction: column;

    &__item {
      flex: 0 0 auto;
      flex-grow: 1;
      flex: 1;
    }

    &__content {
      /* padding: 20px; */
      /* background-color: rgba(94, 191, 255, 0.3); */
      .obd-content {
        // display: flex;
        padding: 0px 26px;
        height: 100%;
        position: relative;
        &-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center; /* 水平居中 */
          align-items: center; /* 垂直居中 */
          // width: 1000px;
          height: 100%;
          // border: 1px solid red;
        }
        .desc {
          flex: 1;
          padding: 20px 10px;
          margin-left: 15px;
          border-radius: 11px;
          background-color: rgba(94, 191, 255, 0.25);
          .obd-warpper {
            height: 110px;
            overflow: hidden;
          }
          .obd-item {
            height: 120px;
          }
          .obd-item-cell {
              margin-bottom: 10px;
              height: 30px;
              padding: 0 5px;
              line-height: 30px;
              overflow: hidden;
              color: #fff;
              border-left: 2px solid rgba(26, 201, 255, 1);
              border-right: 2px solid rgba(26, 201, 255, 1);
              background: linear-gradient(
                90deg,
                rgba(0, 255, 255, 0.25) 0%,
                rgba(0, 255, 255, 0) 51%,
                rgba(0, 255, 255, 0.25) 100%
              );
              font-size: 10px;
              display: flex;
              .k {
                flex: 1;
                text-align: left;
                white-space: nowrap;
                word-break: keep-all;
                // overflow: hidden;
                // text-overflow: ellipsis;
              }
              .v {
                margin-left: 5px;
                font-weight: bold;
                color: rgba(248, 244, 0, 1);
              }
          }
        }
        .box-title {
          position: absolute;
          top: -30px;
          right: 20px;
          width: 137px;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #ff5438;
          background: #430c08;
          box-shadow: 0px 2px 49px 0px rgba(229, 29, 13, 0.5);
          border-radius: 4px;

          display: inline-block;
        }
        .img {
          width: 50%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      /deep/ &__warning {
        .rows {
          .row-item {
            .ceil:first-child {
              color: rgba(255, 255, 255, 1);
            }
            .ceil:nth-child(2) {
              color: rgba(170, 221, 255, 1);
            }
            .ceil:nth-child(3) {
              color: #f8f400;
            }
            .ceil:nth-child(4) {
              color: #00ff8a;
            }
          }
        }
      }
      &__container {
        margin-top: 10px;
        height: 70%;
        /deep/ .header {
          background-color: rgba(109, 205, 230, 0.2);
          box-shadow: 0px 0px 12px 6px rgba(0, 0, 0, 0.05);
        }
        /deep/ .rows {
          .row-item {
            height: 25px;
            font-size: 11px;
          }
          .row-item:nth-child(odd) {
          }
        }
      }
    }
  }

  &__title {
    height: 20px;
    line-height: 20px;
    width: 100%;
    font-size: 18px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #aaddff;
    /* padding: 24px; */
    text-align: left;
    i {
      width: 8px;
      margin-right: 5px;
      float: left;
      height: 18px;
      /* display: inline-block; */
      background: linear-gradient(90deg, #2091da, #3cb2ff);
    }
    span {
      float: left;
    }
  }
}
/deep/ .border-box-content {
  padding: 20px;
  width: auto !important;
  position: relative;
}
</style>
