import { useContext, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { TurnosTypesContext } from "@/Modules/Turnos/context";
import { style } from "./StyleModals";

export const DeleteTurnoTypeModal = ({
  row,
  deleteModalFlag,
  handleCloseDeleteModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  const { deleteTurnoType } = useContext(TurnosTypesContext);

  // ============================================> modal hadlers

  //store dataform from inputs
  const handleDeleteData = async () => {
    try {
      if (row) {
        await deleteTurnoType(row.id);
      }
      handleCloseDeleteModal();
    } catch (error) {
      // Manejar los errores
      setSeverity("error");
      setAlertMessage("Ocurrio un error.");
      setShowAlertFlag(true);
      // console.error("Errores desde contexto:", error);
    } finally {
      getDocentes();
    }
  };

  // ============================================> modal parts (nothing after this seccion, only return(render))
  const TitleModal = () => {
    return (
      <div className="m-5">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {`Eliminar Turno: ${row ? row.name : ""}`}
        </h2>
      </div>
    );
  };
  const BodyModal = () => {
    return (
      <div>
        {/* text */}
        <div>
          <p className="text-xl">{`Va a eliminar el turno: ${row.name}`}</p>
          <p className="text-center text-2xl">Esta seguro?</p>
        </div>
      </div>
    );
  };
  const ButtonsModal = () => {
    return (
      <div className="mt-10">
        <Button
          onClick={() => handleCloseDeleteModal(true)}
          variant="contained"
          color="error"
        >
          Cerrar
        </Button>
        <Button onClick={handleDeleteData} variant="contained" color="success">
          Eliminar
        </Button>
      </div>
    );
  };

  // ============================================> render
  return (
    <Modal
      open={deleteModalFlag}
      // onClose={handleCloseDeleteModal} // close on click out of modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col items-center justify-between h-full">
          {/* title */}
          <TitleModal />
          {/* body */}
          <BodyModal />
          {/* buttons */}
          <ButtonsModal />
        </div>
      </Box>
    </Modal>
  );
};
