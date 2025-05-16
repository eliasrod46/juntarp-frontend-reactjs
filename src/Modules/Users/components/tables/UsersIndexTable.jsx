//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AcctionRow, HeaderTable } from "./tableElements";
import { UsersContext } from "@/Modules/Users/context";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { AlertBox, GeneralModal } from "@/components";
import { FormUser, LinkRolesForm } from "../";
import { Alert, Button, Snackbar } from "@mui/material";
import { FormDeleteUser } from "../forms/FormDeleteUser";

export const UsersIndexTable = () => {
  //context
  const { users, getUsers, clearErrors, loading, resetPasssword } =
    useContext(UsersContext);
  const { authTokens } = useContext(AuthContext);
  //dataTable
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState(null);

  // //modals
  const [showModalFlag, setShowModalFlag] = useState(false);
  const [openLinkRolesModalFlag, setOpenLinkRolesModalFlag] = useState(false);
  const [deleteModalFlag, setDeleteModalFlag] = useState(false);

  //alerts
  const [showAlertFlagResetPassword, setShowAlertFlagResetPassword] =
    useState(false);
  const [showAlertFlagTable, setShowAlertFlagTable] = useState(false);
  const [severityTable, setSeverityTable] = useState("success");
  const [alertMessageTable, setAlertMessageTable] = useState("");

  // get all docentes
  useEffect(() => {
    getUsers(authTokens);
  }, []);

  // update rows state(when ciclos change)
  useEffect(() => {
    setRows(users);
  }, [users]);

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
      name: "Usuario",
      selector: (row) => row.username,
      sortable: true,
    },

    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "Roles",

      selector: (row) => {
        const roles = row.roles;
        if (roles == 0) {
          return "sin roles vinculados";
        }
        return (
          <ul>
            {roles.map((role) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
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
          handleOpenLinkRolesModal={handleOpenLinkRolesModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
          handleResetPasswordAlert={handleResetPasswordAlert}
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

  // link roles modal
  const handleOpenLinkRolesModal = (row) => {
    setOpenLinkRolesModalFlag(true);
    setRow(row);
  };

  const handleCloseLinkRolesModal = () => {
    setOpenLinkRolesModalFlag(false);
    clearErrors();
    setRow(null);
  };

  // deleteModal

  const handleOpenDeleteModal = (row) => {
    setDeleteModalFlag(true);
    setRow(row);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalFlag(false);
    clearErrors();
    setRow(null);
  };

  // ============================================> table handlers
  const searchFilterChangeHandler = (e) => {
    const word = e.target.value;
    const dataToFilter = users;
    const filteredRows = dataToFilter.filter(
      (user) =>
        user.lastname.toLowerCase().includes(word.toLowerCase()) ||
        user.dni.toLowerCase().includes(word.toLowerCase()) ||
        user.username.toLowerCase().includes(word.toLowerCase()) ||
        user.name.toLowerCase().includes(word.toLowerCase())
    );

    setRows(filteredRows);
  };

  const handleResetPasswordAlert = (user) => {
    setRow(user);

    setShowAlertFlagResetPassword(true);
  };

  const handleResetPassword = async () => {
    try {
      await resetPasssword(authTokens, row.id);
      setShowAlertFlagResetPassword(false);

      setSeverityTable("success");
      setAlertMessageTable(`Password actualizado con exito`);
      setShowAlertFlagTable(true);
    } catch (error) {
      setSeverityTable("error");
      setShowAlertFlagTable(true);
      if (error && error.message) {
        setAlertMessageTable(`${error.message}`);
      } else {
        setAlertMessageTable("Ocurrio un error.");
      }
    }

    setRow(null);
  };

  // ============================================> Components

  const AlertResetPassswordBox = ({ setOpen, open, handleResetPassword }) => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // key={"top" + "center"}
        open={open}
        // autoHideDuration={duration}
        // onClose={() => setOpen(false)} //close on duration
      >
        <Alert
          severity="error"
          sx={{ width: "100%", py: 2, fontSize: "1.25rem" }}
          onClose={() => setOpen(false)} //close on click
        >
          <div className="flex flex-col gap-y-5">
            <div className="pb-10">
              <h2 className="text-2xl text-center">Resetear Password</h2>
            </div>
            <div className="pb-16">
              <span className="text-cener text-xl">
                {row &&
                  `Vas a resetear el password del usuario: ${row.lastname}, ${row.name}`}
              </span>
              <span className="text-cener text-xl">Estas seguro?</span>
            </div>
            <div className="flex justify-between">
              <Button color="success" onClick={() => handleResetPassword()}>
                Resetear
              </Button>
              <Button color="info" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Alert>
      </Snackbar>
    );
  };
  // ============================================> render
  return (
    <div>
      {loading ? (
        "cargando"
      ) : (
        <div>
          {/* alerts seccion */}
          <AlertBox
            severity={severityTable}
            alertMessage={alertMessageTable}
            setOpen={setShowAlertFlagTable}
            open={showAlertFlagTable}
          />

          <AlertResetPassswordBox
            setOpen={setShowAlertFlagResetPassword}
            open={showAlertFlagResetPassword}
            handleResetPassword={handleResetPassword}
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
            <FormUser
              row={row}
              handleCloseShowModal={handleCloseShowModal}
              setSeverity={setSeverityTable}
              setAlertMessage={setAlertMessageTable}
              setShowAlertFlag={setShowAlertFlagTable}
            />
          </GeneralModal>
          {/* link roles modal */}
          <GeneralModal
            row={row}
            showModalFlag={openLinkRolesModalFlag}
            handleCloseShowModal={handleCloseLinkRolesModal}
            title="Asignar Roles"
          >
            <LinkRolesForm
              row={row}
              handleCloseShowModal={handleCloseLinkRolesModal}
              setSeverity={setSeverityTable}
              setAlertMessage={setAlertMessageTable}
              setShowAlertFlag={setShowAlertFlagTable}
            />
          </GeneralModal>
          {/* delete modal */}
          <GeneralModal
            row={row}
            showModalFlag={deleteModalFlag}
            handleCloseShowModal={handleCloseDeleteModal}
            toDelete={true}
          >
            <FormDeleteUser
              row={row}
              handleCloseShowModal={handleCloseDeleteModal}
              setSeverity={setSeverityTable}
              setAlertMessage={setAlertMessageTable}
              setShowAlertFlag={setShowAlertFlagTable}
            />
          </GeneralModal>
        </div>
      )}
    </div>
  );
};
