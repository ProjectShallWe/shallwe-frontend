<template>
  <section class="landing">
    <h1 class="landing-title">
      <strong class="logo">
        ShallWe
      </strong>
    </h1>
    <h2 class="landing-subtitle">
      '우리 같이 놀아요'
    </h2>
    <p class="landing-desc fs-m">
      <strong class="logo">
        ShallWe
      </strong>
      는 누구나 참여할 수 있는 커뮤니티를 만드는 것을 목표로 하고 있습니다.
    </p>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.landing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  color: $PRIMARY_COLOR;
  background-color: $SECONDARY_COLOR;

  .landing-title {
    display: block;
    font-size: 96px;
    margin-bottom: 12px;
  }

  .landing-subtitle {
    font-size: 32px;
    margin-bottom: 48px;
  }
}

</style>