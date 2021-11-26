<!--
 * @Author: zeHua
 * @Date: 2021-09-30 15:07:04
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-26 13:36:56
 * @FilePath: /zhjt/src/components/rightSide/index.vue
-->
<template>
  <div class="silde-right">
    <dv-border-box-12
      :reverse="true"
      class="l-side__abnormal__content"
      backgroundColor="rgba(20,87,140, 0.29)"
    >
      <!-- 工作量标题 -->

      <div class="workload-title">
        <img src="@/assets/images/work-title.png" /> <font>工作量占比</font>
      </div>
      <div class="workload-content">
        <!-- 左上角 -->
        <font class="desc top-left">
          <font class="name">常规工时</font>
          <font class="num"
            >{{ workLoadData.newData.commonWorkscore }}
            <i class="icon">
              <img
                src="@/assets/images/upward.png"
                v-if="workLoadData.isTopLeft"
              />
              <img
                src="@/assets/images/down.png"
                v-if="!workLoadData.isTopLeft"
              /> </i
          ></font>
        </font>
        <!-- 右上角 -->
        <font class="desc top-right">
          <font class="name">合同内</font>
          <font class="num"
            >{{ workLoadData.newData.htnType }}
            <i class="icon">
              <img
                src="@/assets/images/upward.png"
                v-if="workLoadData.isTopRight" />
              <img
                src="@/assets/images/down.png"
                v-if="!workLoadData.isTopLeft" /></i
          ></font>
        </font>
        <!-- 左下角 -->
        <font class="desc b-left">
          <font class="num"
            >{{ workLoadData.newData.excessWorkscore }}
            <i class="icon">
              <img
                src="@/assets/images/upward.png"
                v-if="workLoadData.isBottomLeft" />
              <img
                src="@/assets/images/down.png"
                v-if="!workLoadData.isTopLeft" /></i
          ></font>
          <font class="name">超额工时</font>
        </font>
        <!-- 右下角 -->
        <font class="desc b-right">
          <font class="num"
            >{{ workLoadData.newData.htwType
            }}<i class="icon" style="margin-left: 5px">
              <img
                src="@/assets/images/upward.png"
                v-if="workLoadData.isBottomRight" />
              <img
                src="@/assets/images/down.png"
                v-if="!workLoadData.isTopLeft" /></i
          ></font>
          <font class="name">合同外</font>
        </font>
        <div
          class="workload-content-echarts"
          id="workload-echarts"
          ref="workload"
          style="height: 200px; width: 200px; margin: 0 auto"
        ></div>
      </div>
    </dv-border-box-12>
    <dv-border-box-12
      :reverse="true"
      style="margin-top: 20px"
      class="l-side__abnormal__content"
      backgroundColor="rgba(20,87,140, 0.29)"
    >
      <span class="oil-title">里程数监控</span>
      <div class="oli-chart">
        <div
          id="oliChart"
          ref="oliChart"
          style="width: 100%; height: 250px"
        ></div>
      </div>
    </dv-border-box-12>
    <!-- 工作区域 -->
    <dv-border-box-12
      :reverse="true"
      style="margin-top: 20px"
      class="l-side__abnormal__content"
      backgroundColor="rgba(20,87,140, 0.29)"
    >
      <div class="work">
        <!-- 工作效率 -->
        <div class="efficiency">
          <div class="title">工作效率</div>
          <div id="main" ref="main" style="width: 180px; height: 180px"></div>
        </div>
        <!-- 工作评定 -->
        <div class="evaluation">
          <div class="title">工作评级<i></i></div>
          <div class="eval-process">
            <div
              id="echartsPros"
              ref="echartsPros"
              style="height: 200px; width: 130px; padding-left: 20px"
            ></div>
            <!-- <ul>
              <li>
                <i></i>
              </li>
              <li></li>
              <li></li>
            </ul> -->
          </div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import * as echarts from "echarts";
import { Account } from "@/api/index";

