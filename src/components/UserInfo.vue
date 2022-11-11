<template>
  <div class="row">
    <!-- UserMenu -->
    <div class="col-2">
      <div class="info-menu-wrapper">
        <ul class="info-menu">
          <li class="info-user">
            <router-link
                :to="`/user/${nowNickname}`"
            >
              내 정보
            </router-link>
          </li>
          <li class="info-security">
            <router-link
                :to="`/user/${nowNickname}?mode=security`"
            >
              보안 설정
            </router-link>
          </li>
          <li class="info-post">
            <router-link
                :to="`/user/${nowNickname}?mode=post`"
            >
              게시글
            </router-link>
          </li>
          <li class="info-comment">
            <router-link
                :to="`/user/${nowNickname}?mode=comment`"
            >
              댓글
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-10">
      <div v-if="modeQuery===undefined"
           class="info-wrapper">
        <h2 class="info-title">
          기본 정보 변경
        </h2>
        <div class="info-content">
          <form
              @submit.prevent="changeNickname"
              class="info-form">
            <div class="nickname">
              <h3>닉네임</h3>
              <input type="text"
                     class="new-nickname"
                     placeholder="변경할 닉네임을 입력해주세요."
                     v-model="newNickname"
              >
            </div>
            <h3 class="error">
              {{ errorMessage }}
            </h3>
            <button type="submit"
                    class="info-submit"
            >
              확인
            </button>
          </form>
        </div>
      </div>
      <div v-if="modeQuery==='security'"
           class="info-wrapper">
        <UserSecurity/>
      </div>
      <div v-if="modeQuery==='post'"
           class="info-wrapper">
        <UserPosts/>
      </div>
      <div v-if="modeQuery==='comment'"
           class="info-wrapper">
        <UserComments/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import UserComments from "@/components/UserComments";
import UserPosts from "@/components/UserPosts";
import UserSecurity from "@/components/UserSecurity";
import {nicknameValidCheck} from "@/utils/userValid";

export default {
  components: {UserSecurity, UserPosts, UserComments},
  setup() {
    const route = useRoute();
    const store = useStore();
    const modeQuery = route.query.mode;
    const nowNickname = computed(() => store.state.login.nickname);
    const newNickname = ref("");
    const errorMessage = ref("");

    newNickname.value = nowNickname.value;

    const changeNickname = async () => {
      if (!(await nicknameValidCheck(nowNickname.value, newNickname.value)).valid) {
        errorMessage.value = (await nicknameValidCheck(nowNickname.value, newNickname.value)).message;
        return
      }

      await store.dispatch("userInfo/changeNickname", {
        nickname: newNickname.value,
      });

      await store.dispatch("login/changeNickname", {
        nickname: newNickname.value,
      })
    };

    return {
      modeQuery,
      nowNickname,
      newNickname,
      changeNickname,
      errorMessage,
    }
  }
}
</script>

<style lang="scss" scoped>

.info-menu-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 0;

  .info-menu {
    width: 100%;
    color: $SECONDARY_COLOR;
    background-color: $PRIMARY_COLOR;

    li {
      padding: 16px 40px;
      border: $TERTIARY_COLOR solid 2px;
      text-align: center;
    }
  }
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-left: $TERTIARY_COLOR solid 2px;
  padding: 40px 24px;

  .info-title {
    font-size: 20px;
    border-bottom: $TERTIARY_COLOR solid 2px;
    margin-bottom: 16px;
    padding-bottom: 16px;

  }

  .info-content {
    display: flex;
    justify-content: center;

    .info-form {
      width: 50%;

      .nickname {
        display: flex;
        justify-items: center;
        align-items: center;

        margin: 16px 0;

        h3 {
          width: 30%;
          font-size: 16px;
        }

        .new-nickname {
          width: 70%;
          border: $TERTIARY_COLOR solid 1px;
          padding: 8px;
        }
      }

      .error  {
        color: $EMPHASIS_COLOR;
        font-size: 0.875rem;
        margin-bottom: 16px;
      }

      .info-submit {
        width: 100%;
        height: 40px;
        border-radius: 8px;
        color: $SECONDARY_COLOR;
        background-color: $PRIMARY_COLOR;
        border: $TERTIARY_COLOR solid 1px;

        &:hover {
          color: $PRIMARY_COLOR;
          background-color: $SECONDARY_COLOR;
        }
      }
    }
  }

}

</style>