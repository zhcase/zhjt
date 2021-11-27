<!--
 * @Author: zeHua
 * @Date: 2021-09-30 10:15:10
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-27 16:11:09
 * @FilePath: /zhjt/src/components/content/index.vue
-->
<template>
  <div class="zhjt-map">
    <!-- <div
      style="
        width: 200px;
        height: 100px;
        border: 1px solid rgba(243, 65, 57, 1);
      "
    >
      <div
        style="
          height: 50px;
          width: 100%;
          background: rgba(243, 65, 57, 1);
          line-height: 50px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #ffffff;
          font-size: 16px;
        "
      >
        哈尔滨运维检修组
      </div>
      <div
        style="
          height: 50px;
          background: rgba(62, 11, 9, 1);
          line-height: 50px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #ffffff;
          font-size: 18px;
        "
      >
        95% 高
      </div>
    </div> -->
    <!-- <dv-border-box-11
      title="数字化运营监控中心"
      style="
        height: 120px;
        width: 550px;
        margin: 0 auto;
        line-height: 150px;
        font-size: 28px;
        color: #fff;
        font-family: YouSheBiaoTiHei;
        font-weight: bold;
      "
    ></dv-border-box-11> -->
    <!-- <div>
      <div
        style="
          width: 242px;
          height: 35px;
          background: #5db407;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #ffffff;
          line-height: 35px;
          margin-bottom: 2px;
        "
      >
        距离派单一小时三十分钟
      </div>
      <div
        style="
          width: 326px;
          height: 180px;
          padding: 20px;
          border: 2px solid #7eff00;
          background-image: radial-gradient(rgba(126, 255, 0, 0), rgba(126, 255, 0, 0.3))
        "
      >
        <div style="height: 80px; width: 100%; display: flex">
          <div style="height: 60px; width: 60px; margin-top: 10px">
            <img
              src="https://img1.baidu.com/it/u=1765464561,3100748160&fm=26&fmt=auto"
              style="height: 60px; border-radius: 5px"
            />
          </div>
          <div
            style="
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #fffb07;
            "
          >
            <ul style="margin-top: 10px">
              <li>&nbsp; 李倩 直线距离：1km</li>
              <li>NO.33654845413</li>
              <li style="font-weight: 400; margin-left: 20px">
               &nbsp; 西安大区河北项目X据点
              </li>
            </ul>
          </div>
        </div>
        <div style="margin-top:20px">
          <ul>
            <li style="float: left; color: #fff">
              <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                工单编号: </span
              >356544212
            </li>
            <li style="float: left; margin-left: 20px;color: #fff">
              <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                告警专业: </span
              >356544212
            </li>
            <li style="float: left;margin-top:10px;color: #fff">
              <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                地址信息: </span
              >356544212
            </li>

            <li style="float: left; margin-left: 20px;margin-top:10px;color: #fff">
              <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                供应商信息: </span
              >356544212
            </li>
                <li style="float: left;margin-top:10px;color: #fff">
              <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                告警原因: </span
              >356544212
            </li>
            <li style="float: left;margin-top:10px;color: #fff;margin-left: 20px;cursor:pointer;color:rgba(255, 251, 7, 1)">点击查看详细信息 》 》</li>
          </ul>
        </div>
      </div>
    </div> -->
    <div class="zhjt-map__title">
      <img src="@/assets/images/zhjt-title.png" />
    </div>
    <div class="zhjt-map__time">
      <span>{{ currentTime[0] }} </span> <span>{{ currentTime[1] }}</span>
    </div>
    <div class="more">
      <ul>
        <li><img src="@/assets/images/car-icon.png" /> 车辆分布</li>
        <li><img src="@/assets/images/work-icon1.png" /> 工作量分布</li>
        <li class="btn" @click="handleMoreClick" v-if="!isProvince">
          查看更多内容>>
        </li>
        <li class="btn" @click="handleBackMap" v-if="isProvince">
          返回上一级 &lt;&lt;
        </li>
      </ul>
    </div>

    <div
      ref="map"
      style="width: 800px; height: 800px; margin-top: 170px"
      v-if="isMap"
      id="map"
    ></div>
    <span class="video-player">
      <img src="@/assets/images/video-d.png" />
    </span>
    <div class="video-dialog">
      <!-- <VideoPlayer/> -->
    </div>
    <div
      class="user-info"
      style="position: absolute; top: 150px"
      v-if="isShowWorkDetail"
    >
      <userDetail :datas="workDetailInfo"  @close='closeDialog'/>
    </div>
  </div>
