const pkg = require("./package");

module.exports = {
  mode: "spa",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"
      },
      {
        src:
          "https://piecioshka.github.io/executor-editor/dist/executor-editor.js"
      }
    ]
  },
  css: ["~assets/css/customClasses.css", "~assets/css/animations.css"],
  /*
  ** Customize the progress-bar color
  */
  loading: {
    name: "chasing-dots",
    color: "#ff5638",
    background: "white",
    height: "4px"
  },
  loadingIndicator: {
    name: "folding-cube",
    color: "teal"
  },
  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ["~plugins/fireauth.js"],

  /*
  ** Nuxt.js modules
  */
  modules: ["@nuxtjs/axios", "@nuxtjs/toast"],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  toast: {
    position: "top-right",
    duration: 2000
  },
  router: {
    middleware: "router-auth"
  },
  env: {
    youtubeApiKey: "AIzaSyDSysJutPpZhB8vh9C4lu51vesKK7DTnkU"
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
