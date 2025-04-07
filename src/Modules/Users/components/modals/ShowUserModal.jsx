//modal
import React, { useEffect, useState, useContext } from "react";
import { Box, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DocentesContext } from "@/Modules/Docentes/context";
import { InputErrors } from "@/Modules/Docentes/components";
import { style } from "./StyleModals";
import { UsersContext } from "../../context";
import AuthContext from "@/Modules/Auth/context/AuthContext";

export const ShowUserModal = ({
  row,
  showModalFlag,
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
    username: "",
    email: "",
  };

  const { getUsers, createUser, errors, updateUser } = useContext(UsersContext);
  const { authTokens } = useContext(AuthContext);
  const [dataForm, setDataForm] = useState(dataFormBase);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        dni: row.dni ? row.dni : "",
        name: row.name ? row.name : "",
        lastname: row.lastname ? row.lastname : "",
        username: row.username ? row.username : "",
        email: row.email ? row.email : "",
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
        dni: dataForm.dni,
        name: dataForm.name,
        lastname: dataForm.lastname,
        username: dataForm.username,
        email: dataForm.email,
      };

      if (row) {
        await updateUser(authTokens, row.id, dataToSend);
      } else {
        await createUser(authTokens, dataToSend);
      }

      handleCloseShowModal();
    } catch (error) {
      // console.log("Errores desde contexto: ", error);
      // Manejar los errores
      setSeverity("error");
      setAlertMessage("Ocurrio un error.");
      setShowAlertFlag(true);
    } finally {
      getUsers(authTokens);
    }
  };

  // ============================================> modal parts
  const TitleModal = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row ? "Actualizar" : "Crear"} Usuario{" "}
          {row ? `: ${row.username}` : ""}
        </h2>
      </div>
    );
  };
  const GeneralErrorsHeader = () => {
    return (
      <div>
        {typeof errors == "string" ? (
          <span className="text-red-500 font-bold text-base">{errors}</span>
        ) : (
          ""
        )}
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
          {/* general errors header */}
          <GeneralErrorsHeader />
          {/* body */}
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
                <InputErrors errors={errors.dni} />
              </div>
            </div>

            {/* lastname */}
            <div>
              <div>
                <TextField
                  name="lastname"
                  type="text"
                  label="apellido"
                  variant="standard"
                  size="small"
                  value={dataForm.lastname}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.lastname} />
              </div>
            </div>

            {/* name */}
            <div>
              <div>
                <TextField
                  name="name"
                  type="text"
                  label="nombre"
                  variant="standard"
                  size="small"
                  value={dataForm.name}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.name} />
              </div>
            </div>

            {/* username */}
            <div>
              <div>
                <TextField
                  name="username"
                  type="text"
                  label="usuario"
                  variant="standard"
                  size="small"
                  value={dataForm.username}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.username} />
              </div>
            </div>

            {/* username */}
            <div>
              <div>
                <TextField
                  name="email"
                  type="email"
                  label="email"
                  variant="standard"
                  size="small"
                  value={dataForm.email}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.email} />
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
