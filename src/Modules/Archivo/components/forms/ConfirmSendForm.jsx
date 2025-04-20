//modal
import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const ConfirmSendForm = ({
  handleCloseShowModal,
  bulksRows,
  action,
}) => {
  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="my-5 ">
      

        <p className="text-xl w-10/12 mx-auto text-center font-bold">
          Va a {action == "income" ? "ingresar" : "sacar"} las carpetas (
          {bulksRows.length}) de los siguientes docentes{" "}
          {action == "income" ? "al" : "del"} archivo
        </p>
      </div>
    );
  };

  const ButtonsForm = () => {
    return (
      <div className="mt-10">
        <Button
          onClick={() => handleCloseShowModal()}
          variant="contained"
          color="success"
        >
          Mover
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between w-1/2 m-auto bg-gray-400 p-5 rounded-md">
      <TitleForm />

      {/* data */}
      <div className="h-auto ">
        <div >
          {bulksRows.map((element, i) => (
            <ul key={element.id}>
              <li className="text-lg">
                *{i+1} Docente: {element.docente.lastname}, {element.docente.name}.
                DNI {element.docente.dni}
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* buttons */}
      <ButtonsForm />
    </div>
  );
};