export default class Container extends Vue {
  salvProMax = [];
  efficiencyConfig: any = {}; //效率配置表
  workLoadData = {
    newData: {},
    isTopLeft: true,
    isTopRight: true,
    isBottomLeft: true,
    isBottomRight: true,
    comparedToYesterday: 0,
  }; //工作量占比数据
  config = {
    number: [100],
    content: "{nt}%",
    style: {
      fontSize: "0",
    },
  };
  evaluationConfig = {
    showValue: true,

    data: [
      {
        name: "工作时长",
        value: 167,
      },
      {
        name: "工作得分",
        value: 67,
      },
      {
        name: "车辆行驶时长",
        value: 123,
      },
    ],
  };
  topName = [];
  attaData = [];
  attaName: any = [];
  attackSourcesColor: any = [
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: "#EB3B5A" },
      { offset: 1, color: "#FE9C5A" },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: "#FA8231" },
      { offset: 1, color: "#FFD14C" },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: "#F7B731" },
      { offset: 1, color: "#FFEE96" },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: "#395CFE" },
      { offset: 1, color: "#2EC7CF" },
    ]),
  ];
  attackSourcesColor1: any = [
    "#EB3B5A",
    "#FA8231",
    "#F7B731",
    "#3860FC",
    "#1089E7",
    "#F57474",
    "#56D0E3",
    "#1089E7",
    "#F57474",
    "#1089E7",
    "#F57474",
    "#F57474",
  ];
  workloadCharts: any = "";
  // 工作效率角度
  angle = 0;
  // 工作评级
  workRatingList = ["工作时长", "工作得分", "车辆行驶时长"];
  //  工作评级数据
  workRatingData: any = [];
  mounted() {
    this.getWorkloadData();
    this.getWorkRating();
    this.$nextTick(() => {
      var chartDom: any = this.$refs.workload;
      this.workloadCharts = echarts.init(chartDom);
      // this.workEfficEcharts();
      this.oliMonitoring();

      setInterval(() => {
        //用setInterval做动画感觉有问题
        this.initWorkloadEcharts();
      }, 50);
    });
  }
  //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)

  attackSourcesDataFmt(sData: any) {
    var sss: any = [];
    sData.forEach((item: any, i: any) => {
      let itemStyle = {
        color:
          i > 3
            ? (this as any).attackSourcesColor[3]
            : this.attackSourcesColor[i],
      };
      sss.push({
        value: item,
        itemStyle: itemStyle,
      });
    });
    return sss;
  }

  // 获取工作效率与工作评级
  async getWorkRating() {
    let result = await Account.getMonitorData(
      "COUNT_JOB_EFFICIENCY_AND_JOB_EVALUATION"
    );
    let data = result.data;
    this.workRatingData = [
      data.workHour,
      data.workScore,
      data.vehcileDrivingTime,
    ];
    this.efficiencyConfig = data;
    this.rankingEcharts();
    this.workEfficEcharts();
  }

  // 获取工作量占比数据
  async getWorkloadData() {
    let result = await Account.getMonitorData("RATE_WORKLOAD");
    let data = result.data;
    if ((this.workLoadData.newData as any).commonWorkscore) {
      // 如果实时数据大于当前的数据 箭头向上 否向下
      //左上
      if (
        data.commonWorkscore >
        (this.workLoadData.newData as any).commonWorkscore
      ) {
        this.workLoadData.isTopLeft = true;
      }
      // 右上
      if (data.htnType > (this.workLoadData.newData as any).htnType) {
        this.workLoadData.isTopRight = true;
      }
      // 左下
      if (
        data.excessWorkscore >
        (this.workLoadData.newData as any).excessWorkscore
      ) {
        this.workLoadData.isBottomLeft = true;
      }
      // 右下
      if (data.htwType > (this.workLoadData.newData as any).htwType) {
        this.workLoadData.isBottomRight = true;
      }
    }
    this.workLoadData.newData = data;
    this.initWorkloadEcharts();
  }
  // draw() {

  //   //window.requestAnimationFrame(draw);
  // }
  // 工作量占比 echarts 初始化
  initWorkloadEcharts() {
    function getCirlPoint(x0: number, y0: number, r: number, angle: number) {
      let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
      let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
      return {
        x: x1,
        y: y1,
      };
    }
    let angle = this.angle; //角度，用来做简单的动画效果的

    let value = (this.workLoadData.newData as any).comparedToYesterday;
    let option = {
      backgroundColor: "#03275b",
      title: {
        text: "{a|" + value + "}{c|%}",
        x: "center",
        y: "center",
        textStyle: {
          rich: {
            a: {
              fontSize: 18,
              color: "#29EEF3",
              fontWeight: "bold",
            },

            c: {
              fontSize: 20,
              color: "#ffffff",
              // padding: [5,0]
            },
          },
        },
      },

      series: [
        // 紫色
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (
            params: any,
            api: { getWidth: () => number; getHeight: () => number }
          ) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((0 + angle) * Math.PI) / 180,
                endAngle: ((90 + angle) * Math.PI) / 180,
              },
              style: {
                stroke: "rgba(26, 201, 255, 1)",
                fill: "transparent",
                lineWidth: 1.5,
              },
              silent: true,
            };
          },
          data: [0],
        },
        {
          name: "ring5", //紫点
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (
            params: any,
            api: { getWidth: () => number; getHeight: () => number }
          ) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 90 + angle);
            return {
              type: "circle",
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4,
              },
              style: {
                stroke: "rgba(26, 201, 255, 1)", //绿
                fill: "rgba(26, 201, 255, 1)",
              },
              silent: true,
            };
          },
          data: [0],
        },
        // 蓝色

        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (
            params: any,
            api: { getWidth: () => number; getHeight: () => number }
          ) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((180 + angle) * Math.PI) / 180,
                endAngle: ((270 + angle) * Math.PI) / 180,
              },
              style: {
                stroke: "rgba(26, 201, 255, 1)",
                fill: "transparent",
                lineWidth: 1.5,
              },
              silent: true,
            };
          },
          data: [0],
        },
        {
          name: "ring5", // 蓝色
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (
            params: any,
            api: { getWidth: () => number; getHeight: () => number }
          ) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 180 + angle);
            return {
              type: "circle",
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4,
              },
              style: {
                stroke: "rgba(26, 201, 255, 1)", //绿
                fill: "rgba(26, 201, 255, 1)",
              },
              silent: true,
            };
          },
          data: [0],
        },

        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (
            params: any,
            api: { getWidth: () => number; getHeight: () => number }
          ) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((270 + -angle) * Math.PI) / 180,
                endAngle: ((40 + -angle) * Math.PI) / 180,
              },
              style: {
                stroke: "rgba(26, 201, 255, 1)",
                fill: "transparent",
                lineWidth: 1.5,
              },
              silent: true,
            };
          },
          data: [0],
        },
        // 橘色

        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (
            params: any,
            api: { getWidth: () => number; getHeight: () => number }
          ) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((90 + -angle) * Math.PI) / 180,
                endAngle: ((220 + -angle) * Math.PI) / 180,
              },
              style: {
                stroke: "rgba(26, 201, 255, 1)",
                fill: "transparent",
                lineWidth: 1.5,
              },
              silent: true,
            };
          },
          data: [0],
        },
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem(
            params: any,
            api: { getWidth: () => number; getHeight: () => number }
          ) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 90 + -angle);
            return {
              type: "circle",
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4,
              },
              style: {
                stroke: "rgba(26, 201, 255, 1)", //粉
                fill: "rgba(26, 201, 255, 1)",
              },
              silent: true,
            };
          },
          data: [0],
        },
        {
          name: "ring5", //绿点
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (
            params: any,
            api: { getWidth: () => number; getHeight: () => number }
          ) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 270 + -angle);
            return {
              type: "circle",
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4,
              },
              style: {
                stroke: "rgba(26, 201, 255, 1)", //绿
                fill: "rgba(26, 201, 255, 1)",
              },
              silent: true,
            };
          },
          data: [0],
        },
        {
          name: "吃猪肉频率",
          type: "pie",
          radius: ["52%", "40%"],
          silent: true,
          clockwise: true,
          startAngle: 90,
          z: 0,
          zlevel: 0,
          label: {
            normal: {
              position: "center",
            },
          },
          data: [
            {
              value: value,
              name: "",
              itemStyle: {
                normal: {
                  color: {
                    // 完成的圆环的颜色
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(26, 201, 255, 1)", // 0% 处的颜色
                      },

                      {
                        offset: 1,
                        color: "rgba(26, 201, 255, 1)", // 100% 处的颜色
                      },
                    ],
                  },
                },
              },
            },
            {
              value: 100 - value,
              name: "",
              label: {
                normal: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "#173164",
                },
              },
            },
          ],
        },
        {
          name: "吃猪肉频率",
          type: "pie",
          radius: ["32%", "35%"],
          silent: true,
          clockwise: true,
          startAngle: 270,
          z: 0,
          zlevel: 0,
          label: {
            normal: {
              position: "center",
            },
          },
          data: [
            {
              value: value,
              name: "",
              itemStyle: {
                normal: {
                  color: {
                    // 完成的圆环的颜色
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(0,0,0,0)", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(0,0,0,0)", // 0% 处的颜色
                      },
                    ],
                  },
                },
              },
            },
            {
              value: 100 - value,
              name: "",
              label: {
                normal: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "#173164",
                },
              },
            },
          ],
        },
      ],
    };
    this.angle = angle + 3;
    // myChart.setOption(option, true);
    option && this.workloadCharts.setOption(option);
  }
  // 排名
  rankingEcharts() {
    var chartDom: any = this.$refs.echartsPros;
    var myChart = echarts.init(chartDom);
    var charts = {
      // 按顺序排列从大到小
      workRatingList: this.workRatingList,
      cityData: this.workRatingData,
    };
    var top10CityList = charts.workRatingList;
    var top10CityData = charts.cityData;
    var color = [
      "rgba(248,195,248",
      "rgba(100,255,249",
      "rgba(135,183,255",
      "rgba(248,195,248",
      "rgba(100,255,249",
    ];

    let lineY = [];
    for (var i = 0; i < charts.workRatingList.length; i++) {
      /*
  var x = i
  if (x > color.length - 1) {
    x = color.length - 1
  }*/
      var data = {
        name: charts.workRatingList[i],
        color: color[i] + ")",
        value: charts.cityData[i],
        itemStyle: {
          normal: {
            show: false,
            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
              //渐变色
              {
                offset: 1,
                color: "#7BE16E",
              },
              {
                offset: 0,
                color: "#0078FF",
              },
            ]),
            barBorderRadius: 5,
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.1)",
          },
        },
      };
      lineY.push(data);
    }

    console.log(lineY);
    console.log(top10CityData);
    let option: any = {
      backgroundColor: "transparent",
      title: {
        show: false,
      },
      tooltip: {
        trigger: "item",
      },
      grid: {
        borderWidth: 0,
        top: "10%",
        left: "5%",
        right: "15%",
        bottom: "3%",
      },
      color: color,
      yAxis: [
        {
          type: "category",
          inverse: true,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            inside: false,
          },
          data: top10CityList,
        },
        {
          type: "category",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            inside: false,
            textStyle: {
              color: "#b3ccf8",
              fontSize: "8",
              fontFamily: "PingFangSC-Regular",
            },
            formatter: function (val: any) {
              return `${val}`; //`${val}/10`;
            },
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          data: top10CityData.reverse(),
        },
      ],
      xAxis: {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          margin: 30,
          fontSize: 10,
          align: "left",
          padding: [2, 0, 0, 0],
          color: "#000",
          rich: {
            nt1: {
              color: "#fff",
              backgroundColor: "red",
              width: 13,
              height: 13,
              fontSize: 10,
              align: "center",
              borderRadius: 100,
              lineHeight: "5",
              padding: [0, 1, 2, 1],
              // padding:[0,0,2,0],
            },
            nt2: {
              color: "#fff",
              backgroundColor: "red",
              width: 13,
              height: 13,
              fontSize: 10,
              align: "center",
              borderRadius: 100,
              padding: [0, 1, 2, 1],
            },
            nt3: {
              color: "#fff",
              backgroundColor: "red",
              width: 13,
              height: 13,
              fontSize: 10,
              align: "center",
              borderRadius: 100,
              padding: [0, 1, 2, 1],
            },
            nt: {
              color: "#fff",
              backgroundColor: "#fff",
              width: 13,
              height: 13,
              fontSize: 10,
              align: "center",
              lineHeight: 3,
              borderRadius: 100,
              padding: [0, 1, 2, 1],
            },
          },
        },
      },
      series: [
        {
          name: "",
          type: "bar",
          zlevel: 2,
          barWidth: "5px",
          data: lineY,
          animationDuration: 1500,
          label: {
            normal: {
              color: "#b3ccf8",
              show: true,
              position: [0, "-24px"], //条形位置

              textStyle: {
                fontSize: 12,
              },
              formatter: function (a: { name: any }, b: any) {
                return a.name;
              },
            },
          },
        },
        {
          name: "背景",
          type: "bar",
          barWidth: 5,
          barGap: "-100%",
          data: [10, 10, 10],
          itemStyle: {
            normal: {
              color: "rgba(255, 255, 255, 0.1)",
              barBorderRadius: 30,
            },
          },
        },
      ],
      animationEasing: "cubicOut",
    };
    option && myChart.setOption(option);
  }

  // 里程监控
  async oliMonitoring() {
    var chartDom: any = this.$refs.oliChart;
    var myChart = echarts.init(chartDom);
    var option;
    let result = await Account.getMonitorData("LIST_MILEAGE");
    console.log(result);

    let lastOli = []; // 上周里程
    let currentOli = []; //这周里程
    for (let item of result.data.lastWeek) {
      lastOli.push(item.mileage);
    }
    for (let item of result.data.thisWeek) {
      currentOli.push(item.mileage);
    }

    option = {
      color: ["#000", "#00DDFF", "#37A2FF", "#FF0087", "#000"],
      title: {
        // text: "Gradient Stacked Area Chart",
      },
      textStyle: {
        color: "#fff",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["上周里程", "本周里程"],
        left: "0%",
        top: "5%",
        textStyle: {
          color: "#fff",
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {
            show: false,
          },
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "本周里程",
          type: "line",
          color: "#EC43AE",
          // stack: "本周里程",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          textStyle: {
            color: "#fff",
          },
          areaStyle: {
            opacity: 0.8,

            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255, 0, 135)",
              },
              {
                offset: 1,
                color: "rgba(135, 0, 157)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: currentOli,
        },
        {
          name: "上周里程",
          type: "line",
          // stack: "本周里程",
          color: "#F4C73C",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,

          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255, 191, 0)",
              },
              {
                offset: 1,
                color: "rgba(224, 62, 76)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: lastOli,
        },
      ],
    };
    option && myChart.setOption(option);
  }
  /**
   * 工作效率
   */
  workEfficEcharts() {
    var chartDom: any = this.$refs.main;
    var myChart: any = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        trigger: "item",
          formatter:(params: any)=>{
                    console.log(params)
                    if(params.name){
                      return  params.name+':'+params.value;
                    }else{

                    }
                },
      },
      legend: {
        bottom: "bottom",
        textStyle: {
          color: "#fff",
        },
        data: ["人员效率", "车辆效率"],
      },
      series: [
        {
          name: "车辆效率",
          type: "pie",
          selectedMode: "single",
          color: ["rgba(7, 219, 255, 1)", "#005b96"],
          radius: [0, "30%"],
          label: {
            position: "inner",
            fontSize: 0,
          },
          data: [
            {
              value: this.efficiencyConfig.vehicleEfficiency,
              name: "车辆效率",
            },
            {
              value: 10 - this.efficiencyConfig.vehicleEfficiency,
              name: "",
            },
          ],
        },
        {
          name: "人员效率",
          type: "pie",
          color: ["#71D879", "#005b96"],
          label: {
            position: "inner",
            fontSize: 0,
          },
          radius: ["45%", "60%"],
          labelLine: {
            length: 30,
          },
          data: [
            {
              value: this.efficiencyConfig.personnelEfficiency,
              name: "人员效率",
            },
            {
              value: 10 - this.efficiencyConfig.personnelEfficiency,
              name: "",
            },
          ],
        },
      ],
    };
    option && myChart.setOption(option);
  }
  contains(arr: any, dst: any) {
    var i = arr.length;
    while ((i -= 1)) {
      if (arr[i] == dst) {
        return i;
      }
    }
    return false;
  }
}
</script>

