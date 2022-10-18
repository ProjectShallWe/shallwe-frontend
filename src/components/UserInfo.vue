<template>
  <div class="row">
    <!-- UserMenu -->
    <div class="col-2">
      <div class="info-menu-wrapper">
        <ul class="info-menu">
          <li class="info-user">
            <a :href="`/user/${nickname}`">
              내 정보
            </a>
          </li>
          <li class="info-security">
            <a :href="`/user/${nickname}?mode=security`">
              보안 설정
            </a>
          </li>
          <li class="info-post">
            <a :href="`/user/${nickname}?mode=post`">
              게시글
            </a>
          </li>
          <li class="info-comment">
            <a :href="`/user/${nickname}?mode=comment`">
              댓글
            </a>
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
              @submit.prevent="change"
              class="info-form">
            <div class="nickname">
              <h3>닉네임</h3>
              <input type="text"
                     class="new-nickname"
                     placeholder="변경할 닉네임을 입력해주세요."
                     v-model="changeNickname"
              >
            </div>
            <h3 class="nowUse" v-if="isChange && nickname === changeNickname">
              "현재 사용중인 닉네임입니다."
            </h3>
            <h3 class="regExp" v-else-if="isChange && !ruleCheck(changeNickname)">
              "닉네임은 2글자 이상 10글자 이하 한글, 영문 대소문자, 숫자를 사용할 수 있습니다."
            </h3>
            <h3 class="duplicate" v-else-if="(isChange && !ruleCheck(changeNickname)) || duplicateCheck">
              "사용중인 닉네임 입니다."
            </h3>
            <h3 class="not-duplicate" v-else-if="isChange && ruleCheck(changeNickname) && !duplicateCheck">
              "사용할 수 있는 닉네임입니다."
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
import {ref, computed, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import UserComments from "@/components/UserComments";
import UserPosts from "@/components/UserPosts";
import UserSecurity from "@/components/UserSecurity";

export default {
  components: {UserSecurity, UserPosts, UserComments},
  setup() {
    const route = useRoute();
    const store = useStore();
    const modeQuery = route.query.mode;
    const nickname = computed(() => store.state.login.nickname);
    const changeNickname = ref("");
    const isChange = ref(false);
    const duplicateCheck = computed(() => store.state.userInfo.duplicateCheck);

    changeNickname.value = nickname.value;

    const ruleCheck = (nickname) => {
      const regexp = /^[ㄱ-ㅎ가-힣A-Za-z0-9]{2,10}$/
      return regexp.test(nickname);
    };

    let timeout = 0;
    watch(changeNickname, async () => {
      clearTimeout(timeout);
      isChange.value = true;

      if (ruleCheck(changeNickname.value)) {
        timeout = setTimeout(async () => {
          await store.dispatch("userInfo/checkNicknameDuplicate", {
            nickname: changeNickname.value
          });
        }, 500);
      }
    });

    const change = async () => {
      if (isChange.value && ruleCheck(changeNickname.value) && !duplicateCheck.value) {
        await store.dispatch("userInfo/changeNickname", {
          nickname: changeNickname.value,
        }).then(
            await store.dispatch("login/changeNickname", {
              nickname: changeNickname.value,
            })
        )
      } else {
        alert("사용할 수 없는 닉네임입니다.")
      }
    };

    return {
      changeNickname,
      modeQuery,
      nickname,
      isChange,
      duplicateCheck,
      change,
      ruleCheck
    }
  }
}
</script>

<style scoped>
input {
  border: #D3D3D3 solid 2px;
}

.info-menu-wrapper {
  display: flex;
  justify-content: center;
}

.info-menu {
  width: 100%;
  color: #F8F8F8;
  background-color: #8977AD;
}

.info-menu li {
  padding: 16px 40px;
  border: #F8F8F8 solid 2px;
  text-align: center;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-left: #D3D3D3 solid 2px;
  padding-left: 24px;
}

.info-content {
  display: flex;
  justify-content: center;
}

.info-title {
  font-size: 20px;
  border-bottom: #8977AD solid 2px;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.info-form {
  width: 60%;
}

.nickname {
  display: flex;
  margin: 16px 0;
}

.nickname h3 {
  width: 150px;
  font-size: 16px;
  margin: 8px 0;
}

.new-nickname {
  width: 100%;
  margin-right: 8px;
}

.nowUse,
.regExp,
.duplicate,
.not-duplicate {
  font-size: 14px;
  margin-bottom: 16px;
}
.nowUse,
.regExp,
.duplicate {
  color: red;
}

.not-duplicate {
  color: green;
}

.info-submit {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  color: #F8F8F8;
  background-color: #8977AD;
}

</style>