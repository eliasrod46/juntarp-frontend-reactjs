import {
  getElementsBase,
  updateElementBase,
  createElementBase,
  deleteElementBase,
} from "../../../apis/generalApi";

const endpointURL = `/user`;

export const getElementsApi = async (authTokens) => {
    return await getElementsBase(authTokens, endpointURL);
};

export const updateElementApi = async (authTokens, id, data) => {
    return await updateElementBase(authTokens, endpointURL, id, data);
};

export const createElementApi = async (authTokens, data) => {
    return await createElementBase(authTokens, endpointURL, data);
};

export const deleteElementApi = async (authTokens, id) => {
    return await deleteElementBase(authTokens, endpointURL, id);
};

export const assignRolesApi = async (authTokens, data) => {
    return await createElementBase(
      authTokens,
      `${endpointURL}/assign-roles`,
      data
    );
};

export const changePassswordApi = async (authTokens, id, data) => {
    return await updateElementBase(
      authTokens,
      `${endpointURL}/change-password`,
      id,
      data
    );
};
