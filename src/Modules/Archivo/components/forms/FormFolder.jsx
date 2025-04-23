//modal
import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { FoldersContext } from "../../context";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { AlertBox, InputGroup } from "@/components";

export const FormFolder = ({
  row,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // structure dataForm
  const dataFormBase = {
    observations: "",
    details: "",
    location: "",
    state: "",
  };

  // contexts
  const { getFoldersIngreso, createFolder, validationErrors, updateFolder } =
    useContext(FoldersContext);
  const { authTokens } = useContext(AuthContext);

  // states
  const [dataForm, setDataForm] = useState(dataFormBase);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        observations: row.observations ? row.observations : "",
        details: row.details ? row.details : "",
        location: row.location ? row.location : "",
        state: row.state ? row.state : "",
      };
      setDataForm(dataFormRecived);
    } else {
      setDataForm(dataFormBase);
    }
  }, [row]);

  //update dataform from inputs
  const handleChangeinputs = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;

    // update state
    setDataForm((prevState) => ({
      ...prevState,
      [nameInput]: valueInput,
    }));
  };

  //store dataform from inputs
  const handleStoreData = async () => {
    try {
      const dataToSend = {
        observations: dataForm.observations,
        details: dataForm.details,
        location: dataForm.location,
        state: dataForm.state,
      };

      if (row) {
        await updateFolder(authTokens, row.id, dataToSend);
      } else {
        await createFolder(authTokens, dataToSend);
      }

      setSeverity("success");
      setAlertMessage(`Docente ${row ? "actualizado" : "creado"} con exito`);
      setShowAlertFlag(true);

      handleCloseShowModal();
    } catch (error) {
      setSeverity("error");
      setShowAlertFlag(true);
      if (error && error.message) {
        setAlertMessage(`${error.message}`);
      } else {
        setAlertMessage("Ocurrio un error.");
      }
    } finally {
      getFoldersIngreso(authTokens);
    }
  };

  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row && row.docente ? "Actualizar" : "Crear"} Docente
          {row && row.docente
            ? `: ${row.docente.lastname}, ${row.docente.name}`
            : ""}
        </h2>
      </div>
    );
  };

  const ButtonsForm = () => {
    return (
      <div className="mt-10">
        <Button onClick={handleStoreData} variant="contained" color="success">
          {row ? "Actualizar" : "Crear"}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-full bg-gray-300 p-5 rounded-md w-3/6 m-auto">
      <TitleForm />

      {/* Form data */}
      <div className="grid grid-cols-2 gap-10">
        {/* observations */}
        <InputGroup
          id="observations"
          type="text"
          label="Observaciones"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />

        {/* details */}
        <InputGroup
          id="details"
          type="text"
          label="Detalles"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />
        {/* location */}
        <InputGroup
          id="location"
          type="number"
          label="Ubicacion"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />
        {/* state */}
        <InputGroup
          id="state"
          type="number"
          label="Estado"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />
      </div>
      {/* buttons */}
      <ButtonsForm />
    </div>
  );
};
