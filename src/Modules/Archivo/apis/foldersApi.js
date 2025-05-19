import {
  createElementBase,
  deleteElementBase,
  getElementsBase,
  updateElementBase,
} from "../../../apis/generalApi";

const endpointURL = `/archivo/folders`;
export const getElementsIngresoApi = async (authTokens) => {
    return await getElementsBase(authTokens, `${endpointURL}/ingreso-folders`);
};

export const getElementsHistoryIngresoApi = async (authTokens) => {
    return await getElementsBase(authTokens, `${endpointURL}/history-ingreso-folders`);
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
