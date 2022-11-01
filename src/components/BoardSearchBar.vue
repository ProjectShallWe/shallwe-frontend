<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <form
          @submit.prevent="search"
      >
        <select v-model="type">
          <option value="ticon">제목+내용</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="nickname">닉네임</option>
        </select>
        <input type="text" v-model="keyword">
        <button type="submit" @click="addSearchParamUrl(type, keyword)">
          검색
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  emits: ['search'],
  setup(props, context) {
    const keyword = ref('');
    const type = ref('ticon');

    const url = ref(window.location.href);
    const isPageParam = new URL(url.value).searchParams.has("page");
    const isTypeParam = new URL(url.value).searchParams.has("type");
    const isKeywordParam = new URL(url.value).searchParams.has("keyword");

    const addSearchParamUrl = (type, keyword) => {
      const changedUrl = new URL(url.value);

      if (isPageParam) {
        changedUrl.searchParams.delete("page");
      }

      if (isTypeParam) {
        changedUrl.searchParams.delete("type");
      }

      if (isKeywordParam) {
        changedUrl.searchParams.delete("keyword");
      }

      changedUrl.searchParams.append("type", type);
      changedUrl.searchParams.append("keyword", keyword);
      return location.href = changedUrl.toString();
    }

    const search = () => {
      context.emit('search', type.value, keyword.value);
    }

    return {
      type,
      keyword,
      search,
      addSearchParamUrl,
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  justify-content: center;
  padding: 16px;

  select {
    margin-right: 8px;
  }

  input {
    height: 40px;
    width: 240px;
    border: $TERTIARY_COLOR solid 1px;
    border-radius: 8px;
    padding: 8px;
    margin-right: 8px;

    &:focus {
      border: $SECONDARY_COLOR solid 1px;
    }
  }

  button {
    height: 40px;
    width: 80px;
    border: $TERTIARY_COLOR solid 1px;
    border-radius: 8px;

    &:hover {
      color: $PRIMARY_COLOR;
      background-color: $SECONDARY_COLOR;
    }
  }
}
</style>