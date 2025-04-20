import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export const HeaderTable = ({
  searchFilterChangeHandler,
  handleOpenShowModal,
}) => {
  return (
    <div className="flex items-center justify-center gap-x-5">
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
    </div>
  );
};
