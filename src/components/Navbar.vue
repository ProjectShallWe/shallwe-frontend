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
      <!-- User -->
      <div class="user" v-if="!loggedIn">
        <router-link
            :to="{name: 'login'}"
        >
          로그인
        </router-link>
        <router-link
            :to="{name: 'signUp'}"
        >
          회원가입
        </router-link>
      </div>
      <div v-else class="user">
        <a>
          {{ nickname }}님
        </a>
        <button type="button" @click="logOut">
          로그아웃
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  setup() {
    const store = useStore();

    const loggedIn = computed(() => store.getters["login/loggedIn"]);
    const logOut = () => {
      store.dispatch("login/logout");
    };
    const nickname = computed(() => store.state.login.nickname);

    return {
      loggedIn,
      logOut,
      nickname,
    };
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  color: #FFFFFF;
  background-color: #8977AD;
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

.global-link li {
  margin-right: 8px;
}

.user {
  display: flex;
  font-size: 12px;
  padding: 16px;
}

.user a {
  margin-right: 8px;
}

.user a:last-child {
  margin-right: 0;
}

.user button {
  border-radius: 8px;
  background-color: #F8F8F8;
}

</style>