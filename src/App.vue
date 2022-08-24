<template>
  <Navbar />
  <router-view/>
</template>

<script>

import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
  margin: 0;
}

/*body {*/
/*  width: 100%;*/
/*  height: 100vh;*/
/*}*/

a,
a:active
a:visited,
a:hover {
  color: inherit;
  text-decoration: none;
}

button:focus,
button:active,
input:focus,
input:active,
textarea:focus,
textarea:active {
  outline: none;
  box-shadow: none;
}

ul,
ol,
li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}
</style>
