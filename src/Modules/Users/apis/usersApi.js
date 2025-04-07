import {
  getElementsBase,
  updateElementBase,
  createElementBase,
  deleteElementBase,
} from "../../../apis/generalApi";

const endpointURL = `/user`;

export const getElementsApi = async (authTokens) => {
  try {
    const check = await getElementsBase(authTokens, endpointURL);
    // console.log(check);

    return check;
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const updateElementApi = async (authTokens, id, data) => {
  try {
    return await updateElementBase(authTokens, endpointURL, id, data);
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const createElementApi = async (authTokens, data) => {
  try {
    return await createElementBase(authTokens, endpointURL, data);
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const deleteElementApi = async (authTokens, id) => {
  try {
    return await deleteElementBase(authTokens, endpointURL, id);
  } catch (error) {
    // console.log(error);
    return false;
  }
};
