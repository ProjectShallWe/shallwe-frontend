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
        <li @click="changeClickedCommunity">
          커뮤니티
          <div v-if="!isClickedCommunity"
               class="community-arrow-up-icon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>
            </svg>
          </div>
          <div v-if="isClickedCommunity"
               class="community-arrow-down-icon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z"/>
            </svg>
          </div>
        </li>
      </ul>

      <!-- Search -->
      <div class="nav-right">
        <div v-if="!isClickedSearch"
             @click="changeClicked"
             class="search-icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
                d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
          </svg>
        </div>
        <div v-if="isClickedSearch"
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

    <!-- 커뮤니티 게시판 리스트   -->
    <div v-if="isClickedCommunity"
         class="community-section"
    >
      <div class="container">
        <ul class="board-category">
          <li class="category-title">
            <router-link
                :to="{name: 'community'}"
                @click="initClicked"
            >
              커뮤니티 홈
            </router-link>
          </li>
          <li
              v-for="boardCategory in boardCategories"
              :key="boardCategory.boardCategoryId"
              class="category-title"
          >
            <router-link to="#"
                         @click="selectBoardCategory(boardCategory.boardCategoryId)">
              {{ boardCategory.topic }}
            </router-link>
            <ul class="board">
              <template
                  v-for="board in boardCategory.boards"
                  :key="board.boardId"
              >
                <li :class="{isSelected: boardCategory.boardCategoryId === activeNum}">
                  <router-link
                      :to="`/community/${board.boardId}`"
                      @click="initClicked"
                      class="button"
                  >
                    {{ board.title }}
                  </router-link>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 검색창 화면 -->
    <div v-if="isClickedSearch"
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
        <button class="search" type="submit"/>
      </form>
    </div>

  </nav>
</template>

<script>
import {ref, computed} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
  setup() {
    const store = useStore();

    const isClickedSearch = ref(false);
    const isClickedCommunity = ref(false);

    const keyword = ref("");

    const activeNum = ref(0);

    const boardCategories = computed(() => store.state.boardCategoryList.boardCategories)
    const getBoardCategoryWithBoards = async () => {
      await store.dispatch('boardCategoryList/getBoardCategoryWithBoards');
    };

    const search = () => {
      return location.href = `/community/search?keyword=${keyword.value}`;
    }

    const changeClicked = () => {
      isClickedCommunity.value = false;
      isClickedSearch.value = !isClickedSearch.value;
    }

    const changeClickedCommunity = () => {
      isClickedSearch.value = false;
      isClickedCommunity.value = !isClickedCommunity.value;
    }

    const initClicked = () => {
      isClickedSearch.value = false;
      isClickedCommunity.value = false;
    }

    const selectBoardCategory = (num) => {
      if (activeNum.value === num) {
        return activeNum.value = 0;
      }
      return activeNum.value = num;
    }

    const loggedIn = computed(() => store.getters["login/loggedIn"]);
    const logOut = () => {
      store.dispatch("login/logout");
    };

    const nickname = computed(() => store.state.login.nickname);

    getBoardCategoryWithBoards();

    return {
      isClickedSearch,
      isClickedCommunity,
      activeNum,
      keyword,
      boardCategories,
      getBoardCategoryWithBoards,
      search,
      changeClicked,
      changeClickedCommunity,
      selectBoardCategory,
      loggedIn,
      logOut,
      nickname,
      initClicked,
    };
  },
  watch: {
    '$route' (to, from) {
      if (to.fullPath !== from.fullPath) {
        this.initClicked();
      }
    }
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

    li {
      display: flex;
      align-items: center;
      margin-right: 8px;

      &:hover {
        color: $EMPHASIS_COLOR;
        fill: $EMPHASIS_COLOR;
      }
    }
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

.community-section {
  display: flex;
  position: absolute;
  color: $SECONDARY_COLOR;
  background-color: $PRIMARY_COLOR;
  width: 100%;
  border-bottom: $TERTIARY_COLOR solid 1px;
}

.category-title {
  font-size: 20px;
  padding: 8px 0;

  > a:hover {
    border-bottom: $EMPHASIS_COLOR solid 2px;
    margin-bottom: -2px;
  }

  .isSelected {
    display: flex;
  }

  .board {
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;

    .isSelected {
      display: flex;
    }

    li {
      display: none;
      margin: 4px 0;

      &:after {
        content: "·";
        margin: 0 8px;
      }

      &:last-child:after {
        content: "";
      }

      a:hover {
        border-bottom: $EMPHASIS_COLOR solid 1px;
        margin-bottom: -1px;
      }
    }
  }
}
</style>