<!--
 * @Author: zeHua
 * @Date: 2021-11-16 15:56:09
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-17 13:47:45
 * @FilePath: /zhjt/src/components/content/components/videoPlayer.vue
-->
<template>
       <dv-border-box-12
      :reverse="true"
      style="margin-top: 20px"
      class="video-content"
      backgroundColor="rgba(20,87,140, 0.29)"
    >
    <span class="title">应急事件</span>
       </dv-border-box-12>
</template>


<script lang="ts">
import { Vue } from "vue-class-component";
export default class VideoPlayer extends Vue{

}
</script>

<style  lang='scss' scoped>
.video-content{
    width: 100%;
    height: 400px;
    position: relative;
    bottom:0;
    // border: 1px solid red;
    .title{
        height: 40px;
        color:#fff;
        display: inline-block;
        line-height: 40px;
        font-size:22px;
        width:120px;
        top:-20px;
        position: absolute;
        left:40px;
        // border:1px solid red;
    }
}
</style>