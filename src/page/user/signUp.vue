<template>
  <section class="sign-up">
    <div class="wrapper">
      <h1>회원가입</h1>
      <form
          @submit.prevent="signUp"
      >
        <input type="email" placeholder="이메일 주소" v-model="user.form.email">
        <input type="password" placeholder="비밀번호 (8자리 이상)" v-model="user.form.password">
        <input type="text" placeholder="닉네임" v-model="user.form.nickname">
        <button type="submit">회원가입</button>
      </form>
    </div>
  </section>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  setup() {
    const user = ref({
      form: {
        email: '',
        password: '',
        nickname: '',
      }
    });

    const store = useStore();
    const signUp = async () => {
      await store.dispatch("signUp/signUp", {
        email: user.value.form.email,
        password: user.value.form.password,
        nickname: user.value.form.nickname,
      });
    }

    return {
      user,
      signUp
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up {
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
    background-color: #FFFFFF;

    h1 {
      font-size: 24px;
      margin-bottom: 16px;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    input,
    button {
      height: 40px;
      width: 100%;
    }

    input {
      font-size: 12px;
      border: $TERTIARY_COLOR solid 1px;
      color: $TERTIARY_COLOR;
      margin-bottom: 8px;
      padding: 4px;
    }

    button {
      font-size: 16px;
      color: $PRIMARY_COLOR;
      background-color: $SECONDARY_COLOR;
      border-radius: 8px;
      margin-bottom: 16px;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>