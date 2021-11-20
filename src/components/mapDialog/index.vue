<!--
 * @Author: zeHua
 * @Date: 2021-11-19 17:14:34
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-20 18:08:23
 * @FilePath: /zhjt/src/components/mapDialog/index.vue
-->
<template>
  <!-- 卫星地图 -->
  <div class="satellite-map">
    <!-- 地图导航 -->
    <div class="map-nav">
        <div ></div>
      <!-- logo -->
      <dv-border-box-1 style="text-align:center;margin-top:20px;height:110px;padding:10px;width:490px">
      <div class="logo" style="margin-top:10px">地图监控中心</div>
      </dv-border-box-1>
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
import { Vue } from "vue-class-component";
import * as echarts from "echarts";
import { BMPGL } from "@/config/bmpgl.js";

export default class Container extends Vue {
  ak = "jsug1ccNL9hyeZInNcfAN8f4qG65SyYx"; //ak秘钥
  mounted() {
    BMPGL(this.ak).then((BMapGL) => {
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
      var map = new BMapGL.Map("allmap"); // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(123.46417, 41.6775), 5); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.setMapType(BMAP_EARTH_MAP); // 设置地图类型为地球模式
      map.setDisplayOptions({
        poiIcon: true,
        poiText: true,
      });
      var point = new BMapGL.Point(119.305724, 26.092186);
      var icon = new BMapGL.Icon(
        "https://img1.baidu.com/it/u=2153526506,417124131&fm=26&fmt=auto",
        new BMapGL.Size(20, 32),
        {
          anchor: new BMapGL.Size(10, 30),
        }
      );
      var marker = new BMapGL.Marker(point, {
        icon: icon,
        first: "hello world",
      });
      var opts = {
        width: 382,
        height: 320,
        title: "<span style='display:none'></span>",
      };
      marker.addEventListener("click", (e) => {
        console.log(e);
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
            <li style="float: left;margin-top:10px;color: #fff;margin-left: 20px;cursor:pointer;color:rgba(255, 251, 7, 1)" onclick='handleShowInfo()'>点击查看详细信息 》 》</li>
          </ul>
        </div>
      </div>
    </div>`;
        var infoWindow = new BMapGL.InfoWindow(content, opts);
        map.openInfoWindow(infoWindow, new BMapGL.Point(123.46417, 41.6775));
      });
      map.addOverlay(marker);
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
.satellite-map {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid red;
  .map-nav {
    position: absolute;
    width: 500px;
    z-index: 999;
    height: 100%;
    left: 0;
    top: 0;
    border: 1px solid red;
    .logo {
      font-size: 42px;
      
      margin: 0 auto;
      width: 470px;
      font-family: YouSheBiaoTiHei;
      margin-top:10px;
      font-weight: 400;
      padding-right:-5px;
      line-height: 100px;
      height: 100px;
      background-repeat: no-repeat;
      background-image: url("~@/assets/images/time-bg.png") ;
      background-size: 470px 100px;
      color: #ffffff;
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
