<!--
 * @Author: zeHua
 * @Date: 2021-09-29 09:37:49
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-25 20:20:19
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
      <Content />
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
      <map-dialog @closeDialog='closeDialog'></map-dialog>
    </div>
    <!-- </dv-border-box-1> -->
    <!-- <Loading/> -->
  </div>
</template>

<script>

import { Options, Vue } from "vue-class-component";
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
closeDialog(){
  // console.log(12323);
  this.isMap=false;
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
