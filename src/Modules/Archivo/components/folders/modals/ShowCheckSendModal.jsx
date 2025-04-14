//modal
import React, { useEffect, useState, useContext } from "react";
import { Box, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { CustomSelect } from "@/components/CustomSelect";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TurnosContext, TurnosTypesContext } from "@/Modules/Turnos/context";
import { CiclosContext } from "@/Modules/Ciclos/context";
import { DocentesContext } from "@/Modules/Docentes/context";
import { InputErrors } from "@/Modules/Docentes/components";
import { style } from "./StyleModals";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";

export const ShowCheckSendModal = ({
  open, // Esta prop contiene el estado de visibilidad
  bulksRows,
  handleCloseCheckSendModal,
  action,
}) => {
  // structures

  // ============================================> modal parts
  const TitleModal = () => {
    return (
      <div className="my-5 ">
        <h2 className="text-center text-7xl font-bold text-gray-800">
          Confrimar movimiento
        </h2>

        <p className="text-4xl w-10/12 mx-auto text-center font-bold">
          Va a {action == "income" ? "ingresar" : "sacar"} las carpetas de los
          siguientes docentes {action == "income" ? "al" : "del"} archivo
        </p>
      </div>
    );
  };

  const ButtonsModal = () => {
    return (
      <div className="flex gap-x-36">
        <div className="mt-10">
          <Button
            onClick={() => handleCloseCheckSendModal(true)}
            variant="contained"
            color="error"
          >
            Cerrar
          </Button>
        </div>

        <div className="mt-10">
          <Button
            onClick={() => handleCloseCheckSendModal()}
            variant="contained"
            color="success"
          >
            Mover
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      // onClose={handleCloseCheckSendModal} // close on click out of modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col items-center justify-between h-full">
          {/* title */}
          <TitleModal className="w-full" />
          {/* body */}
          {/* <BodyModal /> */}

          <div className="-mt-36">
            <div>
              {bulksRows.map((element) => (
                <ul key={element.id}>
                  <li className="text-2xl">
                    * Docente: {element.docente.lastname},{" "}
                    {element.docente.name}. DNI {element.docente.dni}
                  </li>
                </ul>
              ))}
            </div>
          </div>
          {/* buttons */}
          <ButtonsModal />
        </div>
      </Box>
    </Modal>
  );
};
