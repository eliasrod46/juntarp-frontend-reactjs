//modal
import { Box, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { style } from "./StyleModals";

export const GeneralModal = ({
  children,
  row,
  showModalFlag,
  handleCloseShowModal,
  toDelete = false,
  title = undefined,
}) => {
  // ============================================> modal parts
  const TitleModal = () => {
    return (
      <h2 className="text-center text-4xl font-bold text-slate-400">
        {title ? title : toDelete ? "Eliminar" : row ? "Actualizar" : "Crear"}
      </h2>
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
        <div className="flex flex-col items-center justify-between  h-full">
          {/* title */}
          <TitleModal />
          <div className="w-11/12 overflow-auto">{children}</div>
          {/* buttons */}
          <ButtonsModal />
        </div>
      </Box>
    </Modal>
  );
};
