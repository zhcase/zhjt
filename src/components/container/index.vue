<!--
 * @Author: zeHua
 * @Date: 2021-09-30 10:18:52
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-16 11:40:17
 * @FilePath: /zhjt/src/components/container/index.vue
-->
<template>
  <div>
    <dv-border-box-12
      :reverse="true"
      class="l-side__abnormal__content"
      backgroundColor="rgba(20,87,140, 0.29)"
    >
      <span class="box-title">今日出勤量</span>
      <div class="d-container">
        <div class="item">
          <span class="img"><img src="@/assets/images/you@2x.png" /></span>
          <span class="num">100%</span>
          <span class="text">人员出勤</span>
        </div>
        <div class="item">
          <span class="img"><img src="@/assets/images/liang@2x.png" /></span>
          <span class="num">100%</span>
          <span class="text">人员出勤</span>
        </div>
        <div class="item">
          <span class="img"><img src="@/assets/images/cha@2x.png" /></span>
          <span class="num">70%</span>
          <span class="text">油机使用率</span>
        </div>
      </div>
    </dv-border-box-12>
    <dv-border-box-12
      :reverse="true"
      style="margin-top: 20px"
      class="l-side__abnormal__content"
      backgroundColor="rgba(20,87,140, 0.29)"
    >
      <span class="oil-title">油量监控</span>
      <div class="oli-chart">
        <div
          id="oliChart"
          ref="oliChart"
          style="width: 340px; height: 250px"
        ></div>
      </div>
    </dv-border-box-12>
    <dv-border-box-12
      :reverse="true"
      style="margin-top: 20px"
      class="l-side__abnormal__content"
      backgroundColor="rgba(20,87,140, 0.29)"
    >
      <span class="oil-title"> <i></i> 近期日低频使用</span>
      <div class="oli-chart">
        <div id="CarChart" style="margin-top: 0px"></div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Chart } from "@antv/g2";
import { Area, Column } from "@antv/g2plot";
import * as echarts from "echarts";

