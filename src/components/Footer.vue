<template>
  <div class="container">
    <div class="contact">
      <h2>
        Contact
      </h2>
      <a href="https://github.com/cjsrhd94">GitHub</a>
      <a href="https://cjsrhd94.tistory.com/">Blog</a>
      <a href="mailto:cjsrhd94@gmail.com" title="문의 메일 보내기">Email</a>
    </div>
    <h3 class="copyright">Copyright © www.shallw2.com All rights reserved. </h3>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #D3D3D3;
}

.contact {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.contact h2 {
  font-size: 16px;
  margin-bottom: 0px;
  margin-right: 18px;
}

.contact a {
  text-align: center;
  font-size: 12px;
  margin-right: 18px;
}

.copyright {
  font-size: 12px;
}
</style>