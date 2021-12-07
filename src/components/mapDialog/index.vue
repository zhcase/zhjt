<!--
 * @Author: zeHua
 * @Date: 2021-11-19 17:14:34
 * @LastEditors: zeHua
 * @LastEditTime: 2021-12-07 14:58:14
 * @FilePath: /zhjt/src/components/mapDialog/index.vue
-->
<template>
  <!-- 卫星地图 -->
  <div class="satellite-map">
    <!-- 加载 -->
    <div
      class="transparent-loading"
      v-if="isHideLoading"
      @click="
        () => {
          return;
        }
      "
    >
      <span> <img src="@/assets/images/loading-tm.gif" /> </span>
    </div>
    <!-- 展示mark点 -->
    <div class="mark-view">
      <!-- <ul>
        <li><img src="@/assets/images/car-icon.png" />车辆</li>
        <li><img src="@/assets/images/work-icon1.png" />工作量</li>
        <li><img src="@/assets/images/oli-icon.png" />油机</li>
        <li><img src="@/assets/images/people-icon.png" />保障人员</li>
      </ul> -->
    </div>
    <!-- 头部导航 -->
    <div class="top-nav">
      <div class="back" @click="handleBackClick">&lt;&lt; 返回上个页面</div>
      <span class="content">地图监控中心</span>
      <!-- 时间 -->
      <div class="time">
        {{ currentTime[0] + " " + currentTime[1] }}
      </div>
    </div>
    <!-- 地图导航 -->
    <div class="map-nav">
      <div></div>
      <!-- logo -->
      <!-- <dv-border-box-1
        style="
          text-align: center;
          margin-top: 20px;
          height: 110px;
          padding: 10px;
          width: 490px;
        "
      >
        <div class="logo" style="margin-top: 10px">地图监控中心</div>
      </dv-border-box-1> -->
      <div class="back" @click="handleBack">
        <img src="@/assets/images/dialog-btn.png" v-if="isCloseContent" />
        <img src="@/assets/images/open-nav.png" v-if="!isCloseContent" />
      </div>

      <div class="navigation">
        <ul>
          <li>
            <div class="left">
              <img src="@/assets/images/person.png" />
            </div>
            <div class="content" v-if="isCloseContent">
              <div class="name">保障人员</div>
              <div class="num">在线数量 {{ peopleIds.length }}</div>
            </div>
            <div class="right">
              <switchs
                style="margin-top: 10px"
                :value="peopleStatus"
                color="#ff3439"
                text="on|off"
                @change="peopleChange"
              ></switchs>
            </div>
          </li>
          <li>
            <div class="left">
              <img src="@/assets/images/car.png" />
            </div>
            <div class="content" v-if="isCloseContent">
              <div class="name">工作车辆</div>
              <div class="num">出车数量 {{ carIds.length }}</div>
            </div>
            <div class="right">
              <span>
                <switchs
                  :value="carStatus"
                  @change="carChange"
                  color="#e10ec5"
                  text="on|off"
                ></switchs
              ></span>
            </div>
          </li>
          <li>
            <div class="left">
              <img src="@/assets/images/line-nav.png" />
            </div>
            <div class="content" v-if="isCloseContent">
              <div class="name">工作量</div>
              <div class="num">上报数量 {{ workIds.length }}</div>
            </div>
            <div class="right">
              <span>
                <switchs
                  :value="workStatus"
                  @change="workChange"
                  color="#00a0fb"
                  text="on|off"
                ></switchs
              ></span>
            </div>
          </li>
          <li>
            <div class="left">
              <img src="@/assets/images/gas.png" />
            </div>
            <div class="content" v-if="isCloseContent">
              <div class="name">油机监控</div>
              <div class="num">在线数量 {{ oliIds.length }}</div>
            </div>
            <div class="right">
              <span>
                <switchs
                  :value="oliStatus"
                  @change="oliChange"
                  color="#ffaa42"
                  text="on|off"
                ></switchs
              ></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 卫星地图 -->
    <div
      class="map-content"
      id="allmap"
      style="width: 100%; height: 100%"
    ></div>
    <div
      class="user-info"
      style="position: absolute; top: 140px; z-index: 9999; left: 400px"
      v-if="isShowWorkDetail"
    >
      <userDetail :datas="workDetailInfo" @close="closeDialog" />
    </div>
  </div>
