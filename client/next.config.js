
require("dotenv").config();
module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    env: process.env.ENV,
  },
}


