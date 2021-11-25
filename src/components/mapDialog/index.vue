<!--
 * @Author: zeHua
 * @Date: 2021-11-19 17:14:34
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-25 17:02:10
 * @FilePath: /zhjt/src/components/mapDialog/index.vue
-->
<template>
  <!-- 卫星地图 -->
  <div class="satellite-map">
    <!-- 头部导航 -->
    <div class="top-nav">
      <div class="back">&lt;&lt; 返回上个页面</div>
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
      <div class="back" @click="handleBack"><img src="@/assets/images/dialog-btn.png"/></div>

      <div class="navigation">
        <ul>
          <li>
            <div class="left">
              <img src="@/assets/images/person.png" />
            </div>
            <div class="content">
              <div class="name">保障人员</div>
              <div class="num">在线数量 100</div>
            </div>
            <div class="right" style="width:80px">
            <switchs :value="peopleStatus" text="on|off" @change='peopleChange'></switchs>
            </div>
          </li>
          <li>
            <div class="left">
              <img src="@/assets/images/car.png" />
            </div>
            <div class="content">
              <div class="name">工作车辆</div>
              <div class="num">在线数量 100</div>
            </div>
            <div class="right">
              <span>  <switchs :value="carStatus" text="on|off"></switchs></span>
            </div>
          </li>
          <li>
            <div class="left">
              <img src="@/assets/images/line-nav.png" />
            </div>
            <div class="content">
              <div class="name">工作量</div>
              <div class="num">上报数量 50000</div>
            </div>
            <div class="right">
              <span>  <switchs :value="workStatus" text="on|off"></switchs></span>
            </div>
          </li>
          <li>
            <div class="left">
              <img src="@/assets/images/gas.png" />
            </div>
            <div class="content">
              <div class="name">油机监控</div>
              <div class="num">在线数量 100</div>
            </div>
            <div class="right">
               <span>  <switchs :value="oliStatus" text="on|off"></switchs></span>
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
  </div>
</template>
<script>
import { Options, Vue } from "vue-class-component";
import * as echarts from "echarts";
import { BMPGL } from "@/config/bmpgl.js"
import { Account } from "@/api";
import switchs from '@/components/switch/index.vue';
var goodsData = require("../../assets/json/geo.json"); //导入设置好的主题颜色 如果不需要，可以不做此操作
const iconImg = require("@/assets/images/car-icon.png");
const workIcon = require("@/assets/images/work-icon.png");
const oliIcon = require("@/assets/images/oli-icon.png");
const peopleIcon = require("@/assets/images/people-icon.png");


@Options({
  components:{
    switchs
  }
})
export default class Container extends Vue {
  ak = "jsug1ccNL9hyeZInNcfAN8f4qG65SyYx"; //ak秘钥
  timer = "";
  toggle=false;
  currentTime = [];
  peopleStatus=true;// 人员保障状态
  oliStatus=true;//油机状态
  workStatus=true;//工作量状态
  carStatus=true;// 车辆状态
  map='';