</template>

<script>
/* tslint:disable  */

import { Options, Vue } from "vue-class-component";
import { Account } from "@/api/index";
import VideoPlayer from "./components/videoPlayer.vue";
import userDetail from "./components/userDetail.vue";
import axios from "axios";
import * as echarts from "echarts";
// requestIdleCallback
import "@/assets/json/china";
const beijing = require("@/static/beijing.json");

// require("https://cdn.jsdelivr.net/npm/echarts/map/js/china.js?v=1598903772045");

@Options({
  components: {
    VideoPlayer,
    userDetail,
  },
})
export default class Container extends Vue {
  // 坐标对应的值
  currentTime = [];
  arrmap = [];
  workDetailInfo={};//存储工作量详情

  isMap = true;
  isProvince = false; //判断是否是省级
  info = ""; //获取弹出信息
  isShowWorkDetail = false; // 是否显示工作量详情

  // 地图坐标
  cyfztx_date_n = {
    geoCoordMap: {}, //配置现在所需要的地图
    carSelectPoint: [], //车辆分布的点
    workSelectPoint: [], // 工作分布的点
    BJData: [
      // [{ name: "中国台湾", value: 21 }],
      // [{ name: "中国香港", value: 101 }],
      // [{ name: "中国澳门", value: 2 }],
      // [{ name: "北京", value: 12 }],
      // [{ name: "上海", value: 1 }],
      // [{ name: "重庆", value: 1 }],
      // [{ name: "天津", value: 1 }, { name: "沈阳" }],
      // [{ name: "陕西", value: 3 }, { name: "沈阳" }],
      // [{ name: "甘肃", value: 4 }, { name: "沈阳" }],
      // [{ name: "四川", value: 1 }, { name: "沈阳" }],
      // [{ name: "河北", value: 6 }, { name: "沈阳" }],
      // [{ name: "湖北", value: 7 }, { name: "沈阳" }],
      // [{ name: "湖南", value: 1 }, { name: "沈阳" }],
      // [{ name: "浙江", value: 3 }, { name: "沈阳" }],
      // [{ name: "安徽", value: 8 }, { name: "沈阳" }],
      // [{ name: "黑龙江", value: 7 }, { name: "沈阳" }],
    ],
  };

