//modal
import React, { useEffect, useState, useContext } from "react";
import { Box, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CiclosContext } from "@/Modules/Ciclos/context";
import { InputErrors } from "@/Modules/Ciclos/components";
import { style } from "../StyleModals";
import { RolesContext } from "@/Modules/ConfigModule/context";
import AuthContext from "@/Modules/Auth/context/AuthContext";

export const ShowRolModal = ({
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
  };

  const { getRoles, updateRole, createRole, errors } = useContext(RolesContext);
  const { authTokens } = useContext(AuthContext);
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

  // ============================================> modal hadlers
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

      handleCloseShowModal();
    } catch (error) {
      console.log("Errores desde contexto: ", error);
      // Manejar los errores
      setSeverity("error");
      setAlertMessage("Ocurrio un error.");
      setShowAlertFlag(true);
    } finally {
      getRoles(authTokens);
    }
  };

  // ============================================> modal parts
  const TitleModal = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row ? "Ver" : "Crear"} Rol {row ? `: ${row.name}` : ""}
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
          <div className="grid grid-cols-2 gap-10">
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
                <InputErrors errors={errors.name} />
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
