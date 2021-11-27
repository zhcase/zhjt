<!--
 * @Author: zeHua
 * @Date: 2021-11-25 19:48:30
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-27 13:51:02
 * @FilePath: /zhjt/src/components/loading/index.vue
-->
<template>
  <div class="loading">
    <div class="content">
      <img src="@/assets/images/loading.gif" />
    </div>
    <!-- <dv-loading style="color:'#fff'">加载中...</dv-loading> -->
  </div>
</template>

<style lang='scss' scoped>
.loading {
  position: absolute;
  left: 0;
  top: 0;
  background-image: url("~@/assets/images/loading-bg.gif");
  z-index: 100;
  width: 100%;
  height: 100%;
  .content {
    margin: 20% auto;
  }
}
/deep/ .dv-loading .loading-tip {
  color: #fff !important;
  margin-top: 10px;
}
</style>