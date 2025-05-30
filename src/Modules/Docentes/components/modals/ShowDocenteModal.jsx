//modal
import React, { useEffect, useState, useContext } from "react";
import { Box, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DocentesContext } from "@/Modules/Docentes/context";
import { InputErrors } from "@/Modules/Docentes/components";
import { style } from "./StyleModals";
import { GeneralAlert, InputError } from "@/components";
import AuthContext from "@/Modules/Auth/context/AuthContext";

export const ShowDocenteModal = ({
  row,
  showModalFlag,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // structure dataForm
  const dataFormBase = {
    name: "",
    lastname: "",
    dni: "",
  };

  const {
    getDocentes,
    updateDocente,
    createDocente,
    validationErrors,
    generalError,
  } = useContext(DocentesContext);

  const { authTokens } = useContext(AuthContext);

  const [dataForm, setDataForm] = useState(dataFormBase);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        name: row.name ? row.name : "",
        lastname: row.lastname ? row.lastname : "",
        dni: row.dni ? row.dni : "",
      };
      setDataForm(dataFormRecived);
    } else {
      setDataForm(dataFormBase);
    }
  }, [row]);

  // ============================================> modal hadlers
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
        name: dataForm.name,
        lastname: dataForm.lastname,
        dni: dataForm.dni,
      };

      if (row) {
        await updateDocente(authTokens, row.id, dataToSend);
      } else {
        await createDocente(authTokens, dataToSend);
      }

      handleCloseShowModal();
    } catch (error) {
      if (error && error.message) {
        setSeverity("error");
        setAlertMessage(`${error.message}`);
        setShowAlertFlag(true);
      }
    } finally {
      getDocentes(authTokens);
    }
  };

  // ============================================> modal parts
  const TitleModal = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row ? "Ver" : "Crear"} Docente {row ? `: ${row.fullName}` : ""}
        </h2>
      </div>
    );
  };

  const ButtonsModal = () => {
    return (
      <div className="mt-10">
        <Button
          onClick={() => handleCloseShowModal(true)}
          variant="contained"
          color="error"
        >
          Cerrar
        </Button>
        <Button onClick={handleStoreData} variant="contained" color="success">
          {row ? "Actualizar" : "Crear"}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      open={showModalFlag}
      // onClose={handleCloseShowModal} // close on click out of modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col items-center justify-between h-full">
          {/* title */}
          <TitleModal />
          {/* <BodyModal /> */}
          <div className="grid grid-cols-2 gap-10">
            {/* dni */}
            <div>
              <div>
                <TextField
                  name="dni"
                  type="text"
                  label="dni"
                  variant="filled"
                  size="small"
                  value={dataForm.dni}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputError validationErrors={validationErrors} value="dni" />
              </div>
            </div>

            {/* lastname */}
            <div>
              <div>
                <TextField
                  name="lastname"
                  type="text"
                  label="lastname"
                  variant="standard"
                  size="small"
                  value={dataForm.lastname}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputError
                  validationErrors={validationErrors}
                  value="lastname"
                />
              </div>
            </div>

            {/* name */}
            <div>
              <div>
                <TextField
                  name="name"
                  type="text"
                  label="name"
                  variant="standard"
                  size="small"
                  value={dataForm.name}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputError validationErrors={validationErrors} value="name" />
              </div>
            </div>
          </div>
          {/* buttons */}
          <ButtonsModal />
        </div>
      </Box>
    </Modal>
  );
};
