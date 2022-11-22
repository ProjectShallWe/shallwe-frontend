<template>
  <div class="row">
    <div class="col-12">
      <div class="real-time-best">
        <h2>실시간 인기글</h2>
        <ul>
          <li
              v-for="post in realTimeBestPosts"
              :key="post.postId"
          >
            <router-link :to="`/community/${post.boardId}/${post.postId}`">
              <div class="thumbnail">
                <img :src="post.thumbnailUrl" @error="replaceImage">
              </div>
              <div class="post-info">
                <div class="post-title">
                  <p>{{ post.postTitle }}</p>
                  <div class="comment-count">
                    [{{ post.commentCount }}]
                  </div>
                </div>
                <div class="board-info">
              <span class="board">
                {{ post.boardTitle }}
              </span>
                  <span class="post-created-date">
                {{ post.createdDate }}
              </span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <Pagination
            :page="pageNum"
            :total-pages="totalPages"
            @on-click="setPaginationParam"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import Pagination from "@/components/Pagination";
import replaceImg from "../assets/images/forbid-line.svg"

export default {
  components: {
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const pageParam = ref(route.query.page);
    const pageNum = computed(() => store.state.realTimeBest.page);
    const totalPages = computed(() => store.state.realTimeBest.totalPages);
    const realTimeBestPosts = computed(() => store.state.realTimeBest.realTimeBestPosts);

    const getRealTimeBestPosts = (page) => store.dispatch("realTimeBest/getRealTimeBestPosts", {
      page
    })

    const pageParamResolver = (page) => {
      // pageParam이 undefined일 경우, page값이 NAN이 되는 것을 방지하기 위한 방어코드.
      if (!pageParam.value) {
        return 0;
      }
      return page;
    }

    const setPaginationParam = (page) => {
      pageParam.value = page;
    }

    const replaceImage = (e) => {
      e.target.src = replaceImg;
    }

    getRealTimeBestPosts(pageParamResolver(pageParam.value - 1));

    return {
      pageNum,
      totalPages,
      setPaginationParam,
      replaceImage,
      realTimeBestPosts
    }
  }
}
</script>

<style lang="scss" scoped>
.real-time-best {
  h2 {
    font-size: 20px;
    padding: 16px 0;
    border-bottom: $POINT_COLOR solid 2px;
  }

  ul {

    li {
      border-bottom: $TERTIARY_COLOR solid 1px;

      a {
        display: flex;
        align-items: center;

        .thumbnail {
          img {
            padding: 4px 0;
            object-fit: cover;
            width: 96px;
            height: 54px;
          }
        }

        .post-info {
          margin-left: 8px;

          .post-title {
            display: flex;

            p {
              font-size: 14px;
              margin: 0 8px 0 0;
            }

            .comment-count {
              color: $POINT_COLOR;
              font-size: 12px;
            }
          }

          .board-info {
            font-size: 12px;

            span {
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>