//modal
import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { AlertBox, InputGroup } from "@/components";
import { UsersContext } from "@/Modules/Users/context";

export const FormChangePassword = () => {
  // structure dataForm
  const dataFormBase = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // contexts
  //context
  const { changePasssword, validationErrors } = useContext(UsersContext);
  const { authTokens, authUser } = useContext(AuthContext);

  // states
  const [dataForm, setDataForm] = useState(dataFormBase);

  //alerts
  const [showAlertFlag, setShowAlertFlag] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

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
        oldPassword: dataForm.oldPassword,
        newPassword: dataForm.newPassword,
        confirmPassword: dataForm.confirmPassword,
      };

      await changePasssword(authTokens, authUser.id, dataToSend);

      setSeverity("success");
      setAlertMessage(`Password actualizado con exito`);
      setShowAlertFlag(true);

      setDataForm(dataFormBase)
    } catch (error) {
      setSeverity("error");
      setShowAlertFlag(true);
      if (error && error.message) {
        setAlertMessage(`${error.message}`);
      } else {
        setAlertMessage("Ocurrio un error.");
      }
    }
  };

  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Cambiar password
        </h2>
      </div>
    );
  };

  const ButtonsForm = () => {
    return (
      <div className="mt-10">
        <Button onClick={handleStoreData} variant="contained" color="success">
          Actualizar
        </Button>
      </div>
    );
  };

  return (
    <div className="mt-5 flex flex-col items-center justify-between h-full bg-gray-300 p-5 rounded-md w-5/6 m-auto">
      <TitleForm />
      {/* alert seccion */}
      <AlertBox
        severity={severity}
        alertMessage={alertMessage}
        setOpen={setShowAlertFlag}
        open={showAlertFlag}
      />
      {/* Form data */}
      <div className="grid grid-cols-3 gap-10">
        {/* oldPassword */}
        <InputGroup
          id="oldPassword"
          type="text"
          label="Password actual"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />
        {/* newPassword */}
        <InputGroup
          id="newPassword"
          type="text"
          label="Nuevo password"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />
        {/* confirmPassword */}
        <InputGroup
          id="confirmPassword"
          type="text"
          label="Configrmar password"
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