export default class Container extends Vue {
  datas = [
    {
      country: "北美",
      date: 1965,
      value: 7,
    },
    {
      country: "北美",
      date: 1966,
      value: 5,
    },
    {
      country: "北美",
      date: 1967,
      value: 4,
    },
    {
      country: "北美",
      date: 1968,
      value: 2,
    },
    {
      country: "北美",
      date: 1969,
      value: 4,
    },
    {
      country: "北美",
      date: 1970,
      value: 7,
    },
    {
      country: "北美",
      date: 1971,
      value: 5,
    },
    {
      country: "北美",
      date: 1972,
      value: 6,
    },
    {
      country: "北美",
      date: 1973,
      value: 5,
    },
    {
      country: "北美",
      date: 1974,
      value: 9,
    },
    {
      country: "北美",
      date: 1975,
      value: 6,
    },
    {
      country: "北美",
      date: 1976,
      value: 3,
    },
    {
      country: "北美",
      date: 1977,
      value: 1,
    },
    {
      country: "北美",
      date: 1978,
      value: 5,
    },
    {
      country: "北美",
      date: 1979,
      value: 3,
    },
    {
      country: "北美",
      date: 1980,
      value: 6,
    },
    {
      country: "北美",
      date: 1981,
      value: 5,
    },
    {
      country: "北美",
      date: 1982,
      value: 1951.5,
    },
    {
      country: "北美",
      date: 1983,
      value: 1941.1,
    },
    {
      country: "北美",
      date: 1984,
      value: 2046.2,
    },
    {
      country: "北美",
      date: 1985,
      value: 2053.1,
    },
    {
      country: "北美",
      date: 1986,
      value: 2060.7,
    },
    {
      country: "北美",
      date: 1987,
      value: 2130.8,
    },
    {
      country: "北美",
      date: 1988,
      value: 2223.5,
    },
    {
      country: "北美",
      date: 1989,
      value: 2275.9,
    },
    {
      country: "北美",
      date: 1990,
      value: 2280.7,
    },
    {
      country: "北美",
      date: 1991,
      value: 2282,
    },
    {
      country: "北美",
      date: 1992,
      value: 2319.7,
    },
    {
      country: "北美",
      date: 1993,
      value: 2366.6,
    },
    {
      country: "北美",
      date: 1994,
      value: 2420.2,
    },
    {
      country: "北美",
      date: 1995,
      value: 2466.9,
    },
    {
      country: "北美",
      date: 1996,
      value: 2547.4,
    },
    {
      country: "北美",
      date: 1997,
      value: 2569,
    },
    {
      country: "北美",
      date: 1998,
      value: 2585.2,
    },
    {
      country: "北美",
      date: 1999,
      value: 2633.8,
    },
    {
      country: "北美",
      date: 2000,
      value: 2699.4,
    },
    {
      country: "北美",
      date: 2001,
      value: 2640.1,
    },
    {
      country: "北美",
      date: 2002,
      value: 2687.7,
    },
    {
      country: "北美",
      date: 2003,
      value: 2700.7,
    },
    {
      country: "北美",
      date: 2004,
      value: 2759.4,
    },
    {
      country: "北美",
      date: 2005,
      value: 2775.6,
    },
    {
      country: "北美",
      date: 2006,
      value: 2761.9,
    },
    {
      country: "北美",
      date: 2007,
      value: 2809.5,
    },
    {
      country: "北美",
      date: 2008,
      value: 2759.4,
    },
    {
      country: "北美",
      date: 2009,
      value: 2632.5,
    },
    {
      country: "北美",
      date: 2010,
      value: 2720.7,
    },
    {
      country: "北美",
      date: 2011,
      value: 2722.9,
    },
    {
      country: "北美",
      date: 2012,
      value: 2665.1,
    },
    {
      country: "北美",
      date: 2013,
      value: 2738.3,
    },
    {
      country: "北美",
      date: 2014,
      value: 2766.8,
    },
    {
      country: "北美",
      date: 2015,
      value: 2739.7,
    },
    {
      country: "北美",
      date: 2016,
      value: 2761.9,
    },
    {
      country: "北美",
      date: 2017,
      value: 2772.8,
    },
    {
      country: "中南美",
      date: 1965,
      value: 109.2,
    },
    {
      country: "中南美",
      date: 1966,
      value: 115.7,
    },
    {
      country: "中南美",
      date: 1967,
      value: 120.5,
    },
    {
      country: "中南美",
      date: 1968,
      value: 128,
    },
    {
      country: "中南美",
      date: 1969,
      value: 134.4,
    },
    {
      country: "中南美",
      date: 1970,
      value: 142.2,
    },
    {
      country: "中南美",
      date: 1971,
      value: 157.5,
    },
    {
      country: "中南美",
      date: 1972,
      value: 169.5,
    },
    {
      country: "中南美",
      date: 1973,
      value: 186.3,
    },
    {
      country: "中南美",
      date: 1974,
      value: 195.5,
    },
    {
      country: "中南美",
      date: 1975,
      value: 198,
    },
    {
      country: "中南美",
      date: 1976,
      value: 211.7,
    },
    {
      country: "中南美",
      date: 1977,
      value: 223.8,
    },
    {
      country: "中南美",
      date: 1978,
      value: 236.5,
    },
    {
      country: "中南美",
      date: 1979,
      value: 251.8,
    },
    {
      country: "中南美",
      date: 1980,
      value: 262.9,
    },
    {
      country: "中南美",
      date: 1981,
      value: 262.7,
    },
    {
      country: "中南美",
      date: 1982,
      value: 265.9,
    },
    {
      country: "中南美",
      date: 1983,
      value: 268.3,
    },
    {
      country: "中南美",
      date: 1984,
      value: 278.3,
    },
    {
      country: "中南美",
      date: 1985,
      value: 285.2,
    },
    {
      country: "中南美",
      date: 1986,
      value: 304.2,
    },
    {
      country: "中南美",
      date: 1987,
      value: 315.4,
    },
    {
      country: "中南美",
      date: 1988,
      value: 324.6,
    },
    {
      country: "中南美",
      date: 1989,
      value: 329.9,
    },
    {
      country: "中南美",
      date: 1990,
      value: 331.1,
    },
    {
      country: "中南美",
      date: 1991,
      value: 339.7,
    },
    {
      country: "中南美",
      date: 1992,
      value: 355.8,
    },
    {
      country: "中南美",
      date: 1993,
      value: 368.8,
    },
    {
      country: "中南美",
      date: 1994,
      value: 390.9,
    },
    {
      country: "中南美",
      date: 1995,
      value: 408.3,
    },
    {
      country: "中南美",
      date: 1996,
      value: 425.8,
    },
    {
      country: "中南美",
      date: 1997,
      value: 448.2,
    },
    {
      country: "中南美",
      date: 1998,
      value: 465.5,
    },
    {
      country: "中南美",
      date: 1999,
      value: 463.7,
    },
    {
      country: "中南美",
      date: 2000,
      value: 476.1,
    },
    {
      country: "中南美",
      date: 2001,
      value: 477.7,
    },
    {
      country: "中南美",
      date: 2002,
      value: 483.5,
    },
    {
      country: "中南美",
      date: 2003,
      value: 489.3,
    },
    {
      country: "中南美",
      date: 2004,
      value: 515.5,
    },
    {
      country: "中南美",
      date: 2005,
      value: 533.6,
    },
    {
      country: "中南美",
      date: 2006,
      value: 564,
    },
    {
      country: "中南美",
      date: 2007,
      value: 587,
    },
    {
      country: "中南美",
      date: 2008,
      value: 605.8,
    },
    {
      country: "中南美",
      date: 2009,
      value: 596.8,
    },
    {
      country: "中南美",
      date: 2010,
      value: 632.5,
    },
    {
      country: "中南美",
      date: 2011,
      value: 658.9,
    },
    {
      country: "中南美",
      date: 2012,
      value: 676.5,
    },
    {
      country: "中南美",
      date: 2013,
      value: 692,
    },
    {
      country: "中南美",
      date: 2014,
      value: 697.7,
    },
    {
      country: "中南美",
      date: 2015,
      value: 701.1,
    },
    {
      country: "中南美",
      date: 2016,
      value: 696.8,
    },
    {
      country: "中南美",
      date: 2017,
      value: 700.6,
    },
  ];
  carDatas = [
    {
      name: "London",
      月份: "Jan.",
      月均降雨量: 18.9,
    },
    {
      name: "London",
      月份: "Feb.",
      月均降雨量: 28.8,
    },
    {
      name: "London",
      月份: "Mar.",
      月均降雨量: 39.3,
    },
    {
      name: "London",
      月份: "Apr.",
      月均降雨量: 81.4,
    },
    {
      name: "London",
      月份: "May",
      月均降雨量: 47,
    },
    {
      name: "London",
      月份: "Jun.",
      月均降雨量: 20.3,
    },
    {
      name: "London",
      月份: "Jul.",
      月均降雨量: 24,
    },
    {
      name: "London",
      月份: "Aug.",
      月均降雨量: 35.6,
    },
    {
      name: "Berlin",
      月份: "Jan.",
      月均降雨量: 12.4,
    },
    {
      name: "Berlin",
      月份: "Feb.",
      月均降雨量: 23.2,
    },
    {
      name: "Berlin",
      月份: "Mar.",
      月均降雨量: 34.5,
    },
    {
      name: "Berlin",
      月份: "Apr.",
      月均降雨量: 99.7,
    },
    {
      name: "Berlin",
      月份: "May",
      月均降雨量: 52.6,
    },
    {
      name: "Berlin",
      月份: "Jun.",
      月均降雨量: 35.5,
    },
    {
      name: "Berlin",
      月份: "Jul.",
      月均降雨量: 37.4,
    },
    {
      name: "Berlin",
      月份: "Aug.",
      月均降雨量: 42.4,
    },
  ];
  mounted() {
    this.initCarCharts();
    this.oliMonitoring();
  }
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
        left: "0%",
        top: "5%",
        textStyle: {
          color: "#fff",
          display: "block",
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
                color: "rgba(0, 221, 255)",
              },
              {
                offset: 1,
                color: "rgba(77, 119, 255)",
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
                color: "rgba(55, 162, 255)",
              },
              {
                offset: 1,
                color: "rgba(116, 21, 219)",
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
  initCarCharts() {
    let stackedColumnPlot: any = new Column("CarChart", {
      data: this.carDatas,
      isGroup: true,
      xField: "月份",
      height: 200,
      yField: "月均降雨量",
      seriesField: "name",
      /** 设置颜色 */
      color: ["#4195E3FF", "#FC41A8FF"],
      // textStyle: {},
      // legend: {
      //   textStyle: {
      //     color: "#fff",
      //   },
      // },
      /** 设置间距 */
      // marginRatio: 0.1,
      //   label: {
      //     // 可手动配置 label 数据标签位置
      //     position: "middle", // 'top', 'middle', 'bottom'
      //     // 可配置附加的布局方法
      //     layout: [
      //       // 柱形图数据标签位置自动调整
      //       { type: "interval-adjust-position" },
      //       // 数据标签防遮挡
      //       { type: "interval-hide-overlap" },
      //       // 数据标签文颜色自动调整
      //       { type: "adjust-color" },
      //     ],
      //   },
    });

    stackedColumnPlot.render();
  }
}
</script>

<style lang="scss" scoped>
.d-container {
  display: flex;
  padding-top: 40px;
  width: 100%;
  height: 100%;

  .item {
    flex: 1;
    span {
      display: inline-block;
    }
    img {
      height: 40px;
    }
    .text {
      font-size: 18px;
      color: #00e2ff;
    }
    .num {
      font-size: 30px;
      font-weight: bold;
      display: block;
      font-family: Microsoft YaHei;
      text-align: center;
      /* font-weight: 400; */
      color: #00e2ff;
      margin: 10px 0;
      line-height: 55px;
      font-size: 34px;
    }
  }
}
.l-side__abnormal__content {
  height: 276px;
  position: relative;
  /* padding: 20px; */

  .box-title,
  .oil-title {
    min-width: 133px;
    padding: 0 10px;
    height: 40px;
    background: #0a3d66;
    box-shadow: 0px 8px 204px 0px rgba(1, 35, 59, 0.5);
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
    i {
      width: 8px;
      margin-right: 5px;
      float: left;
      margin-top: 10px;
      height: 18px;
      /* display: inline-block; */
      background: rgba(252, 65, 168, 1);
    }
  }
}
.oil-title {
  left: auto !important;
  right: 20px !important;
}
/deep/ .border-box-content {
  padding: 20px;
  width: auto !important;
}
</style>
