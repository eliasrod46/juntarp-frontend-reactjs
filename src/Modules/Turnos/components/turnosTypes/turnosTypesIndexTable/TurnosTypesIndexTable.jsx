//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AcctionRow, HeaderTable, AlertTable } from "./tableElements";
import { TurnosTypesContext } from "@/Modules/Turnos/context";
import {
  ShowTurnoTypeModal,
  DeleteTurnoTypeModal,
} from "@/Modules/Turnos/components";

export const TurnosTypesIndexTable = () => {
  //context
  const { elements, getTurnosTypes, errors, clearErrors, loading } =
    useContext(TurnosTypesContext);
  //dataTable
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState(null);

  //modals
  const [showModalFlag, setShowModalFlag] = useState(false);
  const [deleteModalFlag, setDeleteModalFlag] = useState(false);

  //alerts
  const [showAlertFlag, setShowAlertFlag] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  // get all docentes
  useEffect(() => {
    getTurnosTypes();
  }, []);

  // update rows state(when ciclos change)
  useEffect(() => {
    setRows(elements);
  }, [elements]);

  // ============================================> Datatable
  // collums

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cantidad x fecha",
      selector: (row) => {
        return row.quantity_dates;
      },
      sortable: true,
    },
    {
      name: "Ciclo",
      selector: (row) => row.ciclo.name,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <AcctionRow
          row={row}
          handleOpenShowModal={handleOpenShowModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
        />
      ),
      ignoreRowClick: true,
    },
  ];

  // ============================================> modals handlers

  // showModal
  const handleOpenShowModal = (row = null) => {
    setShowModalFlag(true);
    setRow(row);
  };

  const handleCloseShowModal = (clickClose = false) => {
    setShowModalFlag(false);
    clearErrors();
    if (!clickClose) {
      setSeverity("success");
      setAlertMessage(`turno ${row ? "actualizado" : "creado"} con exito`);
      setShowAlertFlag(true);
    }
    setRow(null);
    getTurnosTypes();
  };

  // deleteModal
  const handleOpenDeleteModal = (row) => {
    setDeleteModalFlag(true);
    setRow(row);
  };

  const handleCloseDeleteModal = (clickClose = false) => {
    setDeleteModalFlag(false);
    clearErrors();
    if (!clickClose) {
      setSeverity("success");
      setAlertMessage(`Turno eliminado con exito`);
      setShowAlertFlag(true);
    }
    setRow(null);
  };

  // ============================================> table handlers
  const searchFilterChangeHandler = (e) => {
    const word = e.target.value;
    const dataToFilter = elements;
    const filteredRows = dataToFilter.filter(
      (turnoType) =>
        turnoType.name.toLowerCase().includes(word.toLowerCase()) ||
        Number(turnoType.quantity_dates) == Number(word)
    );

    setRows(filteredRows);
  };

  // ============================================> render
  return (
    <div>
      {loading ? (
        "cargando"
      ) : (
        <div>
          {/* alert seccion */}
          <AlertTable
            severity={severity}
            alertMessage={alertMessage}
            setOpen={setShowAlertFlag}
            open={showAlertFlag}
          />
          {/* header table */}
          <HeaderTable
            searchFilterChangeHandler={searchFilterChangeHandler}
            handleOpenShowModal={handleOpenShowModal}
          />
          {/* datatable */}
          <div className="rounded-t-xl">
            <DataTable columns={columns} data={rows} pagination />
          </div>

          {/* modals */}
          <ShowTurnoTypeModal
            row={row}
            showModalFlag={showModalFlag}
            handleCloseShowModal={handleCloseShowModal}
            setSeverity={setSeverity}
            setAlertMessage={setAlertMessage}
            setShowAlertFlag={setShowAlertFlag}
          />
          <DeleteTurnoTypeModal
            row={row}
            deleteModalFlag={deleteModalFlag}
            handleCloseDeleteModal={handleCloseDeleteModal}
            setSeverity={setSeverity}
            setAlertMessage={setAlertMessage}
            setShowAlertFlag={setShowAlertFlag}
          />
        </div>
      )}
    </div>
  );
};
