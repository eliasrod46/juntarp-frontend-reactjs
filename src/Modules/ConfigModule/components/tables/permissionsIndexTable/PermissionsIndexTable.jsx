//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AcctionRow, HeaderTable, AlertTable } from "./tableElements";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { AlertBox, GeneralModal } from "@/components";
import { FormRole } from "../../forms/FormRole";
import { PermissionsContext } from "@/Modules/ConfigModule/context/PermissionsContext";
import { FormPermission } from "../../forms/FormPermission";

export const PermissionsIndexTable = () => {
  //context
  const { permissions, getPermissions, clearErrors, loading, errors } =
    useContext(PermissionsContext);
  const { authTokens } = useContext(AuthContext);
  //dataTable
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState(null);

  // //modals
  const [showRoleModalFlag, setShowRoleModalFlag] = useState(false);
  // const [deleteModalFlag, setDeleteModalFlag] = useState(false);

  //alerts
  const [showAlertFlagTable, setShowAlertFlagTable] = useState(false);
  const [severityTable, setSeverityTable] = useState("success");
  const [alertMessageTable, setAlertMessageTable] = useState("");

  // get all docentes
  useEffect(() => {
    getPermissions(authTokens);
  }, []);

  // update rows state(when ciclos change)
  useEffect(() => {
    setRows(permissions);
  }, [permissions]);

  // ============================================> Datatable
  // collums
  const columns = [
    {
      name: "nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "grupo",
      selector: (row) => row.group,
      sortable: true,
    },
    {
      name: "permiso",
      selector: (row) => row.route,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <AcctionRow
          row={row}
          handleOpenShowModal={handleOpenShowRoleModal}
          // handleOpenDeleteModal={handleOpenDeleteModal}
        />
      ),
      ignoreRowClick: true,
    },
  ];

  // ============================================> modals handlers

  // showModal
  const handleOpenShowRoleModal = (row = null) => {
    setShowRoleModalFlag(true);
    setRow(row);
  };

  const handleCloseShowRoleModal = (clickClose = false) => {
    setShowRoleModalFlag(false);
    clearErrors();
    if (!clickClose) {
      setSeverityTable("success");
      setAlertMessageTable(`Rol ${row ? "actualizado" : "creado"} con exito`);
      setShowAlertFlagTable(true);
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
          {/* alert seccion */}
          <AlertBox
            severity={severityTable}
            alertMessage={alertMessageTable}
            setOpen={setShowAlertFlagTable}
            open={showAlertFlagTable}
          />
          {/* header table */}
          <HeaderTable
            searchFilterChangeHandler={searchFilterChangeHandler}
            handleOpenShowModal={handleOpenShowRoleModal}
          />
          {/* datatable */}
          <div className="rounded-t-xl">
            <DataTable columns={columns} data={rows} pagination />
          </div>

          {/* modals */}
          {/* show modal */}
          <GeneralModal
            row={row}
            showModalFlag={showRoleModalFlag}
            handleCloseShowModal={handleCloseShowRoleModal}
          >
            <FormPermission
              row={row}
              handleCloseShowModal={handleCloseShowRoleModal}
              setSeverity={setSeverityTable}
              setAlertMessage={setAlertMessageTable}
              setShowAlertFlag={setShowAlertFlagTable}
            />
          </GeneralModal>

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
