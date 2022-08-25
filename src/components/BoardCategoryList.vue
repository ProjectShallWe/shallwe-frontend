<template>
  <div class="row">
    <div class="col-12">
      <ul class="board-category">
        <li class="board-category-title">
          <a href="#">
            카테고리
          </a>
          <ul class="board">
            <li>
              <a href="#">게시판 이름 1</a>
            </li>
            <li>
              <a href="#">게시판 이름 2</a>
            </li>
            <li>
              <a href="#">게시판 이름 3</a>
            </li>
          </ul>
        </li>
        <li class="board-category-title">
          <a href="#">
            카테고리
          </a>
          <ul class="board">
            <li>
              <a href="#">게시판 이름 1</a>
            </li>
            <li>
              <a href="#">게시판 이름 2</a>
            </li>
            <li>
              <a href="#">게시판 이름 3</a>
            </li>
          </ul>
        </li>
        <li class="board-category-title">
          <a href="#">
            카테고리
          </a>
          <ul class="board">
            <li>
              <a href="#">게시판 이름 1</a>
            </li>
            <li>
              <a href="#">게시판 이름 2</a>
            </li>
            <li>
              <a href="#">게시판 이름 3</a>
            </li>
          </ul>
        </li>
        <li class="board-category-title">
          <a href="#">
            카테고리
          </a>
          <ul class="board">
            <li>
              <a href="#">게시판 이름 1</a>
            </li>
            <li>
              <a href="#">게시판 이름 2</a>
            </li>
            <li>
              <a href="#">게시판 이름 3</a>
            </li>
          </ul>
        </li>
        <li class="board-category-title">
          <a href="#">
            카테고리
          </a>
          <ul class="board">
            <li>
              <a href="#">게시판 이름 1</a>
            </li>
            <li>
              <a href="#">게시판 이름 2</a>
            </li>
            <li>
              <a href="#">게시판 이름 3</a>
            </li>
          </ul>
        </li>
        <li class="board-category-title">
          <a href="#">
            카테고리
          </a>
          <ul class="board">
            <li>
              <a href="#">게시판 이름 1</a>
            </li>
            <li>
              <a href="#">게시판 이름 2</a>
            </li>
            <li>
              <a href="#">게시판 이름 3</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.row {
  padding: 16px 0;
}

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