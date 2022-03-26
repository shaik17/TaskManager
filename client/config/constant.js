import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const env1 = process.env.ENV;
export const BASE_URL = () => {
  console.log(publicRuntimeConfig.env);

  if (publicRuntimeConfig.env === "development") {
    return "http://localhost:5000";
  }
  if (publicRuntimeConfig.env === "qa") {
    return "https://api.staging.iskooler.com";
  }
  return "https://api.iskooler.com";
};

export const APP_URL = () => {
  if (publicRuntimeConfig.env === "development") {
    return "http://localhost:3000";
  }
  if (publicRuntimeConfig.env === "qa") {
    return "https://api.staging.iskooler.com";
  }
  return "https://api.iskooler.com";
};

export const RAZOR = () => {
  if (publicRuntimeConfig.env === "development") {
    return "rzp_test_5TkejTnYkeuaJL";
  }
  if (publicRuntimeConfig.env === "qa") {
    return "rzp_test_5TkejTnYkeuaJL";
  }
  return "rzp_live_qctfM2KP4sVO7i";
};

export const APP_CONFIG = {
  name: "Askurdoctor",
};

export const METHOD_TYPES = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    // RESET_PASSWORD: "/api/v1/users/password/reset",
  },
  TASK: {
    GET: "/api/v1/task",
    CREATE: "/api/v1/task",
    GET_BY_ID: "/api/v1/task/{id}",
    UPDATE_BY_ID: "/api/v1/task/{id}",
    DELETE_BY_ID: "/api/v1/task/{id}",
  },
};
