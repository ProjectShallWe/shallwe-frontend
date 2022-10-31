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
      <!-- Search -->
      <div class="nav-right">
        <div v-if="!isClicked"
             @click="changeClicked"
             class="search-icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
                d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
          </svg>
        </div>
        <div v-if="isClicked"
             @click="changeClicked"
             class="cancel-icon"
        />
        <!-- User -->
        <div class="user fs-sm">
          <ul v-if="!loggedIn">
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
          <ul v-if="loggedIn">
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
    </div>
    <div v-if="isClicked"
         class="search-section"
    >
      <form
          @submit.prevent="search"
          class="search-bar"
      >
        <input
            v-model="keyword"
            class="keyword"
            type="text"
            placeholder="검색어를 입력해주세요"
        >
        <button class="search" type="submit" />
      </form>
    </div>
  </nav>
</template>

<script>
import {ref, computed} from "vue";
import {useStore} from "vuex";

export default {
  setup() {
    const store = useStore();
    const isClicked = ref(false);
    const keyword = ref("");
    const search = () => {
      return location.href = `/community/search?keyword=${keyword.value}`;
    }

    const changeClicked = () => {
      isClicked.value = !isClicked.value;
    }

    const loggedIn = computed(() => store.getters["login/loggedIn"]);
    const logOut = () => {
      store.dispatch("login/logout");
    };

    const nickname = computed(() => store.state.login.nickname);

    return {
      isClicked,
      keyword,
      search,
      changeClicked,
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

  .nav-right {
    display: flex;
    align-items: center;

    .search-icon,
    .cancel-icon {
      width: 20px;
      height: 20px;
      margin: 16px;

      :hover {
        fill: $EMPHASIS_COLOR;
      }
    }

    .cancel-icon {
      content: "";
      background-image: url("../assets/images/close-line.svg");
    }

    .user {
      font-size: 12px;
      padding: 16px 0;

      ul {
        display: flex;

        li:hover {
          color: $EMPHASIS_COLOR;
        }
      }

      a {
        margin-right: 8px;
      }

      button {
        margin-right: 8px;
      }

      button {
        border-radius: 8px;
      }
    }
  }
}

.search-section {
  position: absolute;
  display: flex;
  justify-content: center;
  background-color: $PRIMARY_COLOR;
  width: 100%;
  padding: 16px 0;
  z-index: 999;

  .search-bar {
    border-bottom: $SECONDARY_COLOR solid 2px;

    .keyword {
      font-size: 24px;
      padding: 8px 0 8px 8px;
    }

    .search {
      width: 24px;
      height: 24px;
      content: "";
      background-image: url("../assets/images/search-line.svg");
    }
  }
}
</style>