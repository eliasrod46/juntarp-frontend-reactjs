//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AcctionRow, HeaderTable, AlertTable } from "./tableElements";
import { TurnosContext } from "@/Modules/Turnos/context";
import { CiclosContext } from "@/Modules/Ciclos/context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ShowTurnoModal, DeleteTurnoModal } from "@/Modules/Turnos/components";
import { use } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);

export const TurnosIndexTable = () => {
  //context
  const {
    elements: turnos,
    getTurnos,
    errors,
    clearErrors,
    loading,
  } = useContext(TurnosContext);

  //context
  const { elements: ciclos, getCiclos } = useContext(CiclosContext);
  //dataTable
  const [staticRows, setStaticRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState(null);
  const [year, setYear] = useState();

  //modals
  const [showModalFlag, setShowModalFlag] = useState(false);
  const [deleteModalFlag, setDeleteModalFlag] = useState(false);

  //alerts
  const [showAlertFlag, setShowAlertFlag] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  // get all docentes
  useEffect(() => {
    getTurnos();
    getCiclos();
  }, []);

  useEffect(() => {
    if (ciclos && turnos) {
      let currentCiclo = ciclos.find((ciclo) => ciclo.status == true);
      setYear(currentCiclo.id);
      const filteredRows = turnos.filter((turno) => {
        return turno.ciclo.id == currentCiclo.id;
      });
      setStaticRows(filteredRows);
      setRows(filteredRows);
    }
  }, [turnos, ciclos]);

  // update rows state(when ciclos change)

  // ============================================> Datatable
  // collums
  const columns = [
    {
      name: "Fecha",
      selector: (row) => dayjs(row.date, "YYYY-MM-DD").format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Hora",
      selector: (row) =>
        dayjs(row.time).tz("America/Argentina/Buenos_Aires").format("HH:mm"),
      sortable: true,
    },
    {
      name: "Ciclo",
      selector: (row) => row.ciclo.name,
      sortable: true,
    },
    {
      name: "Tipo de inscripcion",
      selector: (row) => {
        return row.inscription_type;
      },
      sortable: true,
    },

    {
      name: "Asignado",
      selector: (row) => {
        if (row.docente) {
          return row.docente.dni;
        } else {
          return "No asignado";
        }
      },
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
    getTurnos();
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
  const yearFilterChangeHandler = (e) => {
    const cicloID = e.target.value;
    let newCiclo = ciclos.find((ciclo) => ciclo.id == cicloID);
    setYear(newCiclo.id);
    const dataToFilter = turnos;
    const filteredRows = dataToFilter.filter(
      (turno) => turno.ciclo.id === cicloID
    );
    setStaticRows(filteredRows);
    setRows(filteredRows);
  };

  const searchFilterChangeHandler = (e) => {
    const word = e.target.value;
    const dataToFilter = staticRows;
    const filteredRows = dataToFilter.filter(
      (turno) =>
        turno.date.toLowerCase().includes(word.toLowerCase()) ||
        turno.time.toLowerCase().includes(word.toLowerCase()) ||
        turno.inscription_type.toLowerCase().includes(word.toLowerCase()) ||
        turno.docente.dni.toLowerCase().includes(word.toLowerCase())
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
            yearFilterChangeHandler={yearFilterChangeHandler}
            handleOpenShowModal={handleOpenShowModal}
            year={year}
            ciclos={ciclos}
          />
          {/* datatable */}
          <div className="rounded-t-xl">
            <DataTable columns={columns} data={rows} pagination />
          </div>

          {/* modals */}
          <ShowTurnoModal
            row={row}
            showModalFlag={showModalFlag}
            handleCloseShowModal={handleCloseShowModal}
            setSeverity={setSeverity}
            setAlertMessage={setAlertMessage}
            setShowAlertFlag={setShowAlertFlag}
          />
          <DeleteTurnoModal
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