</template>
<script>
import { Options, Vue } from "vue-class-component";
import * as echarts from "echarts";
import { BMPGL } from "@/config/bmpgl.js";
import { Account } from "@/api";
import userDetail from "@/components/content/components/userDetail.vue";
import switchs from "@/components/switch/index.vue";
var goodsData = require("../../assets/json/geo.json"); //导入设置好的主题颜色 如果不需要，可以不做此操作
const iconImg = require("@/assets/images/car-icon.png");
const workIcon = require("@/assets/images/work-icon1.png");
const oliIcon = require("@/assets/images/oli-icon.png");
const peopleIcon = require("@/assets/images/people-icon.png");

@Options({
  components: {
    switchs,
    userDetail,
  },
})
export default class Container extends Vue {
  ak = "jsug1ccNL9hyeZInNcfAN8f4qG65SyYx"; //ak秘钥
  timer = "";
  toggle = false;
  mapLoading = false;
  isCloseContent = true; // 关闭内容
  isShowWorkDetail = false; // 是否显示工作量详情
  workDetailInfo = {}; //存储工作量详情
  carData = {}; //车辆数据
  carLength = 0; //车辆数据长度
  currentTime = [];
  isHideLoading = false; // loading 隐藏
  peopleStatus = false; // 人员保障状态
  oliStatus = false; //油机状态
  workStatus = false; //工作量状态
  carStatus = true; // 车辆状态
  map = "";
  oliIds = []; //存储油机标识
  workIds = []; // 工作量标识
  peopleIds = []; // 工牌标识
  carIds = []; //车辆标识
  created() {
    window.handleShowInfo = this.handleShowInfos;
  }
  // 返回上一级页面
  handleBackClick() {
    this.$emit("closeDialog");
  }
  // 关闭弹出
  closeDialog() {
    this.isShowWorkDetail = false;
  }
  // 显示详情弹出
  handleShowInfos() {
    this.isShowWorkDetail = true;
  }
  /**
   * 修改人员状态
   * @status 状态
   */
  peopleChange(status) {
    this.peopleStatus = status;
    console.log(this.peopleIds);
    if (!status) {
      for (let item of this.map.getOverlays()) {
        if (this.peopleIds.indexOf(item._config.id) > -1) {
          this.map.removeOverlay(item);
        }
      }
    } else {
      this.getPeopleAddress();
    }
  }
  /**
   * 修改油机状态
   * @status 状态
   */
  oliChange(status) {
    this.oliStatus = status;
    if (!status) {
      for (let item of this.map.getOverlays()) {
        if (this.oliIds.indexOf(item._config.id) > -1) {
          this.map.removeOverlay(item);
        }
      }
    } else {
      this.oliAddress();
    }
  }
  // 修改车辆状态
  carChange(status, upadateStatus) {
    this.carStatus = status;
    this.isHideLoading = true;
    // || status === 3
    if (!status) {
      setTimeout(() => {
        // let carIds = JSON.parse(JSON.stringify(this.carIds));
        // if (upadateStatus) {
        //   this.getCarAddress();
        // }
        for (let item of this.map.getOverlays()) {
          if (this.carIds.indexOf(item._config.id) > -1) {
            setTimeout(() => {
              this.map.removeOverlay(item);
            });
          }
        }
        this.isHideLoading = false;
      }, 300);
    } else {
      this.getCarAddress();
    }
  }

  // 修改工作量状态
  workChange(status) {
    this.workStatus = status;
    this.isHideLoading = true;
    if (!status) {
      for (let item of this.map.getOverlays()) {
        if (this.workIds.indexOf(item._config.id) > -1) {
          setTimeout(() => {
            this.map.removeOverlay(item);
          });
        }
      }
      this.isHideLoading = false;
    } else {
      this.getWorkAddress();
    }
  }
  handleBack() {
    // this.$emit("handleBack");
    this.isCloseContent = !this.isCloseContent;
  }

