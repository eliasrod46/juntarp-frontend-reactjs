import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { CanAccess } from "@/Modules/Auth/pages/CanAccess";

export const HeaderTable = ({
  searchFilterChangeHandler,
  generalDetailsChangeHandler,
  tab,
  movedFolders,
  totalFolders,
  handleOpenCheckSendModal,
  generalDetails,
  handleCreateFolders,
}) => {
  const { can } = useContext(AuthContext);
  const [fileFolderMovements, setFileFolderMovements] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      setFileFolderMovements(await can(["file/folder/movements"]));
    };

    checkPermissions();
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
        {/* folders qty data */}
        <div className="my-5">
          {tab === 2 && (
            <div>
              <h1>Carpetas en archivo: {totalFolders}</h1>
              <h1>Carpetas ingresadas hoy: {movedFolders}</h1>
            </div>
          )}
          {tab === 3 && (
            <div>
              <h1>Carpetas fuera del archivo: {totalFolders}</h1>
              <h1>Carpetas que salieron hoy: {movedFolders}</h1>
            </div>
          )}
        </div>

        {/* general details */}
        <CanAccess permissions={[fileFolderMovements]}>
          <div className="my-5 flex items-center justify-center gap-x-3">
            <div className="flex gap-x-5">
              {tab === 1 && (
                <Button
                  onClick={() => handleOpenCheckSendModal("income")}
                  variant="outlined"
                >
                  Entrada
                </Button>
              )}
              {tab === 1 && (
                <Button
                  onClick={() => handleOpenCheckSendModal("outcome")}
                  variant="outlined"
                >
                  Salida
                </Button>
              )}
            </div>
            <div className="h-auto w-48">
              <FormControl className="w-full">
                <div className="mb-3">
                  <InputLabel id="demo-simple-select-label">
                    Detalles General
                  </InputLabel>
                </div>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={generalDetails}
                  onChange={generalDetailsChangeHandler}
                >
                  <MenuItem value={""}>Sin Detalle</MenuItem>
                  <MenuItem value={"Ingreso Masivo"}>Ingreso Masivo</MenuItem>
                  <MenuItem value={"Salida Masiva"}>Salida Masiva</MenuItem>
                </Select>
              </FormControl>
              <div className="mt-3">
                <FormControl className="w-full mt-5">
                  <TextField
                    label="Detalle Personalizado" // Label para el TextField
                    variant="outlined" // O "filled", "standard"
                    value={generalDetails} // O una nueva variable de estado
                    onChange={generalDetailsChangeHandler} // O una nueva función de handler
                    size="small"
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </CanAccess>

        {/* general details */}
      </div>
    </div>
  );
};
