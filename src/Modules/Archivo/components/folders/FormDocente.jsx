//modal
import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DocentesContext } from "../../context";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { AlertBox, InputGroup } from "@/components";

export const FormDocente = ({
  row,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // structure dataForm
  const dataFormBase = {
    dni: "",
    lastname: "",
    name: "",
  };

  // contexts
  const {
    getDocentes,
    createDocente,
    validationErrors,
    generalError,
    updateDocente,
  } = useContext(DocentesContext);
  const { authTokens } = useContext(AuthContext);

  // states
  const [dataForm, setDataForm] = useState(dataFormBase);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        dni: row.dni ? row.dni : "",
        name: row.name ? row.name : "",
        lastname: row.lastname ? row.lastname : "",
      };
      setDataForm(dataFormRecived);
    } else {
      setDataForm(dataFormBase);
    }
  }, [row]);

  //update dataform from inputs
  const handleChangeinputs = (e) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;
    //conver to number if name dni
    if (nameInput == "dni") {
      if (isNaN(Number(e.target.value))) {
        valueInput = "";
      } else {
        valueInput = e.target.value;
      }
    }

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
        dni: dataForm.dni,
        name: dataForm.name,
        lastname: dataForm.lastname,
      };

      if (row) {
        await updateDocente(authTokens, row.id, dataToSend);
      } else {
        await createDocente(authTokens, dataToSend);
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
      getDocentes(authTokens);
    }
  };

  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row ? "Actualizar" : "Crear"} Docente
          {row ? `: ${row.username}` : ""}
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
    <div className="flex flex-col items-center justify-between h-full bg-gray-300 p-5 rounded-md ">
      <TitleForm />

      {/* Form data */}
      <div className="grid grid-cols-2 gap-10">
        {/* dni */}
        <InputGroup
          id="dni"
          type="number"
          label="DNI"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />
        {/* lastname */}
        <InputGroup
          id="lastname"
          type="text"
          label="Apellido"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />

        {/* name */}
        <InputGroup
          id="name"
          type="text"
          label="Nombre"
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
