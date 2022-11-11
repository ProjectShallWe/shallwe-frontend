<template>
  <section class="sign-up">
    <div class="wrapper">
      <h1>회원가입</h1>
      <form
          @submit.prevent="signUp"
      >
        <input type="email" placeholder="이메일 주소" v-model="user.form.email">
        <h3 class="emailError">{{ emailErrorMsg }}</h3>
        <input type="password" placeholder="비밀번호 (8자리 이상 20자리 이하)" v-model="user.form.password">
        <input type="password" placeholder="비밀번호 확인" v-model="user.form.verifyPassword">
        <h3 class="emailError">{{ passwordErrorMsg }}</h3>
        <input type="text" placeholder="닉네임 (2자리 이상 10자리 이하)" v-model="user.form.nickname">
        <h3 class="emailError">{{ nicknameErrorMsg }}</h3>
        <button type="submit">회원가입</button>
      </form>
    </div>
  </section>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import {emailValidCheck, passwordValidCheckInSignUp, nicknameValidCheck} from "@/utils/userValid";

export default {
  setup() {
    const user = ref({
      form: {
        email: '',
        password: '',
        verifyPassword: '',
        nickname: '',
      }
    });

    const emailErrorMsg = ref("");
    const passwordErrorMsg = ref("");
    const nicknameErrorMsg = ref("");

    const store = useStore();
    const signUp = async () => {

      if (!(await emailValidCheck(user.value.form.email)).valid) {
        return emailErrorMsg.value = (await emailValidCheck(user.value.form.email)).message;
      } else {
        emailErrorMsg.value = "";
      }

      if (!passwordValidCheckInSignUp(user.value.form.password, user.value.form.verifyPassword).valid) {
        return passwordErrorMsg.value = passwordValidCheckInSignUp(user.value.form.password, user.value.form.verifyPassword).message;
      } else {
        passwordErrorMsg.value = "";
      }

      if (!(await nicknameValidCheck("ADMIN", user.value.form.nickname)).valid) {
        return nicknameErrorMsg.value = (await nicknameValidCheck("ADMIN", user.value.form.nickname)).message;
      } else {
        nicknameErrorMsg.value = "";
      }

      await store.dispatch("signUp/signUp", {
        email: user.value.form.email,
        password: user.value.form.password,
        nickname: user.value.form.nickname,
      });
    }

    return {
      user,
      emailErrorMsg,
      passwordErrorMsg,
      nicknameErrorMsg,
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

    h3 {
      font-size: 14px;
      color: $EMPHASIS_COLOR;
      margin-bottom: 8px;
    }
  }
}
</style>