  // 返回上一级图地图
  handleBackMap() {
    this.isProvince = false;
    this.$emit("openLoading"); // 开启Loading
    setTimeout(() => {
      this.initMap();
    }, 100);
  }
  // 关闭弹出
  closeDialog(){
    this.isShowWorkDetail=false;
  }
  // 获取当前时间
  getCurrentDate() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    month = month + 1 > 12 ? 1 : month + 1;
    month = month > 9 ? month : "0" + month.toString();
    let day = d.getDate();
    let hour = d.getHours();
    hour = hour > 9 ? hour : "0" + hour.toString();
    let minute = d.getMinutes();
    minute = minute > 9 ? minute : "0" + minute.toString();
    let second = d.getSeconds();
    second = second > 9 ? second : "0" + second.toString();
    return [`${year}-${month}-${day}`, `${hour}:${minute}:${second}`];
  }
  created() {
    window.handleShowInfo = this.handleShowInfo;
  }
  mounted() {
    // this.initMap();
    this.getCarAddress();
    setInterval(() => {
      this.currentTime = this.getCurrentDate();
    }, 1000);
  }

  /**
   * 点击查看更多
   */
  handleMoreClick() {
    this.$emit("handleViewMore");
  }
  // 获取车辆位置  重构数据给与到map 地图点

  async getCarAddress() {
    this.cyfztx_date_n.carSelectPoint = [];
    this.cyfztx_date_n.workSelectPoint = [];
    // 车辆位置分布
    let result = await Account.getMonitorData("LIST_VEHICLE_LOCATION");
    let data = result.data;
    for (let i = 0; i < data.length; i++) {
      this.cyfztx_date_n.carSelectPoint[i] = {
        value: [data[i].longitude, data[i].latitude],
        id: data[i].vehicleCard,
      };
      this.cyfztx_date_n.geoCoordMap[data[i].vehicleCard] = [
        data[i].longitude,
        data[i].latitude,
      ];
      // this.cyfztx_date_n.carSelectPoint.push(data[i].vehicleCard);
    }

    //工作量分布
    let workResult = await Account.getMonitorData("LIST_WORKLOAD_LOCATION");
    let workData = workResult.data;
    for (let i = 0; i < workData.length; i++) {
      this.cyfztx_date_n.workSelectPoint[workData[i].id] = [
        workData[i].longitude,
        workData[i].latitude,
      ];
      this.cyfztx_date_n.workSelectPoint[i] = {
        value: [workData[i].longitude, workData[i].latitude],
        id: workData[i].id,
        type: "work",
        tableSuffix: workData[i].tableSuffix,
      };
      // this.cyfztx_date_n.workSelectPoint.push(workData[i].id);
    }

    this.initMap();
  }
  // 显示详情
  handleShowInfo() {
    this.isShowWorkDetail = true;
  }
  convertData(data) {
    // var res = [];
    // for (var i = 0; i < data.length; i++) {
    //   var geoCoord = this.geoCoordMap[data[i].name];
    //   if (geoCoord) {
    //     res.push({
    //       name: data[i].name,
    //       value: geoCoord.concat(data[i].value),
    //     });
    //   }
    // }
    // return res;
  }

  handleClick() {
    this.$forceUpdate();
  }
  async getCarInfo(id) {
    let result = await Account.getMonitorData("GET_VEHICLE_LOCATION", 0, 0, id);
    let data = result.data;
    this.info = data;
  }
  // 初始化展示地图
  initMap(name) {
    this.isMap = true;
    // if (name) {
    // echarts.registerMap("china", beijing);
    // }
    // let result = await Account.getProvinces("北京");
    // console.log(result);

    //   console.log($);
    var chartDom = this.$refs.map;
    var myChart = echarts.init(document.getElementById("map"));
    var datemap = this.cyfztx_date_n.geoCoordMap;
    var datevalue = this.cyfztx_date_n.BJData;
    let workMapData = this.cyfztx_date_n.workSelectPoint;
    // var convertData = function (
    //   datemap: { [x: string]: any },
    //   datevalue: string | any[]
    // ) {
    //   var res = [];
    //   for (var i = 0; i < datevalue.length; i++) {
    //     var dataItem: any = datevalue[i];
    //     // var fromCoord = datemap[dataItem[0].name];
    //     var fromCoord = "";
    //     var toCoord = datemap[dataItem[1].name];
    //     if (fromCoord && toCoord) {
    //       res.push([
    //         {
    //           coord: fromCoord,
    //           value: dataItem[0].value,
    //         },
    //         {
    //           coord: toCoord,
    //         },
    //       ]);
    //     }
    //   }
    //   return res;
    // };
    // var convertData2 = function (
    //   datemap: { [x: string]: any },
    //   datevalue: string | any[]
    // ) {
    //   var res = [];
    //   for (var i = 0; i < datevalue.length; i++) {
    //     var dataItem = datevalue[i];
    //     var fromCoord = datemap[dataItem[1].name];
    //     var toCoord = datemap[dataItem[0].name];
    //     if (fromCoord && toCoord) {
    //       res.push([
    //         {
    //           coord: fromCoord,
    //           value: dataItem[0].value,
    //         },
    //         {
    //           coord: toCoord,
    //         },
    //       ]);
    //     }
    //   }
    //   return res;
    // };

    var series = [];
    /*
    [...this.cyfztx_date_n.carSelectPoint,...this.cyfztx_date_n.workSelectPoint, datemap, datevalue].forEach(
      function (item, i) {
        console.log(i);
        // console.log(datemap[item[2]].concat(100));
        console.log(item);
        // console.log(item[0]);
        series.push(
          {
            //城市坐标点动画
            type: "effectScatter",
            coordinateSystem: "geo",
                      large: true,
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "fill", //波纹绘制方式 stroke, fill
              scale: 8, //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: "{b}", //圆环显示文字
              },
              emphasis: {
                show: true,
                color: "#FF6A6A",
              },
            },
            symbol: "circle",
            symbolSize: function (val) {
              return 8 + val[2] / 1000; //圆环大小
            },
            itemStyle: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true,
                color: "#FF6A6A",
              },
            },
            // data: item[2].map(function (dataItem) {
            //   return {
            //     // name: dataItem[0].name,
            //     value: datemap[dataItem[0].name].concat([dataItem[0].value]),
            //   };
            // }),
          },
          // 车辆位置
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
                      large: true,

            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4,
            },
            label: {
              normal: {
                show: true,
                color: "blue",
                position: "right",
                formatter: "{b}",
              },
              emphasis: {
                show: true,
                color: "#FF6A6A",
              },
            },
            symbol: "",
            symbolSize: 5,
            itemStyle: {
              normal: {
                show: true,
                color: "#A316F1",
              },
              emphasis: {
                show: true,
                color: "#FF6A6A",
              },
            },
            data: [
              {
                // name: item[0],
                value: datemap[item],
                visualMap: false,
              },
            ],
          },
          //工作量位置
         {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
                      large: true,

            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4,
            },
            label: {
              normal: {
                show: true,
                color: "blue",
                position: "right",
                formatter: "{b}",
              },
              emphasis: {
                show: true,
                color: "red",
              },
            },
            symbol: "",
            symbolSize: 5,
            itemStyle: {
              normal: {
                show: true,
                color: "#0598FE",
              },
              emphasis: {
                show: true,
                color: "red",
              },
            },
            data:  [  typeof item ==='number'?{
                      value: datemap[item],
                      visualMap: false,
                    }:{}
                    ]
                  // ]
            
          },
        );
      }
    );
    */

    // console.log( this.arrmap);
    series[1] = {
      type: "scatter",
      coordinateSystem: "geo",
      zlevel: 2,
      large: true,
      rippleEffect: {
        period: 4,
        brushType: "stroke",
        scale: 4,
      },

      symbol: "",
      symbolSize: 5,
      itemStyle: {
        normal: {
          show: true,
          color: "#a316f1",
        },
        emphasis: {
          show: true,
          color: "#a316f1",
        },
      },
      data: this.cyfztx_date_n.carSelectPoint,
    };
    // console.log(this.cyfztx_date_n.carSelectPoint);
    // console.log(this.cyfztx_date_n);
    series[0] = {
      type: "scatter",
      dataType: "work",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        period: 4,
        brushType: "stroke",
        scale: 4,
      },

      symbol: "",
      symbolSize: 5,
      itemStyle: {
        normal: {
          show: true,
          color: "#0598FE",
        },
        emphasis: {
          show: true,
          color: "#0598FE",
        },
      },
      data: this.cyfztx_date_n.workSelectPoint,
    };
    var svg =
      "path://M32.597,9.782 L30.475,11.904 C30.085,12.294 29.452,12.294 29.061,11.904 C28.671,11.513 28.671,10.880 29.061,10.489 L31.182,8.368 C31.573,7.978 32.206,7.978 32.597,8.368 C32.987,8.759 32.987,9.392 32.597,9.782 ZM30.000,30.500 C30.000,31.328 29.329,32.000 28.500,32.000 L5.500,32.000 C4.672,32.000 4.000,31.328 4.000,30.500 C4.000,29.672 4.672,29.000 5.500,29.000 L8.009,29.000 L8.009,18.244 C8.009,13.139 12.034,9.000 17.000,9.000 C21.966,9.000 25.992,13.139 25.992,18.244 L25.992,29.000 L28.500,29.000 C29.329,29.000 30.000,29.672 30.000,30.500 ZM17.867,14.444 L13.000,22.000 L17.000,22.000 L17.133,26.556 L21.000,20.000 L17.000,20.000 L17.867,14.444 ZM25.221,6.327 C25.033,6.846 24.459,7.113 23.940,6.924 C23.421,6.735 23.153,6.162 23.342,5.643 L24.368,2.823 C24.557,2.304 25.131,2.037 25.650,2.226 C26.169,2.415 26.436,2.989 26.248,3.508 L25.221,6.327 ZM17.000,5.000 C16.448,5.000 16.000,4.552 16.000,4.000 L16.000,1.000 C16.000,0.448 16.448,0.000 17.000,0.000 C17.552,0.000 18.000,0.448 18.000,1.000 L18.000,4.000 C18.000,4.552 17.552,5.000 17.000,5.000 ZM10.028,7.197 C9.509,7.386 8.935,7.118 8.746,6.599 L7.720,3.780 C7.532,3.261 7.799,2.687 8.318,2.498 C8.837,2.309 9.411,2.577 9.600,3.096 L10.626,5.915 C10.815,6.434 10.547,7.008 10.028,7.197 ZM3.354,12.268 L1.232,10.146 C0.842,9.756 0.842,9.123 1.232,8.732 C1.623,8.342 2.256,8.342 2.646,8.732 L4.768,10.854 C5.158,11.244 5.158,11.877 4.768,12.268 C4.377,12.658 3.744,12.658 3.354,12.268 Z";

    var option = {
      backgroundColor: "rgba(34, 52, 164, 0)",
      // dataZoom: { show: true, realtime: false }, //实时刷新 type: 'inside', start: 0, end: 10, xAxisIndex: [0] }
      large: true,
      largeThreshold: 500,

      tooltip: {
        trigger: "item",
        triggerOn: "click", //点击才会出现提示框
        backgroundColor: "rgba(34, 52, 164, 0)",
        borderColor: "rgba(0,0,0,0)",
        // borderWidth: 0.5,
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: "z-index:100",
        formatter: (params, ticket, callback) => {
          //根据业务自己拓展要显示的内容
          var res = "";
          console.log(params);
          if (params.data.type == "work") {
            Account.getMonitorData(
              "GET_WORKLOAD_LOCATION",
              0,
              0,
              undefined,
              params.data.tableSuffix,
              params.data.id
            ).then((results) => {
              let data = results.data;
              console.log(data);
              this.workDetailInfo=data;
              res = `
              <div>
       
        <div
          style="
            width: 326px;
            height: 180px;
            padding: 20px;
            border: 2px solid #07DBEB;
            background: rgba(39, 137, 143, 0.7);
          "
        >
          <div style="height: 80px; width: 100%; display: flex">
            <div style="height: 60px; width: 60px; margin-top: 10px">
              <img
                src="http://auto.wintaotel.com.cn/CommController/showImg?imgPath=z:/image_file/dpicon/icon_1-30.png"
                style="height: 60px; border-radius: 5px"
              />
            </div>
            <div
              style="
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #fffb07;
              "
            >
              <ul style="margin-top: 10px">
                <li style='text-align:left'>&nbsp;${data.userName} </li>
                <li> &nbsp; ${data.createTime}</li>
                <li style="font-weight: 400;text-align:left">
                 &nbsp; ${data.orgName}
                </li>
              </ul>
            </div>
          </div>
          <div style="margin-top:20px">
            <ul>
              <li style="float: left; color: #fff">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  车牌号: </span
                >${data.vehicleCard ? data.vehicleCard : "无"}
              </li>
              <li style="float: left; margin-left: 20px;color: #fff">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  工作时长: </span
                >${data.workScore}
              </li>
              <li style="float: left;margin-top:10px;color: #fff;width:100%;text-align:left">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  维护信息: </span
                >${data.maintenance}
              </li>
              <li style="float: left;margin-top:10px;color: #fff;cursor:pointer;color:rgba(255, 251, 7, 1)" onclick='handleShowInfo()'>点击查看详细信息 》 》</li>
            </ul>
          </div>
        </div>
      </div>`;
              callback(ticket, res);
            });
          } else {
            this.getCarInfo(params.data.id);
            Account.getMonitorData(
              "GET_VEHICLE_LOCATION",
              0,
              0,
              params.data.id
            ).then((results) => {
              let data = results.data;
              res = `<div>
     
       
        <div
          style="
            width: 326px;
            height: 180px;
            padding: 20px;
            border: 2px solid #07DBEB;
            background: rgba(39, 137, 143, 0.7);
          "
        >
          <div style="height: 80px; width: 100%; display: flex">
            <div style="height: 60px; width: 60px; margin-top: 10px">
              <img
                src="http://auto.wintaotel.com.cn/CommController/showImg?imgPath=z:/image_file/dpicon/icon_1-3087.png"
                style="height: 60px; border-radius: 5px"
              />
            </div>
            <div
              style="
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #fffb07;
              "
            >
              <ul style="margin-top: 10px">
                <li style='text-align:left;text-align:left'>&nbsp; ${data.staffname} </li>
                <li style='text-align:left;text-align:left'>&nbsp; ${data.vehicleCard}</li>
                <li style="font-weight: 400; ">
                 &nbsp; ${data.date}
                </li>
              </ul>
            </div>
          </div>
          <div style="margin-top:20px">
            <ul>
             
              <li style="float: left; color: #fff;width:50%;text-align:left">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  出车状态: </span
                >${data.state}
              </li>
              <li style="float: left; margin-left: 20px;color: #fff">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  发动机状态: </span
                >${data.velStatus}
              </li>
               <li style="float: left;margin-top:10px;color: #fff">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  当前里程: </span
                >${data.currentNum ? data.currentNum + "KM" : "无"}
              </li>
                <li style="float: left;margin-top:10px;color: #fff;
                width:100%;text-align:left">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  OBD编号: </span
                >${data.obdCode ? data.obdCode : "无"}
              </li>
            </ul>
          </div>
        </div>
      </div>`;

              // }
              callback(ticket, res);
            });
          }

          // let data = result.data;
          // this.info = data;
          // var name = params.name;
          // var value = params.value[2];
          // if (name != "") {
          return "查询中...";
        },
      },
      // visualMap: {
      //图例值控制
      // show: false,
      // type: "piecewise",
      // pieces: [
      //   {
      //     max: 5,
      //     color: "#e67817",
      //   },
      //   {
      //     min: 5,
      //     max: 10,
      //     color: "red",
      //   },
      //   {
      //     min: 10,
      //     color: "#a316f1",
      //   },
      // ],
      // calculable: false,
      // },
      geo: {
        map: "china",
        show: true,
        label: {
          emphasis: {
            show: false,
            textStyle: {
              borderWidth: 0.5,
              color: "#fff",
            },
          },
        },
        roam: false, //是否允许缩放
        zoom: 1,
        layoutCenter: ["48%", "40%"], //地图位置
        layoutSize: "90%",
        itemStyle: {
          normal: {
            borderColor: "rgba(147, 235, 248, 1)",
            borderWidth: 0.5,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                },
              ],
              borderWidth: 0.5,
              globalCoord: true, // 缺省为 false
            },
            shadowColor: "rgba(128, 217, 248, 1)",
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10,
          },
        },
        // itemStyle: {
        //   normal: {
        //     show: "true",
        //     areaColor: "#031525",
        //     borderColor: "#FFFFFF",

        //     // color: "rgba(34, 52, 164, 0.3)", //地图背景色
        //     // borderColor: "#5bc1c9", //省市边界线
        //   },
        //   emphasis: {
        //     // show: "true",
        //     // color: "rgba(37, 43, 61, .5)", //悬浮背景
        //     areaColor: "#2B91B7",
        //   },
        // },
      },
      legend: {
        orient: "horizontal",
        left: "center",
        // align: 'right',
        data: [
          { name: "进口", icon: svg },
          { name: "出口", icon: svg },
        ],
        textStyle: {
          color: "#fff",
          fontSize: 20,
        },
        itemWidth: 50,
        itemHeight: 30,
        selectedMode: "multiple",
      },
      series: series,
    };
    // console.log(myChart.addMarkPoint(11,22));
    // console.log(option);
    option && myChart.setOption(option, true);
    this.$emit("closeLoading");
    let that = this;
    //点击前解绑，防止点击事件触发多次
    myChart.on("click", function (params) {
      console.log(params);
      if (params.data) {
        return;
      }
      if (that.isProvince) {
        return;
      }
      that.$emit("openLoading"); // 开启Loading
      axios.get(`/json/${params.name}.json`).then((res) => {
        echarts.registerMap(params.name, res);
        option.geo.map = params.name;
        option.geo.layoutSize = "80%";
        // that.isMap = false;
        that.isProvince = true;
        option && myChart.setOption(option);
        setTimeout(() => {
          that.$emit("closeLoading"); // 关闭Loading
        }, 100);
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.zhjt-map {
  position: relative;
  .more {
    color: "#fff";
    width: 350px;
    margin: 20px auto;
    
    li {
      color: #fff;
      margin-left: 15px;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      img {
        float: left;
        margin-top: 15px;
        height: 10px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    ul {
      .btn {
        height: 37px;
        margin-left: 20px;
        width: 120px;
        font-size: 14px;
        cursor: pointer;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        line-height: 37px;
        display: inline-block;
        background-image: url("~@/assets/images/bg-btn.png");
        background-size: 120px 37px;
      }

      li {
        float: left;
      }
    }
  }
  &__title {
    margin: 20px 0;
    img {
      height: 80px;
    }
  }
  .video-dialog {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .video-player {
    position: absolute;
    left: 20px;
    bottom: 30px;
    display: inline-block;
    height: 50px;
    width: 50px;
    z-index: 999;
    img {
      height: 50px;
    }
  }
  &__time {
    span {
      display: inline-block;
      margin-left: 20px;
      line-height: 50px;
      text-align: center;
      font-size: 24px;
      font-family: YouSheBiaoTiHei;
      font-weight: bold;
      color: #ffffff;
      height: 50px;
      width: 200px;
      background-image: url("~@/assets/images/time-bg.png");
      background-size: 200px 50px;
    }
  }
}
</style>
