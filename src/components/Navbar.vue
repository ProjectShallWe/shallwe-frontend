<template>
  <nav>
    <div class="wrapper">
      <!-- Logo -->
      <router-link
          :to="{name: 'home'}"
      >
        <h1 class="logo fs-m">
          ShallWe
        </h1>
      </router-link>
      <!-- Global Link -->
      <ul class="global-link fs-sm">
        <li>
          <router-link
              :to="{name: 'community'}"
          >
            커뮤니티
          </router-link>
        </li>
      </ul>
      <!-- User -->
      <div class="user fs-sm" v-if="!loggedIn">
        <ul>
          <li>
            <router-link
                :to="{name: 'login'}"
                class="to-login"
            >
              로그인
            </router-link>
          </li>
          <li>
            <router-link
                :to="{name: 'signUp'}"
                class="to-sign-up"
            >
              회원가입
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else class="user">
        <ul>
          <li>
            <router-link
                :to="`/user/${nickname}`"
            >
              {{ nickname }}님
            </router-link>
          </li>
          <li>
            <button type="button" @click="logOut">
              로그아웃
            </button>
          </li>
        </ul>
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

<style lang="scss" scoped>

.wrapper {
  display: flex;
  justify-content: space-between;
  color: $SECONDARY_COLOR;
  background-color: $PRIMARY_COLOR;
  border-bottom: $TERTIARY_COLOR solid 1px;

  a {
    h1 {
      font-weight: bold;
      padding: 16px;
    }
  }

  .global-link {
    display: flex;
    margin: auto 0;
  }

  .global-link li {
    margin-right: 8px;
  }

  .user {
    font-size: 12px;
    padding: 16px;

    ul {
      display: flex;

      li:hover {
        color: $EMPHASIS_COLOR;
      }
    }

    a {
      margin-right: 8px;

      :last-child {
        margin-right: 0;
      }
    }

    button {
      border-radius: 8px;
    }
  }
}
</style>