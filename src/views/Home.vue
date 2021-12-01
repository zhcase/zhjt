<!--
 * @Author: zeHua
 * @Date: 2021-09-29 09:37:49
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-28 11:25:10
 * @FilePath: /zhjt/src/views/Home.vue
-->
<template>
  <div class="jt">
    <!-- <dv-border-box-1> -->
    <!-- 左侧 -->
    <div class="jt__left">
      <left-side />
    </div>
    <!-- 地图 内容 -->
    <div class="jt__content">
      <Content @handleViewMore='handleMoreClick' @closeLoading='closeLoading' @openLoading='openLoading' />
    </div>
    <!-- 图表内容 -->
    <div class="jt__container">
      <Container />
    </div>
    <!-- 右侧 -->
    <div class="jt__right">
      <right-side></right-side>
    </div>

    <!-- 弹出地图层 -->
    <div class="dialog-map" v-if="isMap">
      <map-dialog @closeDialog='closeDialog' @closeLoading='closeLoading' @openLoading='openLoading'></map-dialog>
    </div>
    <!-- </dv-border-box-1> -->
    <Loading v-if="isShowLoading" />
  </div>
</template>

<script>

import { Options, Vue } from "vue-class-component";
import { BMPGL } from "@/config/bmpgl.js";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import LeftSide from "@/components/leftSide/index.vue"; //左侧内容
import Content from "@/components/content/index.vue"; //左侧内容
import Container from "@/components/container/index.vue";
import RightSide from "@/components/rightSide/index.vue";
import MapDialog from "@/components/mapDialog/index.vue";
import Loading from '@/components/loading/index'
@Options({
  components: {
    HelloWorld,
    LeftSide,
    Content,
    Container,
    RightSide,
    MapDialog,
    Loading
  },
})
export default class Home extends Vue {
isMap=false;
isShowLoading=true;


mounted(){
  // 提前加载地图脚本
    BMPGL('jsug1ccNL9hyeZInNcfAN8f4qG65SyYx')
}
closeDialog(){
  this.isMap=false;
}

// 查看更多
handleMoreClick(){
    this.isMap=true; //显示弹出
    this.isShowLoading=true; //显示loading
}
// 关闭loading
closeLoading(){
    this.isShowLoading=false; //关闭Loading

}
// 打开loading
openLoading(){
    this.isShowLoading=true; //打开Loading
}

}
</script>

<style lang="scss" scoped>
.jt {
  width: 100%;
  /* position: absolute; */
  top: 0;
  padding: 13px;
  left: 0;
  overflow: hidden;
  display: flex;

  height: 100%;
  &-app {
    /* padding: 13px; */
  }
  div {
    /* border: 1px solid red; */
  }
  &__left,
  &__container,
  &__right {
    width: 20%;
  }
  &__content {
    width: 40%;
  }
  &__container {
    /* width: 20%; */
  }
  .dialog-map {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    // background-color: red;;
  }
}
</style>
