<template>
  <nav class="navigation-bar">
    <div class="wrapper">
      <!-- Logo -->
      <router-link
          :to="{name: 'home'}"
      >
        <h1>
          ShallWe
        </h1>
      </router-link>
      <!-- Global Link -->
      <ul class="global-link">
        <li>
          <router-link
              :to="{name: 'community'}"
          >
            커뮤니티
          </router-link>
        </li>
        <li>
          <router-link
              :to="{name: 'community'}"
          >
            커뮤니티
          </router-link>
        </li>
      </ul>
      <!-- Login -->
      <div class="login">
        <router-link
            cl
            :to="{name: 'login'}"
        >
          로그인
        </router-link>
        <router-link
            class=""
            :to="{name: 'signUp'}"
        >
          회원가입
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  background-color: #D3D3D3;
}

.wrapper a h1 {
  font-size: 16px;
  padding: 16px;
  margin-bottom: 0;
}

.global-link {
  display: flex;
  margin: auto 0;
  font-size: 12px;
}

.global-link li::after {
  content: "·";
  margin-right: 3px;
}

.global-link li:last-child::after {
  content: "";
  margin-right: 0;
}

.login {
  font-size: 12px;
  padding: 16px;
}

.login a {
  margin-right: 8px;
}

.login a:last-child {
  margin-right: 0;
}

</style>