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

export const ShowFolderHistoryModal = ({
  row,
  open, // Esta prop contiene el estado de visibilidad
  handleCloseShowModal,
}) => {
  // structures
  const [history, serHistory] = useState([]);
  const columns = [
    {
      name: "situacion",
      selector: (row) => {
        if (!row.income_date && !row.outcome_date) {
          return "Sin estado";
        } else if (row.income_date && !row.outcome_date) {
          return "En archivo";
        } else if (!row.income_date && row.outcome_date) {
          return "Fuera de archivo";
        }
      },
    },
    {
      name: "fecha de ingreso",
      selector: (row) => {
        if (!row.income_date) {
          return "-";
        } else {
          return dayjs(row.income_date).format("DD/MM/YYYY");
        }
      },
    },
    {
      name: "fecha de salida",
      selector: (row) => {
        if (!row.outcome_date) {
          return "-";
        } else {
          return dayjs(row.outcome_date).format("DD/MM/YYYY");
        }
      },
    },

    {
      name: "Detalles",
      selector: (row) => {
        return row.details;
      },
    },

    {
      name: "Observaciones",
      selector: (row) => {
        return row.observations;
      },
    },
    {
      name: "Usuario",
      selector: (row) => {
        return `${row.user.lastname}, ${row.user.name}`;
      },
    },
  ];
  useEffect(() => {
    if (row) {
      serHistory(row.history);
    }
  }, [row]);

  // ============================================> modal parts
  const TitleModal = () => {
    return (
      <div className="my-5 ">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Ver historial
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
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseShowModal} // close on click out of modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col items-center justify-between h-full">
          {/* title */}
          <TitleModal className="w-full" />
          {/* body */}
          {/* <BodyModal /> */}
          <div className="w-full">
            {/* datatable */}
            <div className="rounded-t-xl">
              <DataTable
                className="w-11/12"
                columns={columns}
                data={history}
                pagination
              />
            </div>
          </div>
          {/* buttons */}
          <ButtonsModal />
        </div>
      </Box>
    </Modal>
  );
};