  // 获取电子工牌位置
  async getPeopleAddress(updateStatus) {
    if (!this.peopleStatus) {
      return;
    }
    var opts = {
      width: 382,
      height: 320,
      title: "<span style='display:none'></span>",
    };
    // 获取工牌位置
    let peopleIcons = new BMapGL.Icon(peopleIcon, new BMapGL.Size(10, 10)); // 电子工牌图标
    let peopleResult = await Account.getMonitorData("LIST_PERSONNEL_LOCATION");
    let marker;
    if (!updateStatus) {
      for (let item of this.map.getOverlays()) {
        if (this.peopleIds.indexOf(item._config.id) > -1) {
          this.map.removeOverlay(item);
        }
      }
    }
    this.peopleIds = [];
    for (let item of peopleResult.data) {
      marker = new BMapGL.Marker(
        new BMapGL.Point(item.longitude, item.latitude),
        {
          icon: peopleIcons,
          id: item.deviceCode,
        }
      );
      this.peopleIds.push(item.deviceCode);
      marker.addEventListener("click", async (e) => {
        let result = await Account.getMonitorData(
          "GET_PERSONNEL_LOCATION",
          0,
          0,
          undefined,
          undefined,
          undefined,
          e.currentTarget._config.id
        );
        let data = result.data;
        // this.filterMarker(e.target.point, index);
        let content = `<div style='position:relative;'>
          <i style='position:absolute;right:0;top:0px'><img style='height:35px;display:${
            data.alarmStatus == 0 ? "none !important" : "block !important"
          }' src='https://image.wintaotel.com.cn/danger-icon.png'/></i>
           <div
             style="
              width: 242px;
            height: 35px;
            text-indent:1rem;
            background:${
              data.alarmStatus == 0 ? " rgba(25, 193, 206, 1)" : "#DB2105"
            };
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #ffffff;
            line-height: 35px;
            margin-bottom: 2px;
          "
        >
          电子工牌信息 <span style='font-size:13px;margin-left:10px'> ${
            data.clockStatus
          } </span>

        </div>
        <div
          style="
            width: 326px;
            height: 180px;
            padding: 20px;
            border: 2px solid ${
              data.alarmStatus == 0
                ? " rgba(39, 137, 143, 1)"
                : "rgba(219, 33, 5, 1)"
            };
            background:${
              data.alarmStatus == 0
                ? " rgba(39, 137, 143, 0.7)"
                : "rgba(219, 33, 5, 0.7)"
            };
          "
        >
        
          <div style="height: 80px; width: 100%; display: flex">
            <div style="height: 60px; width: 60px; margin-top: 10px">
              <img
                src="https://image.wintaotel.com.cn/icon_1-309.png"
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
                <li>&nbsp;姓名： ${data.staffName}</li>
                <li>&nbsp;  </li>
                <li style="font-weight: 400;">
                 &nbsp;电话： ${data.tel}
                </li>
              </ul>
            </div>
          </div>
          <div style="margin-top:20px">
            <ul>
            <li style="float: left; color: #fff;width:100%">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  公司: </span
                >${data.company}
              </li>
              <li style="float: left; color: #fff;width:50%"">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold;">
                  高度: </span
                >${data.altitude}
              </li>
              <li style="float: left; color: #fff;width:50%;">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold;width:50%">
                  方向度: </span
                >${data.direction}
              </li>
              <li style="float: left;margin-top:10px;color: #fff;width:50%"">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold;width:50%">
                  速度: </span
                >${data.speed}
              </li>

              
            </ul>
          </div>
        </div>
      </div>`;
        var infoWindow = new BMapGL.InfoWindow(content, opts);
        this.map.openInfoWindow(
          infoWindow,
          new BMapGL.Point(
            e.currentTarget.latLng.lng,
            e.currentTarget.latLng.lat
          )
        );
      });
      this.map.addOverlay(marker);
    }
  }

