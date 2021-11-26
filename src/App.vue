<!--
 * @Author: zeHua
 * @Date: 2021-09-29 09:37:49
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-26 14:10:01
 * @FilePath: /zhjt/src/App.vue
-->
<template>
  <dv-full-screen-container>
    <!-- <dv-decoration-9 style="width: 150px; height: 150px; margin: 200px auto"
      ><dv-digital-flop
        :config="loadingConfig"
        style="width: 200px; height: 50px"
    /></dv-decoration-9>

    <div id="nav">
      <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </dv-full-screen-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue {
  loadingConfig = {
    number: [0],
    animationFrame: 10000,
    content: "{nt}%",
  };
  mounted() {
    // setInterval(() => {
    //   this.loadingConfig.number[0] += 1;
    //   console.log(this.loadingConfig.number[0]);
    // }, 500);
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#dv-full-screen-container {
  background-image: url("~@/assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%; /*宽高都100%*/
}
</style>
