export const generalErrorsHandler = async (
  catchError,
  setGeneralError,
  setValidationErrors
) => {
  const { message } = catchError;
 
  if (message === "Errores de validación") {
    setGeneralError(catchError.message);
    setValidationErrors(catchError.validationErrors);
  } else if (catchError.message) {
    setGeneralError(catchError.message);
  } else {
    setGeneralError("Error desconocido.");
  }

  return Promise.reject(catchError);
};
