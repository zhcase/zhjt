<!--
 * @Author: zeHua
 * @Date: 2021-11-25 19:48:30
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-26 09:49:40
 * @FilePath: /zhjt/src/components/loading/index.vue
-->
<template>
<div class="loading">
    <dv-loading>加载中...</dv-loading>
</div>
</template>

<style lang='scss' scoped>
.loading{
    position: absolute;
    left:0;
    top:0;
    z-index:100;
    width: 100%;
    height: 100%;
    background: #000;
    
}
</style>