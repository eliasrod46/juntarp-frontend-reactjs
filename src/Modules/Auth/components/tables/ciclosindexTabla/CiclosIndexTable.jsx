//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  AcctionRow,
  HeaderTable,
  AlertTable,
  SwitchCicloStatus,
} from "./tableElements";
import { CiclosContext } from "@/Modules/Ciclos/context";
import { ShowCicloModal } from "@/Modules/Ciclos/components";
import dayjs from "dayjs";

export const CiclosIndexTable = () => {
  //context
  const { elements, getCiclos, updateCiclo, clearErrors, loading } =
    useContext(CiclosContext);
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
    getCiclos();
  }, []);

  // update rows state(when ciclos change)
  useEffect(() => {
    setRows(elements);
  }, [elements]);

  // ============================================> Datatable
  // collums
  const columns = [
    {
      name: "nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Año",
      selector: (row) => row.year,
      sortable: true,
    },

    {
      name: "Fecha de inicio",
      selector: (row) =>
        dayjs(row.start_date, "YYYY-MM-DD").format("DD-MM-YYYY"),
      sortable: true,
    },

    {
      name: "Fecha de finalizacion",
      selector: (row) => dayjs(row.end_date, "YYYY-MM-DD").format("DD-MM-YYYY"),
      sortable: true,
    },

    {
      name: "Detalles",
      selector: (row) => row.details,
      sortable: true,
    },

    {
      name: "Activo",
      selector: (row) => {
        return (
          <SwitchCicloStatus
            row={row}
            onChangeSwitch={onChangeStatusCicloSwitch}
          />
        );
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
      setAlertMessage(`Ciclo ${row ? "actualizado" : "creado"} con exito`);
      setShowAlertFlag(true);
    }
    setRow(null);
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
      setAlertMessage(`Docente eliminado con exito`);
      setShowAlertFlag(true);
    }
    setRow(null);
  };

  // ============================================> table handlers
  const searchFilterChangeHandler = (e) => {
    const word = e.target.value;
    const dataToFilter = elements;
    const filteredRows = dataToFilter.filter((element) =>
      element.name.toLowerCase().includes(word.toLowerCase())
    );

    setRows(filteredRows);
  };

  // ============================================> Logic function on table

  const onChangeStatusCicloSwitch = async (row, checked) => {
    const dataToUpdate = {
      name: row.name,
      year: row.year,
      details: row.details,
      start_date: row.start_date,
      end_date: row.end_date,
      status: checked,
    };

    if (checked == false) {
      //update ciclo
      await updateCiclo(row.id, dataToUpdate);
    } else {
      //update all ciclos to status = false
      const filtrados = elements.filter((element) => element.status === true);
      filtrados.forEach(async (element) => {
        const dataToSend = {
          name: element.name,
          year: element.year,
          details: element.details,
          start_date: element.start_date,
          end_date: element.end_date,
          status: false,
        };
        await updateCiclo(row.id, dataToSend);
      });

      //update ciclo
      await updateCiclo(row.id, dataToUpdate);
    }

    getCiclos();
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
          <ShowCicloModal
            row={row}
            showModalFlag={showModalFlag}
            handleCloseShowModal={handleCloseShowModal}
            setSeverity={setSeverity}
            setAlertMessage={setAlertMessage}
            setShowAlertFlag={setShowAlertFlag}
          />
          {/* <DeleteDocenteModal
            row={row}
            deleteModalFlag={deleteModalFlag}
            handleCloseDeleteModal={handleCloseDeleteModal}
            setSeverity={setSeverity}
            setAlertMessage={setAlertMessage}
            setShowAlertFlag={setShowAlertFlag}
          /> */}
        </div>
      )}
    </div>
  );
};
