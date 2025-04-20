//modal
import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { InputGroup } from "@/components";
import { RolesContext } from "../../context";

export const FormRole = ({
  row,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // structure dataForm
  const dataFormBase = {
    name: "",
  };

  // contexts
  const { getRoles, updateRole, createRole, validationErrors } =
    useContext(RolesContext);
  const { authTokens } = useContext(AuthContext);

  // states
  const [dataForm, setDataForm] = useState(dataFormBase);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        name: row.name ? row.name : "",
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
        name: dataForm.name,
      };

      if (row) {
        await updateRole(authTokens, row.id, dataToSend);
      } else {
        await createRole(authTokens, dataToSend);
      }

      setSeverity("success");
      setAlertMessage(`Rol ${row ? "actualizado" : "creado"} con exito`);
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
      getRoles(authTokens);
    }
  };

  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row ? "Actualizar" : "Crear"} Rol {row ? `: ${row.name}` : ""}
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
