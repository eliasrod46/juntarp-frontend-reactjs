//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AcctionRow, HeaderTable, AlertTable } from "./tableElements";
import { DocentesContext } from "@/Modules/Docentes/context";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { GeneralModal } from "@/components";
import { FormDeleteDocente } from "../../forms/FormDeleteDocente";
import { FormDocente } from "../../forms/FormDocente";

export const DocentesIndexTable = () => {
  //context
  const { docentes, getDocentes, clearErrors, loading } =
    useContext(DocentesContext);

  const { authTokens } = useContext(AuthContext);
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
    getDocentes(authTokens);
  }, []);

  // update rows state(when ciclos change)
  useEffect(() => {
    setRows(docentes);
  }, [docentes]);

  // ============================================> Datatable
  // collums
  const columns = [
    {
      name: "DNI",
      selector: (row) => row.dni,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
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

  const handleCloseShowModal = () => {
    setShowModalFlag(false);
    clearErrors();
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
    const dataToFilter = docentes;
    const filteredRows = dataToFilter.filter(
      (docente) =>
        docente.lastname.toLowerCase().includes(word.toLowerCase()) ||
        docente.dni.toLowerCase().includes(word.toLowerCase()) ||
        docente.name.toLowerCase().includes(word.toLowerCase())
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

          {/* show modal */}
          <GeneralModal
            row={row}
            showModalFlag={showModalFlag}
            handleCloseShowModal={handleCloseShowModal}
          >
            <FormDocente
              row={row}
              handleCloseShowModal={handleCloseShowModal}
              setSeverity={setSeverity}
              setAlertMessage={setAlertMessage}
              setShowAlertFlag={setShowAlertFlag}
            />
          </GeneralModal>

          <GeneralModal
            row={row}
            showModalFlag={deleteModalFlag}
            handleCloseShowModal={handleCloseDeleteModal}
            toDelete={true}
          >
            <FormDeleteDocente
              row={row}
              handleCloseShowModal={handleCloseDeleteModal}
              setSeverity={setSeverity}
              setAlertMessage={setAlertMessage}
              setShowAlertFlag={setShowAlertFlag}
            />
          </GeneralModal>
        </div>
      )}
    </div>
  );
};
