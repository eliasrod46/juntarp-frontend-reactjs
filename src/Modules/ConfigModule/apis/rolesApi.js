import {
  createElementBase,
  deleteElementBase,
  getElementsBase,
  updateElementBase,
} from "../../../apis/generalApi";

const endpointURL = `/roles`;
export const getElementsApi = async (authTokens) => {
  return await getElementsBase(authTokens, `${endpointURL}`);
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
