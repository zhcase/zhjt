<!--
 * @Author: zeHua
 * @Date: 2021-09-30 15:07:04
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-12 16:42:52
 * @FilePath: /zhjt/src/components/rightSide/index.vue
-->
<template>
  <div class="silde-right">
    <dv-border-box-12
      :reverse="true"
      class="l-side__abnormal__content"
      backgroundColor="rgba(20,87,140, 0.29)"
    >
      <!-- <span class="silde-right-line"
        ><dv-decoration-10 :reverse="true" style="height: 205px; width: 5px" />
      </span> -->
      <div class="work-ratio">
        <span class="work-ratio__info">
          <dv-decoration-11
            style="width: 80px; height: 50px"
          ></dv-decoration-11>
        </span>

        <dv-decoration-9 style="width: 150px; height: 150px; margin: 0 auto">
          <dv-digital-flop
            :config="config"
            style="width: 200px; height: 50px; margin: 0 auto"
          />
        </dv-decoration-9>
      </div>
      <div style="height: 65px"></div>
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
          style="width: 300px; height: 250px"
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
import { Options, Vue } from "vue-class-component";
import * as echarts from "echarts";

export default class Container extends Vue {
  salvProMax = [];
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
  mounted() {
    this.workEfficEcharts();
    this.oliMonitoring();
    this.rankingEcharts();
  }
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
  // 排名
  rankingEcharts() {
    var chartDom: any = this.$refs.echartsPros;
    var myChart = echarts.init(chartDom);
    var charts = {
      // 按顺序排列从大到小
      cityList: ["工作时长", "工作得分", "车辆行驶时长"],
      cityData: [10, 9, 8],
    };
    var top10CityList = charts.cityList;
    var top10CityData = charts.cityData;
    var color = [
      "rgba(248,195,248",
      "rgba(100,255,249",
      "rgba(135,183,255",
      "rgba(248,195,248",
      "rgba(100,255,249",
    ];

    let lineY = [];
    for (var i = 0; i < charts.cityList.length; i++) {
      /*
  var x = i
  if (x > color.length - 1) {
    x = color.length - 1
  }*/
      var data = {
        name: charts.cityList[i],
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
              return `${val}/10`;
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

  // 油量监控
  oliMonitoring() {
    var chartDom: any = this.$refs.oliChart;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
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
        data: ["Line 2", "Line 3"],
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
          name: "Line 2",
          type: "line",
          stack: "Total",
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
          data: [40, 232, 101, 204, 90, 340, 150],
        },
        {
          name: "Line 3",
          type: "line",
          stack: "Total",
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
          data: [320, 132, 201, 334, 190, 130, 220],
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
    console.log(chartDom);
    var myChart: any = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        bottom: "bottom",
        textStyle: {
          color: "#fff",
        },
        data: [
          "Direct",
          "Marketing",

          // "Search Engine"
        ],
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          selectedMode: "single",
          radius: [0, "30%"],
          label: {
            position: "inner",
            fontSize: 0,
          },

          data: [
            { value: 1548, name: "Search Engine" },
            { value: 679, name: "Marketing" },
          ],
        },
        {
          name: "Access From",
          type: "pie",
          label: {
            position: "inner",
            fontSize: 0,
          },
          radius: ["45%", "60%"],
          labelLine: {
            length: 30,
          },
          data: [
            { value: 1048, name: "Baidu" },
            { value: 335, name: "Direct" },
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
