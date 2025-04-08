import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AuthContext from "@/Modules/Auth/context/AuthContext";

export const HeaderTable = ({
  searchFilterChangeHandler,
  generalDetailsChangeHandler,
  tab,
  movementFoldersHandler,
  generalDetails,
  // handleOpenShowModal,
}) => {
  const { can } = useContext(AuthContext);
  const [hasSuperAdminArchivoAccess, setHasSuperAdminArchivoAccess] =
    useState(false);

  useEffect(() => {
    const checkSuperAdminArchivoAccess = async () => {
      const result = await can(["Super Admin", "Archivo"]);
      setHasSuperAdminArchivoAccess(result);
    };

    checkSuperAdminArchivoAccess();
  }, [can]);
  return (
    <div className="">
      <div className="flex items-center justify-around gap-x-5">
        {/* search */}
        <div className="my-5">
          <TextField
            id="outlined-basic"
            label="Buscar: "
            variant="outlined"
            onChange={searchFilterChangeHandler}
            size="small"
          />
        </div>
        {/* new */}
        <div className="my-5">
          <Button onClick={() => handleOpenShowModal()} variant="outlined">
            +
          </Button>
        </div>
        {/* general details */}
        {hasSuperAdminArchivoAccess ? (
          <div className="my-5 flex flex-col items-center justify-center gap-y-1">
            <div className="flex gap-x-5">
              {(tab === 3 || tab === 4) && (
                <Button
                  onClick={() => movementFoldersHandler("income")}
                  variant="outlined"
                >
                  Entrada
                </Button>
              )}
              {(tab === 2 || tab === 4) && (
                <Button
                  onClick={() => movementFoldersHandler("outcome")}
                  variant="outlined"
                >
                  Salida
                </Button>
              )}
            </div>
            <div className="h-auto w-48">
              <FormControl className="w-full">
                <InputLabel id="demo-simple-select-label">
                  Detalles General
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={generalDetails}
                  onChange={generalDetailsChangeHandler}
                >
                  <MenuItem value={""}>Sin Detalle</MenuItem>
                  <MenuItem value={"Ingreso Masivo"}>Ingreso Masivo</MenuItem>
                  <MenuItem value={"Salida Masiva"}>Salida Masiva</MenuItem>
                  <MenuItem value={"Ingreso Cristina"}>
                    Ingreso Cristina
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
