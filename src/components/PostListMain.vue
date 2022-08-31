<template>
  <div class="row">
    <div class="col-12">
      <div class="wrapper">
        <h1 class="board-title">
          게시판 제목
        </h1>
        <PostCategoryList
            @get-posts-in-board="getPosts"
            @get-posts-in-category="getPosts"
        />
        <table class="post-list">
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
            <tr
                v-for="post in posts[0]"
                :key="post.postId"
            >
              <td class="category">
                {{ post.postCategory }}
              </td>
              <td class="title">
                <a href="#">
                  {{ post.title }}
                </a>
              </td>
              <td class="nickname">
                {{ post.nickname }}
              </td>
              <td class="create_date">
                {{ post.createdDate }}
              </td>
              <td class="like_count">
                {{ post.likeCount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PostCategoryList from "@/components/PostCategoryList";
import { ref } from "vue";

export default {
  name: "PostListMain.vue",
  components: {PostCategoryList},
  setup() {
    const posts = ref([]);

    const getPosts = (post) => {
      if (posts.value.length != 0) {
        posts.value = [];
      }

      posts.value.push(post);
      console.log(posts)
    }

    return {
      posts,
      getPosts,
    };
  }
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

.wrapper table {
  display: table;
  text-align: center;
  table-layout: fixed;
  width: 100%;
  font-size: 14px;
}

.post-list thead {
  border-bottom: #8977AD solid 1px;
}

.post-list tbody tr td {
  border-bottom: #D3D3D3 solid 1px;
}

tbody tr td.title {
  text-align: left;
}

.category {
  width: 10%;
  padding: 8px;
}

.title {
  width: 60%;
  padding: 6px;
}

.nickname {
  width: 12%;
  padding: 6px;
}

.create_date {
  width: 6%;
  padding: 6px;
}

.like_count {
  width: 12%;
  padding: 6px;
}
</style>