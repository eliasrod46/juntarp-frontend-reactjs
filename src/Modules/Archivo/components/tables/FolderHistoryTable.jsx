//modal
import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";

export const FolderHistoryTable = ({ row }) => {
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
      name: "Estado",
      selector: (row) => {
        return row.state;
      },
    },
    {
      name: "Ubicacion",
      selector: (row) => {
        return row.location;
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
      const history = row.history;
      // order array newest first
      history.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      serHistory(history);
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

  return (
    <div className="">
      {/* title */}
      <TitleModal className="w-full" />
      {/* body */}
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
    </div>
  );
};
