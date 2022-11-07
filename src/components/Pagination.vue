<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <nav>
        <ul class="page-list">
          <li class="previous-page"
              :class="{inactive : isPreviousButtonInactive($props.page, displayCount)}"
          >
            <router-link
                :to="addPageParamUrl(calcPreviousButton($props.page, displayCount))"
                @click="onClick(calcPreviousButton($props.page, displayCount))"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
              </svg>
              이전
            </router-link>
          </li>
          <li v-for="page in pageNumList($props.page, $props.totalPages, displayCount)"
              :key="page"
              class="page">
            <router-link
                :to="addPageParamUrl(page)"
                @click="onClick(page)"
            >
              {{ page }}
            </router-link>
          </li>
          <li
              class="next-page"
              :class="{inactive : isNextButtonInactive($props.page, $props.totalPages, displayCount)}"
          >
            <router-link
                :to="addPageParamUrl(calcNextButton($props.page, displayCount))"
                @click="onClick(calcNextButton($props.page, displayCount))"
            >
              다음
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
              </svg>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['on-click'],
  setup(props, context) {
    const url = ref(window.location.href);
    const isPageParam = new URL(url.value).searchParams.has("page");

    const displayCount = ref(10);

    const addPageParamUrl = (page) => {
      const changedUrl = new URL(url.value);

      if (isPageParam) {
        changedUrl.searchParams.delete("page");
      }

      changedUrl.searchParams.append("page", page);
      return changedUrl.pathname + changedUrl.search;
    }

    const onClick = (page) => {
      /*
      스프링 서버에서 전달 받는 Page 객체는 0페이지부터 시작한다.
      이를 조정하기 위해 page-1 값을 전달한다.
      */
      context.emit('on-click', page - 1);
    };

    const startPageNum = (page, displayCount) => {
      return Math.floor(page / displayCount) * displayCount + 1;
    };

    const endPageNum = (totalPages, startPage, displayCount) => {
      return totalPages < startPage + displayCount - 1 ? totalPages : startPage + displayCount - 1;
    };

    const pageNumList = (page, totalPages, displayCount) => {
      const pageNumList = [];
      const start = startPageNum(page, displayCount);
      const end = endPageNum(totalPages, start, displayCount);
      for (let i = start; i <= end; i++) {
        pageNumList.push(i);
      }
      return pageNumList;
    };

    const isPreviousButtonInactive = (page, displayCount) => {
      return page < displayCount;
    };

    const calcPreviousButton = (page, displayCount) => {
      return Math.floor(page / displayCount) * displayCount;
    };

    const isNextButtonInactive = (page, totalPages, displayCount) => {
      return page + 1 > Math.floor(totalPages / displayCount) * displayCount;
    };

    const calcNextButton = (page, displayCount) => {
      return Math.ceil((page + 1) / displayCount) * displayCount + 1
    };

    return {
      url,
      displayCount,
      addPageParamUrl,
      pageNumList,
      onClick,
      isPreviousButtonInactive,
      isNextButtonInactive,
      calcPreviousButton,
      calcNextButton
    }
  }
}

</script>

<style lang="scss" scoped>
.page-list {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 16px;

  .previous-page,
  .next-page,
  .page {
    display: flex;
    padding: 6px;
  }

  .previous-page,
  .next-page {
    a {
      display: flex;
    }
  }

  .inactive {
    pointer-events: none;
    color: $TERTIARY_COLOR;
    fill: $TERTIARY_COLOR;
  }
}

</style>