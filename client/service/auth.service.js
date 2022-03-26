import helpers from "../helpers/APIHelpers";
import { METHOD_TYPES, PATHS } from "../config/constant";
import useSWR from "swr";

export function registerUser(data) {
  return helpers.callApi(METHOD_TYPES.POST, PATHS.AUTH.REGISTER, data, {});
}

export function login(data) {
  return helpers.callApi(METHOD_TYPES.POST, PATHS.AUTH.LOGIN, data, {});
}

export function logoutUser() {
  localStorage.clear();
}

export function updatePassword(data) {
  return helpers.callApi(
    METHOD_TYPES.PATCH,
    PATHS.AUTH.UPDATE_PASSWORD,
    data,
    {}
  );
}

export function forgotPassword(data) {
  return helpers.callApi(
    METHOD_TYPES.POST,
    PATHS.AUTH.FORGOT_PASSWORD,
    data,
    {}
  );
}

export function resetPassword(data) {
  return helpers.callApi(
    METHOD_TYPES.PATCH,
    PATHS.AUTH.RESET_PASSWORD,
    data,
    {}
  );
}

export function isAuthenticated() {
  if (localStorage.getItem("token") === null) {
    return false;
  }
  const user = localStorage.getItem("user");
  return JSON.parse(user);
}

export function storeUser(data) {
  for (const [key, value] of Object.entries(data)) {
    localStorage.setItem(key, value);
  }
  
  localStorage.setItem("user", JSON.stringify(data));
}
export function getUser(id) {
  let path = PATHS.AUTH.SEARCH.replace("{id}", id);

  // const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
  // const { data, error, mutate } = useSWR(path, fetcher, {
  //   revalidateOnFocus: false,
  // });
  // return { data, isLoading: !data && !error, error, mutate };
  return helpers.callApi(METHOD_TYPES.GET, path, {}, {});
}