  /**
   *  获取工作车辆位置
   * @param updateState 是否更新状态
   */
  async getCarAddress(updateState) {
    if (!this.carStatus) {
      return;
    }

    var opts = {
      width: 382,
      height: 320,
      title: "<span style='display:none'></span>",
    };

    var myIcon = new BMapGL.Icon(iconImg, new BMapGL.Size(10, 10)); // 车辆图标
    let marker;
    let result = await Account.getMonitorData("LIST_VEHICLE_LOCATION");
    this.carLength = result.data.length;
    let carList = result.data;
    let splitNum = carList.length / 300; //每次请求300个
    let num = 1; //计数器
    let number = 0;
    let carData = [];
    // 如果是更新 将不会重置 合集
    if (updateState) {
      for (let item of this.map.getOverlays()) {
        if (this.carIds.indexOf(item._config.id) > -1) {
          setTimeout(() => {
            this.map.removeOverlay(item);
          });
        }
      }
    }
    this.carIds = [];

    for (let i = 0; i < Math.ceil(splitNum); i++) {
      num += 1;
      if (num > Math.ceil(splitNum)) {
        break;
      }
      setTimeout(() => {
        this.$nextTick(() => {
          for (let item of carList.splice(number, number + 300)) {
            let info = JSON.parse(JSON.stringify(this.carData))[
              item.vehicleCard
            ];

            setTimeout(() => {
              if (Number(item.longitude) !== 0 && Number(item.latitude) !== 0) {
                setTimeout(() => {
                  this.carIds.push(item.vehicleCard);
                  if (!updateState) {
                    carData[item.vehicleCard] = {
                      longitude: item.longitude,
                      latitude: item.latitude,
                    };
                  }
                  marker = new BMapGL.Marker(
                    new BMapGL.Point(item.longitude, item.latitude),
                    {
                      icon: myIcon,
                      id: item.vehicleCard,
                    }
                  );
                  // 如果是更新状态
                  // if (updateState) {
                  //   // if (item.vehicleCard === "京A9FR35") {
                  //   //   this.$nextTick(() => {
                  //   //     console.log(
                  //   //       JSON.parse(JSON.stringify(this.carData))["京A9FR35"]
                  //   //     );
                  //   //     console.log(item.vehicleCard);
                  //   //   });
                  //   // }
                  //   // console.log(info);
                  //   // 判断是否上次有这个车牌号

                  //   if (info) {
                  //     // 判断上次与这次经纬度是否一致
                  //     if (
                  //       info.longitude != item.longitude ||
                  //       info.latitude != item.latitude
                  //     ) {
                  //       // 不等于重新赋值
                  //       carData[item.vehicleCard] = {
                  //         longitude: item.longitude,
                  //         latitude: item.latitude,
                  //       };

                  //       marker = new BMapGL.Marker(
                  //         new BMapGL.Point(item.longitude, item.latitude),
                  //         {
                  //           icon: myIcon,
                  //           id: item.vehicleCard,
                  //         }
                  //       );
                  //       let index = this.carIds.indexOf(item.vehicleCard);

                  //       this.carIds.splice(index, 1);
                  //       this.carIds.push(item.vehicleCard);
                  //       carData[item.vehicleCard] = {
                  //         longitude: item.longitude,
                  //         latitude: item.latitude,
                  //       };
                  //       for (let items of this.map.getOverlays()) {
                  //         if (item.vehicleCard == items._config.id) {
                  //           setTimeout(() => {
                  //             this.map.removeOverlay(items);
                  //           });
                  //         }
                  //       }
                  //     }
                  //   }
                  // } else {
                  //   marker = new BMapGL.Marker(
                  //     new BMapGL.Point(item.longitude, item.latitude),
                  //     {
                  //       icon: myIcon,
                  //       id: item.vehicleCard,
                  //     }
                  //   );
                  // }

                  // if (updateState) {
                  //   for (let items of this.map.getOverlays()) {
                  //     if (items._config.id === item.vehicleCard) {
                  //       if (
                  //         items.latLng.lng != item.longitude ||
                  //         items.latLng.lat != item.latitude
                  //       ) {
                  //         setTimeout(() => {
                  //           this.map.removeOverlay(items);
                  //           marker = new BMapGL.Marker(
                  //             new BMapGL.Point(item.longitude, item.latitude),
                  //             {
                  //               icon: myIcon,
                  //               id: item.vehicleCard,
                  //             }
                  //           );
                  //         });
                  //       }
                  //     }
                  //   }
                  // } else {

                  // }
                  if (marker) {
                    this.map.addOverlay(marker);
                    this.$nextTick(() => {
                      marker.addEventListener("click", async (e) => {
                        let result = await Account.getMonitorData(
                          "GET_VEHICLE_LOCATION",
                          0,
                          0,
                          e.currentTarget._config.id
                        );
                        let data = result.data;
                        // this.filterMarker(e.target.point, index);
                        let content = `<div>
         
       
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
                src="https://image.wintaotel.com.cn/icon_1-3087.png"
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
                <li>&nbsp; ${data.staffname} </li>
                <li>&nbsp; ${data.vehicleCard}</li>
                <li style="font-weight: 400; ">
                 &nbsp; ${data.date}
                </li>
              </ul>
            </div>
          </div>
          <div style="margin-top:20px">
            <ul>
             
              <li style="float: left; color: #fff;width:50%">
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
                width:100%">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  OBD编号: </span
                >${data.obdCode ? data.obdCode : "无"}
              </li>
            </ul>
          </div>
        </div>
      </div>`;
                        var infoWindow = new BMapGL.InfoWindow(content, opts);
                        this.map.openInfoWindow(
                          infoWindow,
                          new BMapGL.Point(
                            e.currentTarget.latLng.lng,
                            e.currentTarget.latLng.lat
                          )
                        );
                      });
                    });
                  }
                }, 0);
              }
            });
            // 删除不出车的数据
            let carIndex = this.carData.indexOf(item.vehicleCard);
            this.carData.splice(carIndex, 1);
          }
          number += 300;
        });
      }, 0);
      setTimeout(() => {
        this.isHideLoading = false;
      }, 300);
      // 关闭loading
    }
    // 移除改变不出车的数据
    // this.$nextTick(() => {
    //   let rmIds = [];
    //   for (let item in this.carData) {
    //     rmIds.push(item);
    //   }
    //   for (let item of this.map.getOverlays()) {
    //     if (rmIds.indexOf(item._config.id) > -1) {
    //       setTimeout(() => {
    //         this.map.removeOverlay(item);
    //       });
    //     }
    //   }
    // });
    this.carData = carData;
  }
  // 获取工作量
  async getWorkAddress(updateState) {
    // 工作量开关没打开
    if (!this.workStatus) {
      return;
    }
    let workIcons = new BMapGL.Icon(workIcon, new BMapGL.Size(10, 10)); //工作量图标
    let marker;
    if (updateState) {
      for (let item of this.map.getOverlays()) {
        if (this.workIds.indexOf(item._config.id) > -1) {
          setTimeout(() => {
            this.map.removeOverlay(item);
          });
        }
      }
    }
    var opts = {
      width: 382,
      height: 320,
      title: "<span style='display:none'></span>",
    };
    let workResult = await Account.getMonitorData("LIST_WORKLOAD_LOCATION");
      this.workIds = [];
    
    for (let item of workResult.data) {
      setTimeout(() => {
        marker = new BMapGL.Marker(
          new BMapGL.Point(item.longitude, item.latitude),
          {
            icon: workIcons,
            tableSuffix: item.tableSuffix,
            id: item.id,
          }
        );
        this.workIds.push(item.id);
        marker.addEventListener("click", async (e) => {
          let result = await Account.getMonitorData(
            "GET_WORKLOAD_LOCATION",
            0,
            0,
            undefined,
            e.currentTarget._config.tableSuffix,
            e.currentTarget._config.id
          );
          let data = result.data;
          this.workDetailInfo = data;
          // this.filterMarker(e.target.point, index);
          let content = `<div>
       
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
                src="https://image.wintaotel.com.cn/icon_1-30.png"
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
                <li>&nbsp;${data.userName} </li>
                <li> &nbsp; ${data.createTime}</li>
                <li style="font-weight: 400;">
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
              <li style="float: left;margin-top:10px;color: #fff;width:100%">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  维护信息: </span
                >${data.maintenance}
              </li>
              <li style="float: left;margin-top:10px;color: #fff;margin-left: 20px;cursor:pointer;color:rgba(255, 251, 7, 1)" onclick='handleShowInfo()'>点击查看详细信息 》 》</li>
            </ul>
          </div>
        </div>
      </div>`;
          var infoWindow = new BMapGL.InfoWindow(content, opts);
          this.map.openInfoWindow(
            infoWindow,
            new BMapGL.Point(
              e.currentTarget.latLng.lng,
              e.currentTarget.latLng.lat
            )
          );
        });
        this.map.addOverlay(marker);
      }, 0);
    }
    setTimeout(() => {
      this.isHideLoading = false;
    }, 300);
  }
  // 获取油机位置
  async oliAddress(updateStatus) {
    let marker;
    if (!this.oliStatus) {
      for (let item of this.map.getOverlays()) {
        if (this.oliIds.indexOf(item._config.id) > -1) {
          this.map.removeOverlay(item);
        }
      }
    }
    if (!updateStatus) {
      for (let item of this.map.getOverlays()) {
        if (this.oliIds.indexOf(item._config.id) > -1) {
          this.map.removeOverlay(item);
        }
      }
    }
    let oliIcons = new BMapGL.Icon(oliIcon, new BMapGL.Size(10, 10)); // 油机图标
    let oliResult = await Account.getMonitorData("LIST_OIL_MACHINE_LOCATION");
    var opts = {
      width: 382,
      height: 320,
      title: "<span style='display:none'></span>",
    };
    this.oliIds = [];
    for (let item of oliResult.data) {
      if (Number(item.longitude) !== 0 && Number(item.latitude) !== 0) {
        marker = new BMapGL.Marker(
          new BMapGL.Point(item.longitude, item.latitude),
          {
            icon: oliIcons,
            id: item.oilCode,
          }
        );
        this.oliIds.push(item.oilCode);
        marker.addEventListener("click", async (e) => {
          let result = await Account.getMonitorData(
            "GET_OIL_MACHINE_LOCATION",
            0,
            0,
            undefined,
            undefined,
            undefined,
            undefined,
            e.currentTarget._config.id
          );
          let data = result.data;

          // this.filterMarker(e.target.point, index);
          let content = `<div>
          
        <div
          style="
            width: 326px;
            height: 200px;
            padding: 20px;
            border: 2px solid #07DBEB;
            background: rgba(39, 137, 143, 0.7);
          "
        >
          <div style="height: 80px; width: 100%; display: flex">
            <div style="height: 60px; width: 60px; margin-top: 10px">
              <img
                src="https://image.wintaotel.com.cn/icon_1-309874.png"
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
                <li>&nbsp;油机编号: ${data.oilCode} </li>
                <li> &nbsp;状态: ${data.state}</li>
              
              </ul>
            </div>
          </div>
          <div >
            <ul>
              
                  <li style="float: left;margin-top:10px;color: #fff;width:50%">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  电流: </span
                >${data.avgElectric}
              </li>
                <li style="float: left;margin-top:10px;color: #fff;width:50%">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  电压: </span
                >${data.voltage}
              </li>
                <li style="float: left;margin-top:10px;color: #fff;width:50%">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  发电量: </span
                >${data.powerAmount}
              </li>
               <li style="float: left; margin-top:10px;color: #fff;width:100%">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  lac/CI值: </span
                >${data.lac}
              </li>
                <li style="float: left;margin-top:10px;color: #fff;text-align:left">
                <span style="color: rgba(7, 224, 183, 1); font-weight: bold">
                  发电时间: </span
                >${data.electricTime}
              </li>
            </ul>
          </div>
        </div>
      </div>`;
          var infoWindow = new BMapGL.InfoWindow(content, opts);
          this.map.openInfoWindow(
            infoWindow,
            new BMapGL.Point(
              e.currentTarget.latLng.lng,
              e.currentTarget.latLng.lat
            )
          );
        });
        this.map.addOverlay(marker);
      }
    }
  }
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
  mounted() {
    setTimeout(() => {
      setInterval(() => {
        this.getCarAddress(true);
        this.getPeopleAddress(true);
      }, 300000);
    }, 300000);
    setTimeout(() => {
      setInterval(() => {
        this.getWorkAddress(true);
        this.oliAddress(true);
      }, 400000);
    }, 400000);

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.currentTime = this.getCurrentDate();
    }, 1000);
    BMPGL(this.ak).then(async (BMapGL) => {
      let points = [];

      /** 
var map = new BMapGL.Map('allmap');
map.setMapType(BMAP_EARTH_MAP);


var point = new BMapGL.Point(119.305724, 26.092186);
map.centerAndZoom(point, 18);
// map.addControl(new BMapGL.NavigationControl());
// map.addControl(new BMapGL.MapTypeControl());
var marker = new BMapGL.Marker(point);
map.addOverlay(marker);

*/

      // map.centerAndZoom(new BMapGL.Point(117.200, 36.2437), 18);
      // map.enableScrollWheelZoom(true);
      // map.setTilt(45);
      // map.setDisplayOptions({
      //     poiText: false,  // 隐藏poi标注
      //     poiIcon: false,  // 隐藏poi图标
      //     building: false  // 隐藏楼块
      // });
      //  map.setMapType(BMAP_EARTH_MAP); // 设置地图类型为地球模式

      // var pStart = new BMapGL.Point(117.19635, 36.24093);
      // var pEnd = new BMapGL.Point(117.20350, 36.24764);
      // var bounds = new BMapGL.Bounds(new BMapGL.Point(pStart.lng, pEnd.lat), new BMapGL.Point(pEnd.lng, pStart.lat));
      // var imgOverlay = new BMapGL.GroundOverlay(bounds, {
      //     type: 'image',
      //     url: 'https://img0.baidu.com/it/u=2636026792,555791267&fm=26&fmt=auto',
      //     opacity: 1
      // });
      // map.addOverlay(imgOverlay);

      //   console.log(BMapGL);
      this.map = new BMapGL.Map("allmap"); // 创建Map实例
      let that = this;
      this.map.centerAndZoom(new BMapGL.Point(113.82, 38.07), 5); // 初始化地图,设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.map.setMapType(BMAP_EARTH_MAP); // 设置地图类型为地球模式
      // 地图加载完毕
      this.map.addEventListener("tilesloaded", () => {
        that.$emit("closeLoading");
      });
      // map.setDisplayOptions({
      //   skyColors: ["rgba(186, 0, 255, 0)", "rgba(186, 0, 255, 0.2)"],
      // });
      //  map.setMapStyle({styleJson: goodsData})
      //  map.setMapStyle({
      //           style: 'midnight'
      //       });
      // map.setDisplayOptions({
      //   poiIcon: true,
      //   poiText: true,
      // });
      var pointOptions = {
        size: BMAP_POINT_SIZE_SMALL,
        shape: BMAP_POINT_SHAPE_STAR,
        color: "#d340c3",
      };
      // console.log(points);
      //         var pointCollection = new BMapGL.PointCollection(points, pointOptions);  // 初始化PointCollection

      // console.log(pointCollection);
      var marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925));
      var marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925));
      // 创建图标
      var marker;
      setTimeout(() => {
        //获取车辆位置
        this.getCarAddress();

        // // 获取工作量
        // this.getWorkAddress();

        // //  获取油机位置
        // this.oliAddress();
        // // 获取工牌位置
        // this.getPeopleAddress();
      }, 1000);
    });
  }
}
</script>

