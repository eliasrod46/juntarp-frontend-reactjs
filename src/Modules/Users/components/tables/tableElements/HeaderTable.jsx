import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { CanAccess } from "@/Modules/Auth/pages/CanAccess";

export const HeaderTable = ({
  searchFilterChangeHandler,
  handleOpenShowModal,
}) => {
  const { can } = useContext(AuthContext);
  const [usersCreate, setUsersCreate] = useState(false);

  //set permissions
  useEffect(() => {
    const checkAccess = async () => {
      setUsersCreate(await can(["users/create"]));
    };
    checkAccess();
  }, [can]);
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
      <CanAccess permissions={[usersCreate]}>
        <div className="my-5">
          <Button onClick={() => handleOpenShowModal()} variant="outlined">
            +
          </Button>
        </div>
      </CanAccess>
    </div>
  );
};
