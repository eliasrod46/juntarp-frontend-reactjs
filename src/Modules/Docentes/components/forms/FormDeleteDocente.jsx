//modal
import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DocentesContext } from "../../context";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { AlertBox, InputGroup } from "@/components";

export const FormDeleteDocente = ({
  row,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // contexts
  const { getDocentes, deleteDocente } = useContext(DocentesContext);
  const { authTokens } = useContext(AuthContext);

  //store dataform from inputs
  const handleDeleteElement = async () => {
    try {
      if (row) {
        await deleteDocente(authTokens, row.id);
      }

      setSeverity("success");
      setAlertMessage(`Docente eliminado con exito`);
      setShowAlertFlag(true);

      handleCloseShowModal();
    } catch (error) {
      console.log(error);

      setSeverity("error");
      setShowAlertFlag(true);
      if (error && error.message) {
        setAlertMessage(`${error.message}`);
      } else {
        setAlertMessage("Ocurrio un error.");
      }
    } finally {
      getDocentes(authTokens);
    }
  };

  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="m-5">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {`Eliminar Docente: ${row ? row.lastname + ", " + row.name : ""}`}
        </h2>
      </div>
    );
  };

  const ButtonsForm = () => {
    return (
      <div className="mt-10">
        <Button
          onClick={handleDeleteElement}
          variant="contained"
          color="success"
        >
          Eliminar
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-full bg-gray-300 p-5 rounded-md ">
      <TitleForm />

      {/* Form data */}
      <div className="grid grid-cols-1 gap-10">
        <div>
          {/* text */}
          <div>
            <p className="text-xl">
              {`Va a eliminar al docente: ${row ? row.lastname : ""}, ${
                row ? row.name : ""
              }`}
            </p>
            <p className="text-center text-2xl">Esta seguro?</p>
          </div>
        </div>
      </div>
      {/* buttons */}
      <ButtonsForm />
    </div>
  );
};
