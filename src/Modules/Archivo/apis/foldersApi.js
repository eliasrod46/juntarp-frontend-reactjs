import {
  createElementBase,
  deleteElementBase,
  getElementsBase,
  updateElementBase,
} from "../../../apis/generalApi";

const endpointURL = `/archivo/folders`;
export const getElementsIngresoApi = async (authTokens) => {
  try {
    return await getElementsBase(authTokens, `${endpointURL}/ingreso-folders`);
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
