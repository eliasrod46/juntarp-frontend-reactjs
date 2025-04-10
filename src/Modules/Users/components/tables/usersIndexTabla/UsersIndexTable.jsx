//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AcctionRow, HeaderTable, AlertTable } from "./tableElements";
import {
  DeleteDocenteModal,
  ShowDocenteModal,
} from "@/Modules/Docentes/components";
import { UsersContext } from "@/Modules/Users/context";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { LinkRolesModal, ShowUserModal } from "../..";

export const UsersIndexTable = () => {
  //context
  const { users, getUsers, clearErrors, loading } = useContext(UsersContext);
  const { authTokens } = useContext(AuthContext);
  //dataTable
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState(null);

  // //modals
  const [showModalFlag, setShowModalFlag] = useState(false);
  const [openLinkRolesModalFlag, setOpenLinkRolesModalFlag] = useState(false);

  //alerts
  const [showAlertFlag, setShowAlertFlag] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

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
        />
      ),
      ignoreRowClick: true,
    },
  ];

  // ============================================> modals handlers

  // // showModal
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
  const handleOpenLinkRolesModal = (row) => {
    setOpenLinkRolesModalFlag(true);
    setRow(row);
  };

  const handleCloseLinkRolesModal = (clickClose = false) => {
    setOpenLinkRolesModalFlag(false);
    clearErrors();
    if (!clickClose) {
      setSeverity("success");
      setAlertMessage(`Roles actualizados`);
      setShowAlertFlag(true);
    }
    setRow(null);
  };

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
          <ShowUserModal
            row={row}
            showModalFlag={showModalFlag}
            handleCloseShowModal={handleCloseShowModal}
            setSeverity={setSeverity}
            setAlertMessage={setAlertMessage}
            setShowAlertFlag={setShowAlertFlag}
          />
          <LinkRolesModal
            row={row}
            openLinkRolesModalFlag={openLinkRolesModalFlag}
            handleCloseLinkRolesModal={handleCloseLinkRolesModal}
            setSeverity={setSeverity}
            setAlertMessage={setAlertMessage}
            setShowAlertFlag={setShowAlertFlag}
          />
        </div>
      )}
    </div>
  );
};
