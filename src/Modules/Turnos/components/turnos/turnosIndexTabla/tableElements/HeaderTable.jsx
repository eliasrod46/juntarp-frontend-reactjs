import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { CustomSelect } from "@/components/CustomSelect";

export const HeaderTable = ({
  searchFilterChangeHandler,
  handleOpenShowModal,
  yearFilterChangeHandler,
  year,
  ciclos,
}) => {
  return (
    <div className="">
      {/* year */}
      <div>
        <CustomSelect
          title="Ciclo"
          id="inscription_type"
          value={year}
          selectItemId="id"
          selectItemName="name"
          itemsList={ciclos}
          handleChange={yearFilterChangeHandler}
        />
      </div>
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
    </div>
  );
};
