import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect } from "react";

export const CustomSelect = ({
  title,
  id,
  itemsList,
  value,
  selectItemId,
  selectItemName,
  handleChange,
  sercheable = null,
}) => {
  const [staticRows, setStaticRows] = React.useState(itemsList);
  const [rows, setRows] = React.useState(itemsList);

  // useEffect(() => {
  //   setStaticRows(itemsList);
  // }, [itemsList]);

  // useEffect(() => {
  //   if (sercheable) {
  //     const maxItems = 10;
  //     const limitedStaticRows = staticRows.slice(0, maxItems);
  //     setRows(limitedStaticRows);
  //   } else {
  //     setRows(staticRows);
  //   }
  // }, [staticRows]);

  // const searchFilterChangeHandler = (e) => {
  //   const word = e.target.value;
  //   const dataToFilter = staticRows;
  //   const filteredRows = dataToFilter.filter((date) =>
  //     date[selectItemName].toLowerCase().includes(word.toLowerCase())
  //   );

  //   setRows(filteredRows);
  // };

  return (
    <div>
      <InputLabel>{title}</InputLabel>
      <Select
        name={id}
        value={value ? value : "none"} //
        label={title}
        onChange={handleChange}
      >
        {/* {sercheable && (
          <TextField
            id="outlined-basic"
            label="Buscar: "
            variant="outlined"
            onChange={searchFilterChangeHandler}
            size="small"
          />
        )} */}

        <MenuItem value="none">
          <em>{title}</em>
        </MenuItem>
        {rows.map((row) => {
          return (
            <MenuItem key={row[selectItemId]} value={row[selectItemId]}>
              <em>{row[selectItemName]}</em>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};
