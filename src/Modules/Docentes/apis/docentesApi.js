import {getElementsBase,updateElementBase,createElementBase,deleteElementBase} from '../../../apis/generalApi'

const endpointURL = `/docentes`;


export const getDocentesApi = async () => {
  try {
    return await getElementsBase(endpointURL);
  } catch (error) {
    // console.log(error);
    return false
  }
};

export const updateDocenteApi = async (id, data) => {
  try {
    return await updateElementBase(endpointURL,id, data);
  } catch (error) {
    // console.log(error);
    return false
  }
};

export const createDocenteApi = async (data) => {
  try {
    return await createElementBase(endpointURL,data)
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const deleteDocenteApi = async (id) => {
  try {
    return await deleteElementBase(endpointURL,id);
  } catch (error) {
    // console.log(error);
    return false;
  }
};







