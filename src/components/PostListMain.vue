<template>
  <div class="row">
    <div class="col-12">
      <div class="wrapper">
        <h1 class="board-title">
          게시판 제목
        </h1>
        <div class="post-category-list">
            <a href="#">
              전체
            </a>
            <a href="#">
              카테고리
            </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a><a href="#">
          카테고리
        </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a><a href="#">
          카테고리
        </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
          <a href="#">
            카테고리
          </a>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col" class="category">
                카테고리
              </th>
              <th scope="col" class="title">
                제목
              </th>
              <th scope="col" class="nickname">
                글쓴이
              </th>
              <th scope="col" class="create_date">
                날짜
              </th>
              <th scope="col" class="like_count">
                좋아요
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="category">
                국내 축구
              </td>
              <td class="title">
                FC 서울 vs 수원 FCQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
              </td>
              <td class="nickname">
                FC 서울팬
              </td>
              <td class="create_date">
                07-31
              </td>
              <td class="like_count">
                4
              </td>
            </tr>
            <tr>
              <td class="category">
                국내 축구
              </td>
              <td class="title">
                FC 서울 vs 수원 FCQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
              </td>
              <td class="nickname">
                FC 서울팬
              </td>
              <td class="create_date">
                07-31
              </td>
              <td class="like_count">
                4
              </td>
            </tr>
            <tr>
              <td class="category">
                국내 축구
              </td>
              <td class="title">
                FC 서울 vs 수원 FCQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
              </td>
              <td class="nickname">
                FC 서울팬
              </td>
              <td class="create_date">
                07-31
              </td>
              <td class="like_count">
                4
              </td>
            </tr>
            <tr>
              <td class="category">
                국내 축구
              </td>
              <td class="title">
                FC 서울 vs 수원 FCQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
              </td>
              <td class="nickname">
                FC 서울팬
              </td>
              <td class="create_date">
                07-31
              </td>
              <td class="like_count">
                4
              </td>
            </tr>
            <tr>
              <td class="category">
                국내 축구
              </td>
              <td class="title">
                FC 서울 vs 수원 FCQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
              </td>
              <td class="nickname">
                FC 서울팬
              </td>
              <td class="create_date">
                07-31
              </td>
              <td class="like_count">
                4
              </td>
            </tr>
            <tr>
              <td class="category">
                국내 축구
              </td>
              <td class="title">
                FC 서울 vs 수원 FCQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
              </td>
              <td class="nickname">
                FC 서울팬
              </td>
              <td class="create_date">
                07-31
              </td>
              <td class="like_count">
                4
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostListMain.vue"
}
</script>

<style scoped>
td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.board-title {
  font-size: 17px;
  padding: 8px 0;
}

.post-category-list {
  display: inline-flex;
  flex-wrap: wrap;
}

.post-category-list a{
  font-size: 14px;
  padding: 4px 6px;
  margin: 4px 4px 4px 0;
  color: #FFFFFF;
  background-color: #8977AD;
  border-radius: 8px;
}

.wrapper table {
  display: table;
  text-align: center;
  table-layout: fixed;
  width: 100%;
  font-size: 14px;
}

tbody tr td.title,
tbody tr td.nickname {
  text-align: left;
}

.category {
  width: 7%;
  padding: 8px;
}

.title {
  width: 60%;
  padding: 6px;
}

.title
.nickname {
  width: 13%;
  padding: 6px;
}

.create_date {
  width: 10%;
  padding: 6px;
}

.like_count {
  width: 10%;
  padding: 6px;
}
</style>