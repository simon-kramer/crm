// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  /* Automatic prepending the API URL */
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      apiToken: process.env.API_TOKEN
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/ui', '@nuxtjs/svg-sprite']
})
