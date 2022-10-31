<template>
  <footer>
    <div class="contact">
      <h2 class="contact-title fs-m">
        Contact
      </h2>
      <ul class="contact-list">
        <li class="github fs-sm">
          <a href="https://github.com/cjsrhd94">GitHub</a>
        </li>
        <li class="blog fs-sm">
          <a href="https://cjsrhd94.tistory.com/">Blog</a>
        </li>
        <li class="email fs-sm">
          <a href="mailto:cjsrhd94@gmail.com" title="문의 메일 보내기">Email</a>
        </li>
      </ul>
    </div>
    <h3 class="copyright fs-sm">Copyright © www.shallw2.com All rights reserved. </h3>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
footer {
  text-align: center;
  padding: 20px;
  background-color: $PRIMARY_COLOR;

  .contact {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;

    h2 {
      margin-right: 18px;
    }

    .contact-list {
      display: inherit;
      justify-content: center;

      li {
        margin-right: 18px;
      }

      li:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>