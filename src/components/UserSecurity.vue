<template>
  <h2 class="info-title">
    비밀번호 변경
  </h2>
  <div class="info-content">
    <form
        @submit.prevent="changePassword"
        class="info-form"
    >
      <div class="password">
        <input
            type="password"
            class="now-password"
            placeholder="현재 비밀번호"
            v-model="nowPassword"
        >
        <input
            type="password"
            class="new-password"
            placeholder="새 비밀번호"
            v-model="newPassword"
        >
        <input
            type="password"
            class="confirm-password"
            placeholder="새 비밀번호 확인"
            v-model="confirmPassword"
        >
        <h3 class="error">
          {{ errorMessage }}
        </h3>
      </div>
      <button type="submit"
              class="info-submit"
      >
        확인
      </button>
    </form>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import {passwordValidCheckInSecurity} from "@/utils/userValid";

export default {
  setup() {
    const store = useStore();
    const nowPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");

    const changePassword = async () => {
      if (!(await passwordValidCheckInSecurity(nowPassword.value, newPassword.value, confirmPassword.value)).valid) {
        return errorMessage.value = (await passwordValidCheckInSecurity(nowPassword.value, newPassword.value, confirmPassword.value)).message;
      }

      await store.dispatch("userSecurity/changePassword", {
        nowPassword: nowPassword.value,
        newPassword: newPassword.value
      })
    }

    return {
      nowPassword,
      newPassword,
      confirmPassword,
      changePassword,
      errorMessage
    }
  }
}
</script>

<style lang="scss" scoped>

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

    .password {
      display: flex;
      flex-direction: column;

      input {
        padding: 8px;
        margin-bottom: 8px;
        border: $TERTIARY_COLOR solid 1px;
      }

      h3 {
        font-size: 0.875rem;
        color: $EMPHASIS_COLOR;
        margin-bottom: 16px;
      }
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

</style>