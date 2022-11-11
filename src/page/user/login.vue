<template>
  <section class="login">
    <div class="wrapper">
      <h1>로그인</h1>
      <form
          @submit.prevent="login"
      >
        <input type="email" placeholder="이메일 주소" v-model="user.form.email">
        <input type="password" placeholder="비밀번호 (8자리 이상)" v-model="user.form.password">
        <button type="submit">로그인</button>
      </form>
      <router-link
          :to="`/user/sign-up`"
      >
        회원가입
      </router-link>
    </div>
  </section>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import router from "@/router";

export default {
  setup() {
    const user = ref({
      form: {
        email: '',
        password: '',
      }
    });
    const store = useStore();
    const login = async () => {
      await store.dispatch("login/login", {
        email: user.value.form.email,
        password: user.value.form.password
      })
          .then(() => {
            router.push({name: 'community'})
          })
          .catch(() => {
          });
    }

    return {
      user,
      login,
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: $TERTIARY_COLOR;

  .wrapper {
    /* 항상 화면 정중앙에 배치*/
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border: $TERTIARY_COLOR solid 2px;
    width: 280px;
    height: 420px;
    padding: 20px;
    background-color: $PRIMARY_COLOR;

    h1 {
      font-size: 24px;
      margin-bottom: 16px;
    }

    form {
      display: flex;
      flex-direction: column;

      input,
      button {
        height: 40px;
        width: 100%;
        border-radius: 4px;
      }

      input {
        font-size: 12px;
        border: $TERTIARY_COLOR solid 1px;
        color: $TERTIARY_COLOR;
        padding: 4px;
        margin-bottom: 8px;
      }

      button {
        font-size: 16px;
        color: $PRIMARY_COLOR;
        background-color: $SECONDARY_COLOR;
        margin-bottom: 8px;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    a {
      border: $TERTIARY_COLOR solid 1px;
      height: 40px;
      width: 100%;
      border-radius: 4px;
      padding-top: 6px;
    }
  }
}
</style>