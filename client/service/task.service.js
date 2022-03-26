import helpers from "../helpers/APIHelpers";
import { METHOD_TYPES, PATHS } from "../config/constant";

export const getTasks = () => {
  return helpers.callApi(METHOD_TYPES.GET, PATHS.TASK.GET, {}, {});
};
export const createTask = (data) => {
  return helpers.callApi(METHOD_TYPES.POST, PATHS.TASK.CREATE, data, {});
};
export const getById = (id) => {
  const path = PATHS.TASK.GET_BY_ID.replace("{id}", id);
  return helpers.callApi(METHOD_TYPES.GET, path, {}, {});
};
export const updateById = (id, data) => {
  const path = PATHS.TASK.UPDATE_BY_ID.replace("{id}", id);
  return helpers.callApi(METHOD_TYPES.PATCH, path, data, {});
};
export const deleteById = (id) => {
  const path = PATHS.TASK.DELETE_BY_ID.replace("{id}", id);
  return helpers.callApi(METHOD_TYPES.DELETE, path, {}, {});
};
