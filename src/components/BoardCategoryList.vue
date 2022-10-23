<template>
  <div class="row">
    <div class="col-12">
      <ul class="board-category">
        <li
            v-for="boardCategory in boardCategories"
            :key="boardCategory.boardCategoryId"
            class="board-category-title"
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
import {computed} from "vue";
import {useStore} from "vuex"

export default {
  setup() {
    const store = useStore();

    const boardCategories = computed(() => store.state.boardCategoryList.boardCategories)
    const getBoardCategoryWithBoards = async () => {
      await store.dispatch('boardCategoryList/getBoardCategoryWithBoards');
    };

    getBoardCategoryWithBoards();

    return {
      boardCategories,
    };
  },
}
</script>

<style scoped>
.board-category {
  display: flex;
  text-align: center;
  width: 100%;
  height: 64px;
  background-color: #8977AD;
}

.board-category-title {
  position: relative;
  flex: 1;
  color: #FFFFFF;
  border: #D3D3D3 solid 1px;
}

.board-category-title a{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.board {
  display: none;
  position: absolute;
  background-color: #D3D3D3;
  z-index: 1;
  width: 100%;
}

.board li {
  padding: 10px 6px;
  border: #FFFFFF solid 1px;
}

.board-category-title:hover .board {
  display: block;
  opacity: 1;
}

.board li {
  color: black;
}
</style>