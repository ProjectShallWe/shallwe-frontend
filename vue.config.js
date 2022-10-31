const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/abstracts/_variables.scss";
        `
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false
})
