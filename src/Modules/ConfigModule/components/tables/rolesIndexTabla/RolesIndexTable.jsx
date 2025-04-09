//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AcctionRow, HeaderTable, AlertTable } from "./tableElements";
import { CiclosContext } from "@/Modules/Ciclos/context";
import { ShowCicloModal } from "@/Modules/Ciclos/components";
import dayjs from "dayjs";
import { RolesContext } from "@/Modules/ConfigModule/context";
import { ShowRolModal } from "../..";
import AuthContext from "@/Modules/Auth/context/AuthContext";

export const RolesIndexTable = () => {
  //context
  const { roles, getRoles, clearErrors, loading, errors } =
    useContext(RolesContext);
  const { authTokens } = useContext(AuthContext);
  //dataTable
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState(null);

  // //modals
  const [showModalFlag, setShowModalFlag] = useState(false);
  // const [deleteModalFlag, setDeleteModalFlag] = useState(false);

  //alerts
  const [showAlertFlag, setShowAlertFlag] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  // get all docentes
  useEffect(() => {
    getRoles(authTokens);
  }, []);

  // update rows state(when ciclos change)
  useEffect(() => {
    setRows(roles);
  }, [roles]);

  // ============================================> Datatable
  // collums
  const columns = [
    {
      name: "nombre",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Acciones",
      cell: (row) => (
        <AcctionRow
          row={row}
          handleOpenShowModal={handleOpenShowModal}
          // handleOpenDeleteModal={handleOpenDeleteModal}
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

  // // deleteModal
  // const handleOpenDeleteModal = (row) => {
  //   setDeleteModalFlag(true);
  //   setRow(row);
  // };

  // const handleCloseDeleteModal = (clickClose = false) => {
  //   setDeleteModalFlag(false);
  //   clearErrors();
  //   if (!clickClose) {
  //     setSeverity("success");
  //     setAlertMessage(`Docente eliminado con exito`);
  //     setShowAlertFlag(true);
  //   }
  //   setRow(null);
  // };

  // ============================================> table handlers
  const searchFilterChangeHandler = (e) => {
    const word = e.target.value;
    const dataToFilter = roles;
    const filteredRows = dataToFilter.filter((role) =>
      role.name.toLowerCase().includes(word.toLowerCase())
    );

    setRows(filteredRows);
  };

  // ============================================> Logic function on table

  // ============================================> render
  return (
    <div>
      {loading ? (
        "cargando"
      ) : (
        <div>
          {errors}
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
          <ShowRolModal
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