<style lang="scss" scoped>
.transparent-loading {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 99999;
  line-height: 100px;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  margin-top: -100px;
  margin-left: -50px;
  span {
    position: absolute;
    width: 100px;
    height: 100px;
    // background: rgba(255,255,255,0.2);
    top: 50%;
    margin-top: -100px;
    left: 50%;
    margin-left: -50px;
    display: inline-block;
    img {
    }
  }
}
@keyframes mymove {
  100% {
    background: linear-gradient(0deg, #1a46f7 0%, #22f7ff 0%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  75% {
    background: linear-gradient(0deg, #1a46f7 0%, #22f7ff 25%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  50% {
    background: linear-gradient(0deg, #1a46f7 25%, #22f7ff 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  25% {
    background: linear-gradient(0deg, #1a46f7 50%, #22f7ff 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  0% {
    background: linear-gradient(0deg, #1a46f7 75%, #22f7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  100% {
    background: linear-gradient(0deg, #1a46f7 75%, #22f7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  75% {
    background: linear-gradient(0deg, #1a46f7 50%, #22f7ff 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  50% {
    background: linear-gradient(0deg, #1a46f7 25%, #22f7ff 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  25% {
    background: linear-gradient(0deg, #1a46f7 0%, #22f7ff 25%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  0% {
    background: linear-gradient(0deg, #1a46f7 0%, #22f7ff 0%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.satellite-map {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .mark-view {
    position: absolute;
    right: 100px;
    height: 25px;
    line-height: 25px;
    color: #fff;
    z-index: 999;
    text-align: left;
    top: 150px;
    img {
      height: 15px;
      float: left;
      margin-top: 5px;
      margin-right: 10px;
    }
  }
  .top-nav {
    height: 125px;
    position: absolute;
    // background-image: url('~@/assets/images/top-bg.png');
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    .back {
      float: left;
      position: absolute;
      left: 40px;
      cursor: pointer;
      top: 40px;
      background-image: url("~@/assets/images/back-bg.png");
      width: 230px;
      font-size: 20px;
      z-index: 1000;
      background-size: 230px 44px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      height: 44px;
      line-height: 44px;
    }
    .time {
      position: absolute;
      right: 40px;
      font-size: 16px;
      color: #fff;
      top: 40px;
    }
    .content {
      margin: 0 auto;
      height: 120px;
      font-family: YouSheBiaoTiHei;
      font-size: 75px;

      background: linear-gradient(0deg, #1a46f7 0%, #22f7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 120px;
      text-align: center;
      // animation: mymove 2s infinite;
      // -webkit-animation: mymove 2s infinite; /*Safari and Chrome*/
    }
  }
  .top-nav::after {
    content: "";
    background: url("~@/assets/images/top-nav.gif");
    opacity: 0.8;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  .map-nav {
    position: absolute;
    // width: 500px;
    padding-right: 20px;
    z-index: 999;
    font-size: 20px;
    height: 100%;
    left: 0;
    top: 130px;
    .logo {
      font-size: 42px;
      margin: 0 auto;
      width: 470px;
      font-family: YouSheBiaoTiHei;
      margin-top: 10px;
      font-weight: 400;
      padding-right: -5px;
      line-height: 100px;
      height: 100px;
      background-repeat: no-repeat;
      background-image: url("~@/assets/images/time-bg.png");
      background-size: 470px 100px;
      color: #ffffff;
    }
    .back {
      width: 188px;
      margin-left: -40px;
      margin-top: 60px;
      height: 51px;
      line-height: 50px;
      cursor: pointer;
      text-align: center;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      // background: rgba(0, 201, 255, 0.5);
      img {
        height: 60px;
      }
      // opacity: 0.5;
    }
    .navigation {
      margin-top: 40px;
      ul {
        li {
          // width: 420px;
          height: 90px;
          padding-right: 40px;
          background: linear-gradient(
            90deg,
            #043fc6 0%,
            rgba(23, 164, 241, 0) 100%
          );
          margin-top: 20px;
          .left {
            float: left;
            padding: 25px 0;
            width: 50px;
            margin-left: 20px;
            img {
              height: 40px;
            }
          }
          .content {
            padding: 20px 0;
            text-align: left;
            margin-left: 50px;
            width: 130px;
            float: left;
            .name {
              font-size: 22px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #03f6ff;
            }
            .num {
              font-size: 15px;
              margin-top: 5px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }
          .right {
            float: left;
            margin-top: 15px;
            margin-left: 25px;
            span {
              margin-top: 15px;
              width: 84px;
              line-height: 35px;
              display: inline-block;
              height: 35px;
              color: #fff;
              // background: #03f6ff;
              img {
                height: 15px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}

/deep/ .BMap_cpyCtrl {
  display: none;
}
/deep/ .anchorBL {
  display: none;
}
/deep/ .BMap_bubble_top {
  display: none;
}
/deep/ .BMap_bubble_pop {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
  div {
    img {
      display: block !important;
    }
  }
  img:last-child {
    display: none;
  }
}
</style>
