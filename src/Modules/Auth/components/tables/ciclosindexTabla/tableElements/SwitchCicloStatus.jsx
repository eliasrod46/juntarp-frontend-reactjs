import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";

export const SwitchCicloStatus = ({ row, onChangeSwitch }) => {
  return (
    <Switch
      checked={row.status}
      onChange={(event) => onChangeSwitch(row, event.target.checked)}
    />
  );
};
