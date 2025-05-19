//componente (tabla)
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AcctionRow, HeaderTable, AlertTable } from "./tableElements";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import {
//   ShowCheckSendModal,
//   ShowFolderHistoryModal,
// } from "@/Modules/Archivo/components";
import { DetailsRow } from "./RowElements/DetailsRow";
import { TextField } from "@mui/material";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { GeneralModal } from "@/components";
import { FoldersContext } from "@/Modules/Archivo/context";
import { EditButton } from "./RowElements/EditButton";
import { FolderHistoryTable } from "../../tables/FolderHistoryTable";
import { ConfirmSendForm } from "../../forms/ConfirmSendForm";
import { FormFolder } from "../../forms/FormFolder";
dayjs.extend(utc);
dayjs.extend(timezone);

export const FoldersIndexTable = ({ tab }) => {
  //states
  const [movedFolders, setMovedFolders] = useState();
  const [totalFolders, setTotalFolders] = useState();
  //context
  const {
    folders,
    getFoldersIngreso,
    errors,
    clearErrors,
    loading,
    updateFolder,
  } = useContext(FoldersContext);
  const { authTokens } = useContext(AuthContext);

  //dataTable
  const [bulksRows, setBulksRows] = useState([]);
  const [action, setAction] = useState(null);
  const [rows, setRows] = useState([]);
  const [staticRows, setStaticRows] = useState([]);
  const [row, setRow] = useState(null);
  const [generalDetails, setGeneralDetails] = useState("");
  const [rowDetails, setRowDetails] = useState({});
  const [rowObservations, setRowObservations] = useState({});

  //modals
  const [showFolderModalFlag, setShowFolderModalFlag] = useState(false);
  const [showHistoryModalFlag, setShowHistoryModalFlag] = useState(false);
  const [showShowCheckSendModalFlag, setShowShowCheckSendModalFlag] =
    useState(false);

  //alerts
  const [showAlertFlag, setShowAlertFlag] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  // get all folders
  useEffect(() => {
    getFoldersIngreso(authTokens);
  }, []);

  useEffect(() => {
    if (tab && folders) {
      const currentDate = new Date().toISOString().slice(0, 10);

      //all folders
      if (tab === 1) {
        setRows(folders);
        setStaticRows(folders);
      }

      //folders in file
      if (tab === 2) {
        const folderWithIncomeDate = folders.filter(
          (objeto) => objeto.income_date === currentDate
        );

        const filteredFolders = folders.filter(function (folder) {
          return folder.income_date !== null && folder.outcome_date === null;
        });
        setRows(filteredFolders);
        setStaticRows(filteredFolders);
        setMovedFolders(folderWithIncomeDate.length);
        setTotalFolders(filteredFolders.length);
      }

      //folders out file
      if (tab === 3) {
        const folderWithOutcomeDate = folders.filter(
          (objeto) => objeto.income_date === currentDate
        );

        const filteredFolders = folders.filter(function (folder) {
          return folder.income_date === null && folder.outcome_date !== null;
        });
        setRows(filteredFolders);
        setStaticRows(filteredFolders);
        setMovedFolders(folderWithOutcomeDate.length);
        setTotalFolders(filteredFolders.length);
      }
    }
  }, [folders]);

  // update rows state(when ciclos change)

  // ============================================> Datatable
  // collums
  const columns = [
    {
      name: "Dni",
      selector: (row) => {
        return row.docente.dni;
      },
      sortable: true,
    },
    {
      name: "Docente",
      selector: (row) => {
        if (row.docente) {
          return row.docente.lastname + " - " + row.docente.name;
        }
      },
      sortable: true,
    },

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
      cell: (row) => (
        <>
          {tab == 1 ? (
            <TextField
              id={`details-${row.id}`}
              label="Detalles"
              variant="outlined"
              value={rowDetails[row.id] || ""}
              onChange={(e) => {
                const newDetails = {
                  ...rowDetails,
                  [row.id]: e.target.value,
                };
                setRowDetails(newDetails);
              }}
              size="small"
            />
          ) : (
            <span>{row.details}</span>
          )}
        </>
      ),
      ignoreRowClick: true,
    },
    {
      name: "Observaciones",
      cell: (row) => (
        <>
          {tab == 1 ? (
            <TextField
              id={`details-${row.id}`}
              label="Observaciones"
              variant="outlined"
              value={rowObservations[row.id] || ""}
              onChange={(e) => {
                const newObservations = {
                  ...rowObservations,
                  [row.id]: e.target.value,
                };
                setRowObservations(newObservations);
              }}
              size="small"
            />
          ) : (
            <span>{row.observations}</span>
          )}
        </>
      ),
      ignoreRowClick: true,
    },
    {
      name: "Ver historial",
      cell: (row) => (
        <AcctionRow
          row={row}
          handleOpenShowHistoryModal={handleOpenShowHistoryModal}
        />
      ),
      ignoreRowClick: true,
    },
    {
      name: "Editar",
      cell: (row) => (
        <EditButton
          row={row}
          handleOpenShowFolderModal={handleOpenShowFolderModal}
        />
      ),
      ignoreRowClick: true,
    },
  ];

  // ============================================> modals handlers

  // ShowFolder
  const handleOpenShowFolderModal = (row = null) => {
    setShowFolderModalFlag(true);
    setRow(row);
  };

  const handleCloseShowFolderModal = () => {
    setShowFolderModalFlag(false);
    setRow(null);
  };

  // ShowHistory
  const handleOpenShowHistoryModal = (row = null) => {
    setShowHistoryModalFlag(true);
    setRow(row);
  };

  const handleCloseShowHistoryModal = () => {
    setShowHistoryModalFlag(false);
    setRow(null);
  };

  // CheckSend

  const handleOpenCheckSendModal = (action) => {
    setAction(action);
    setShowShowCheckSendModalFlag(true);
  };

  const handleCloseCheckSendModal = (clickClose = false) => {
    setShowShowCheckSendModalFlag(false);
    setAction(null);

    if (!clickClose) {
      movementFoldersHandler();
    }
  };

  // ============================================> table handlers

  const GeneralErrorsHeader = () => {
    return (
      <div>
        {typeof errors == "string" ? (
          <span className="text-red-500 font-bold text-base">{errors}</span>
        ) : (
          ""
        )}
      </div>
    );
  };

  //update dataform from inputs
  const generalDetailsChangeHandler = (e) => {
    setGeneralDetails(e.target.value);
  };

  const searchFilterChangeHandler = (e) => {
    const word = e.target.value;
    const dataToFilter = staticRows;
    const filteredRows = dataToFilter.filter(
      (folder) =>
        folder.docente.dni.toLowerCase().includes(word.toLowerCase()) || // TODO: change to number
        folder.docente.name.toLowerCase().includes(word.toLowerCase()) ||
        folder.docente.lastname.toLowerCase().includes(word.toLowerCase())
    );

    setRows(filteredRows);
  };

  const movementFoldersHandler = () => {
    try {
      bulksRows.forEach(async (row) => {
        const date = dayjs()
          .tz("America/Argentina/Buenos_Aires")
          .format("YYYY-MM-DD");

        if (
          (row.income_date == null && row.outcome_date == null) ||
          (row.income_date && action === "outcome") ||
          (row.outcome_date && action === "income")
        ) {
          const observation = rowObservations[row.id];
          const details = rowDetails[row.id];
          const dataToSend = {
            details: details ? details : generalDetails ? generalDetails : null,
            observations: observation ? observation : null,
            docenteId: row.docente.id,
            outcome_date: action === "outcome" ? date : null,
            income_date: action === "income" ? date : null,
          };
          await updateFolder(authTokens, row.id, dataToSend);
        }
      });

      getFoldersIngreso(authTokens);

      setSeverity("success");
      setAlertMessage("Carpetas movida con exito.");
      setShowAlertFlag(true);
    } catch (error) {
      // console.log(error);
    }
  };

  // ============================================> render
  return (
    <div>
      {loading ? (
        "cargando"
      ) : (
        <div>
          {/* general errors header */}
          <GeneralErrorsHeader />
          {/* alert seccion */}
          <AlertTable
            severity={severity}
            alertMessage={alertMessage}
            setOpen={setShowAlertFlag}
            showAlertFlag={showAlertFlag}
          />
          {/* header table */}
          <div>
            <HeaderTable
              searchFilterChangeHandler={searchFilterChangeHandler}
              generalDetailsChangeHandler={generalDetailsChangeHandler}
              tab={tab}
              movedFolders={movedFolders}
              totalFolders={totalFolders}
              handleOpenCheckSendModal={handleOpenCheckSendModal}
              generalDetails={generalDetails}
              action={action}
            />
          </div>
          {/* datatable */}
          <div className="rounded-t-xl">
            <DataTable
              columns={columns}
              data={rows}
              pagination
              // {...(tab !== 1 && { selectableRows: true })}
              selectableRows={true}
              onSelectedRowsChange={({ selectedRows }) => {
                setBulksRows(selectedRows);
              }}
            />
          </div>

          {/* modals */}
          {/* showFoler */}
          <GeneralModal
            row={row}
            showModalFlag={showFolderModalFlag}
            handleCloseShowModal={handleCloseShowFolderModal}
          >
            <FormFolder
              row={row}
              handleCloseShowModal={handleCloseShowFolderModal}
              setSeverity={setSeverity}
              setAlertMessage={setAlertMessage}
              setShowAlertFlag={setShowAlertFlag}
            />
          </GeneralModal>
          {/* showHistoryFoler */}
          <GeneralModal
            row={row}
            showModalFlag={showHistoryModalFlag}
            handleCloseShowModal={handleCloseShowHistoryModal}
            title="Historial"
          >
            <FolderHistoryTable row={row} />
          </GeneralModal>

          {/* checksendmodal */}
          <GeneralModal
            row={row}
            showModalFlag={showShowCheckSendModalFlag}
            handleCloseShowModal={handleCloseCheckSendModal}
            title="Confirma movimiento"
          >
            <ConfirmSendForm
              handleCloseShowModal={handleCloseCheckSendModal}
              bulksRows={bulksRows}
              action={action}
            />
          </GeneralModal>
        </div>
      )}
    </div>
  );
};
