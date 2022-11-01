<template>
  <div class="row">
    <div class="col-12">
      <h2 class="board-category-list fs-m"
          @click="changeClicked">
        게시판 목록
        <span v-if="!isClicked"
            class="open-icon"
        />
        <span v-if="isClicked"
              class="close-icon"
        />
      </h2>
      <ul v-if="isClicked"
          class="board-category"
      >
        <li
            v-for="boardCategory in boardCategories"
            :key="boardCategory.boardCategoryId"
            class="category-title"
        >
          <router-link to="#">
            {{ boardCategory.topic }}
          </router-link>
          <ul class="board">
            <li
                v-for="board in boardCategory.boards"
                :key="board.boardId"
            >
              <router-link
                  :to="`/community/${board.boardId}`"
                  class="button"
              >
                {{ board.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref, computed} from "vue";
import {useStore} from "vuex"

export default {
  setup() {
    const store = useStore();
    const isClicked = ref(false);

    const boardCategories = computed(() => store.state.boardCategoryList.boardCategories)
    const getBoardCategoryWithBoards = async () => {
      await store.dispatch('boardCategoryList/getBoardCategoryWithBoards');
    };

    const changeClicked = () => {
      isClicked.value = !isClicked.value;
    }

    getBoardCategoryWithBoards();

    return {
      isClicked,
      boardCategories,
      changeClicked,
    };
  },
}
</script>

<style lang="scss" scoped>

.board-category-list {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $SECONDARY_COLOR;
  background-color: $PRIMARY_COLOR;
  padding: 8px 0;
  border-bottom: $TERTIARY_COLOR solid 1px;

  .open-icon,
  .close-icon {
    display: block;
    width: 18px;
    height: 18px;
    margin-left: 4px;
  }

  .open-icon {
    background-image: url("../assets/images/add-circle-line.svg");
  }

  .close-icon {
    background-image: url("../assets/images/indeterminate-circle-line.svg");
  }
}

.category-title {
  font-size: 20px;
  padding: 8px 0;

  > a:hover {
    border-bottom: $EMPHASIS_COLOR solid 2px;
    margin-bottom: -2px;
  }

  &:hover .board li {
    display: flex;
  }

  .board {
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;

    li {
      display: none;
      margin: 4px 0px;

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