<style lang="scss" scoped>
.l-side__abnormal__content {
  height: 276px;
  position: relative;
  /* padding: 20px; */
  .work {
    display: flex;
    .efficiency,
    .evaluation {
      width: 50%;
      .title {
        font-size: 14px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #ffffff;
        i {
          width: 14px;
          height: 14px;
          margin-left: 5px;
          display: inline-block;
          background: linear-gradient(90deg, #0078ff 0%, #7be16e 100%);
          border-radius: 7px;
        }
      }
      .eval-process {
        ul {
          li {
            text-align: left;
            font {
              text-align: left;
              font-size: 12px;
              font-family: Adobe Heiti Std;
              font-weight: normal;
              color: #ffffff;
            }
            i {
              width: 100%;
            }
          }
        }
      }
    }
    /deep/ .unit-label {
      opacity: 0;
    }
  }
  // .{
  //       background-image: url("~@/assets/images/top-left.png");

  // }
  .workload-title {
    height: 40px;
    line-height: 40px;
    text-align: left;
    width: 100%;
    img {
      height: 25px;
      text-align: left;
      float: left;
      margin-top: 7.5px;
    }
    font {
      color: rgba(26, 201, 255, 1);
      margin-left: 5px;
      font-size: 17px;
      font-family: Microsoft YaHei;
      font-weight: bold;
    }
  }
  .workload-content {
    position: relative;
    .desc {
      display: inline-block;
      background-size: 100px 40px;
      width: 100px;
      height: 40px;
      position: absolute;
      z-index: 99;
      .name {
        color: #fff;
      }
      .num {
        display: block;
        color: #fff;
        img {
          height: 15px;
        }
      }
    }
    .b-left {
      background-image: url("~@/assets/images/b-left.png");
      bottom: 0px;
      left: 30px;
      // border: 1px solid red;
    }
    .b-right {
      background-image: url("~@/assets/images/b-right.png");
      bottom: 0px;
      right: 30px;
      // border: 1px solid red;
    }
    .top-right {
      background-image: url("~@/assets/images/top-right.png");
      right: 30px;
    }
    .top-left {
      background-image: url("~@/assets/images/top-left.png");
      left: 30px;
      // border: 1px solid red;
    }
  }
  span {
    width: 133px;
    height: 40px;
    background: #0a3d66;
    box-shadow: 0px 2px 49px 0px rgba(1, 35, 59, 0.5);
    border-radius: 4px;
    font-size: 18px;
    line-height: 40px;
    top: -15px;
    left: 40px;
    position: absolute;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #aaddff;
    display: inline-block;
  }
}
.oil-title {
  left: auto !important;
  right: 20px !important;
}
.silde-right {
  margin-right: 30px;
  /* margin-left: 20px; */
  .silde-right-line {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
  }
  .work-ratio {
    position: relative;
    padding: 10px;
    /* border: 1px solid red; */
    &__info {
      position: absolute;
      left: 0;
    }
  }
}
/deep/ .border-box-content {
  padding: 20px;
  width: auto !important;
}
</style>
