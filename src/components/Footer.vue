<template>
  <div class="row">
    <div class="col-12">
      <div class="wrapper">
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
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  padding: 20px;
  background-color: $PRIMARY_COLOR;
}

.contact {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

.contact h2 {
  font-size: 16px;
  margin-bottom: 0;
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