    /**
     * 修改人员状态
     * @status 状态
     */
    peopleChange(status){
        this.peopleStatus=status;
        console.log(status);
        if(!status){
          for(let item of this.map.getOverlays()){
                console.log(item);
                item._visible=false;
                this.map.removeOverlay(item);
          }
          // this.map.clearOverlays();

        }
    }
  handleBack() {
    this.$emit("handleBack");
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

      this.map.centerAndZoom(new BMapGL.Point(123.46417, 41.6775), 5); // 初始化地图,设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.map.setMapType(BMAP_EARTH_MAP); // 设置地图类型为地球模式
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
      console.log(BMapGL);
      //         var pointCollection = new BMapGL.PointCollection(points, pointOptions);  // 初始化PointCollection

      // console.log(pointCollection);
      var marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925));
      var marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925));
      // 创建图标
      var myIcon = new BMapGL.Icon(iconImg, new BMapGL.Size(10, 10)); // 车辆图标
      let workIcons = new BMapGL.Icon(workIcon, new BMapGL.Size(10, 10)); //工作量图标
      let oliIcons = new BMapGL.Icon(oliIcon, new BMapGL.Size(10, 10)); // 油机图标
      let peopleIcons = new BMapGL.Icon(peopleIcon, new BMapGL.Size(10, 10)); // 电子工牌图标
      var marker;
      //获取车辆位置
      let result = await Account.getMonitorData("LIST_VEHICLE_LOCATION");
      let carList = result.data;
      let splitNum = carList.length / 300; //每次请求300个
      let num = 1; //计数器
      let number = 0;
      for (let i = 0; i < Math.ceil(splitNum); i++) {
        num += 1;
        if (num > Math.ceil(splitNum)) {
          break;
        }
        setTimeout(() => {
          for (let item of result.data.splice(number, number + 300)) {
            marker = new BMapGL.Marker(
              new BMapGL.Point(item.longitude, item.latitude),
              {
                icon: myIcon,
                id: item.vehicleCard,
              }
            );
            this.map.addOverlay(marker);
            marker.addEventListener("click", async (e) => {
              alert(1);
              console.log(e);
              let result = await Account.getMonitorData(
                "GET_VEHICLE_LOCATION",
                0,
                0,
                e.currentTarget._config.id
              );
              let data = result.data;
              console.log(data);
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
          }

          number += 300;
        }, 5);
      }

      // 获取工作量
      let workResult = await Account.getMonitorData("LIST_WORKLOAD_LOCATION");
      console.log(workResult.data);
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
          marker.addEventListener("click", async (e) => {
            alert(1);
            console.log(e);
            let result = await Account.getMonitorData(
              "GET_WORKLOAD_LOCATION",
              0,
              0,
              undefined,
              e.currentTarget._config.tableSuffix,
              e.currentTarget._config.id
            );
            console.log(result);
            let data = result.data;
            console.log(data);
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
                <li>&nbsp;${data.userName} </li>
                <li> NO.33654845413</li>
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
        }, 5);
      }

      //  获取油机位置
      let oliResult = await Account.getMonitorData("LIST_OIL_MACHINE_LOCATION");
      console.log(oliResult);
      for (let item of oliResult.data) {
        marker = new BMapGL.Marker(
          new BMapGL.Point(item.longitude, item.latitude),
          {
            icon: oliIcons,
          }
        );
        this.map.addOverlay(marker);
      }

      // 获取工牌位置
      let peopleResult = await Account.getMonitorData("LIST_PERSONNEL_LOCATION");
      console.log('peopleResult');
      console.log(peopleResult);
      for (let item of peopleResult.data) {
        marker = new BMapGL.Marker(
          new BMapGL.Point(item.longitude, item.latitude),
          {
            icon: peopleIcons,
          }
        );
        marker.addEventListener("click", async (e) => {
          alert(1);
          console.log(e);
          let result = await Account.getMonitorData(
            "GET_PERSONNEL_LOCATION",
            0,
            0,
            e.currentTarget._config.id
          );
          let data = result.data;
          console.log(data);
          // this.filterMarker(e.target.point, index);
          let content = `<div>
           <div
             style="
              width: 242px;
            height: 35px;
            text-indent:1rem;
            background: rgba(25, 193, 206, 1);
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
            border: 2px solid #07DBEB;
            background: rgba(39, 137, 143, 0.7);
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
                <li>&nbsp; ${data.staffname} 直线距离：1km</li>
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
      }

      // for (let item of result.data) {
      //   let mark = new BMapGL.Marker(
      //     new BMapGL.Point(item.longitude, item.latitude),
      //     {
      //       icon: myIcon,
      //     }
      //   );
      //   map.addOverlay(mark);
      //   // points.push(new BMapGL.Point(item.longitude, item.latitude))
      // }

      // var point = new BMapGL.Point(119.305724, 26.092186);
      // var icon = new BMapGL.Icon(
      //   "http://n.sinaimg.cn/tech/transform/280/w128h152/20210528/0893-kquziih9539965.gif",
      //   new BMapGL.Size(200, 302),
      //   {
      //     anchor: new BMapGL.Size(100, 300),
      //   }
      // );
      // var marker = new BMapGL.Marker(point, {
      //   icon: icon,
      //   first: "hello world",
      // });
      // map.addOverlay(points);
      // let marker;
      var opts = {
        width: 382,
        height: 320,
        title: "<span style='display:none'></span>",
      };

      //分割=====
      // map.addOverlay(pointCollection);  // 添加Overlay

      //   const myIcon = new BMap.Icon(
      //     "https://img1.baidu.com/it/u=2153526506,417124131&fm=26&fmt=auto",
      //     new BMap.Size(400, 400)
      //   );

      //   const marker = new BMapGL.Marker(
      //     new BMapGL.Point(116.498752, 39.900157),
      //     { icon: myIcon }
      //   );
      //   console.log(marker);
      // marker.addEventListener("click", (e) => {
      //     // this.filterMarker(e.target.point, index);
      // });
      //   console.log(map.addOverlay(marker));
      //   map.addOverlay(marker);

      //   var icon = new BMapGL.Icon(
      //     "https://img1.baidu.com/it/u=2153526506,417124131&fm=26&fmt=auto",
      //     new BMapGL.Size(20, 32),
      //     {
      //       anchor: new BMapGL.Size(10, 30),
      //     }
      //   );
      //   //创建一个图像标注实例。point参数指定了图像标注所在的地理位置
      //   var mkr = new BMapGL.Marker(new BMapGL.Point(116.498752, 39.900157), {
      //     icon: icon,
      //   });
      //   //将覆盖物添加到地图中
      //   map.addOverlay(mkr);
      //   //将地图的中心点更改为给定的点
      //   map.panTo(116.498752, 39.900157);
      //     var pStart = new BMapGL.Point(117.19635, 36.24093);
      // var pEnd = new BMapGL.Point(117.20350, 36.24764);
      // var bounds = new BMapGL.Bounds(new BMapGL.Point(pStart.lng, pEnd.lat), new BMapGL.Point(pEnd.lng, pStart.lat));
      // var imgOverlay = new BMapGL.GroundOverlay(bounds, {
      //     type: 'image',
      //     url: 'https://lbsyun.baidu.com/jsdemo/img/shouhuimap.png',
      //     opacity: 1
      // });
      // map.addOverlay(imgOverlay);
      // map.centerAndZoom(new BMapGL.Point(117.20350, 36.24764), 18);
    });
  }
}
</script>

<style lang="scss" scoped>
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
      top: 40px;
      background-image: url("~@/assets/images/back-bg.png");
      width: 230px;
      font-size: 20px;
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
    width: 500px;
    z-index: 999;
    font-size: 20px;
    height: 100%;
    left: 0;
    top: 0;
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
      margin-top: 160px;
      height: 51px;
      line-height: 50px;
      cursor: pointer;
      text-align: center;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      // background: rgba(0, 201, 255, 0.5);
      img{
        height: 60px;
      }
      // opacity: 0.5;
    }
    .navigation {
      margin-top: 40px;
      ul {
        li {
          width: 420px;
          height: 90px;
          background: linear-gradient(
            90deg,
            #043FC6 0%,
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
              margin-top:5px;
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
