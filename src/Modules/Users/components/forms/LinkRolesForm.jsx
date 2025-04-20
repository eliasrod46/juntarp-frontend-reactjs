//modal
import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UsersContext } from "../../context";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { AlertBox, InputGroup } from "@/components";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";
import { RolesContext } from "@/Modules/ConfigModule/context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, rolesSelected, theme) {
  return {
    fontWeight: rolesSelected.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export const LinkRolesForm = ({
  row,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // themes
  const theme = useTheme();

  // contexts
  const { authTokens } = useContext(AuthContext);
  const { roles, getRoles } = useContext(RolesContext);
  const { assignRoles, getUsers } = useContext(UsersContext);

  // states
  const [rolesElements, setRolesElements] = useState([]);
  const [rolesSelected, setRolesSelected] = useState([]);

  // use effects
  useEffect(() => {
    getRoles(authTokens);
  }, []);

  useEffect(() => {
    if (roles) {
      setRolesElements(roles);
    }
  }, [roles]);

  // functions
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRolesSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //store dataform from inputs
  const handleStoreData = async () => {
    try {
      const dataToSend = {
        user_id: row.id,
        roles_id: rolesSelected,
      };

      await assignRoles(authTokens, dataToSend);

      setSeverity("success");
      setAlertMessage(`Roles actualizados`);
      setShowAlertFlag(true);

      handleCloseShowModal();
    } catch (error) {
      setSeverity("error");
      setShowAlertFlag(true);
      if (error && error.message) {
        setAlertMessage(`${error.message}`);
      } else {
        setAlertMessage("Ocurrio un error.");
      }
    } finally {
      getUsers(authTokens);
    }
  };

  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="m-5">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {`Asignar roles a: ${row ? row.lastname + ", " + row.name : ""}`}
        </h2>
      </div>
    );
  };

  const ButtonsForm = () => {
    return (
      <div className="mt-10">
        <Button onClick={handleStoreData} variant="contained" color="success">
          Guardar
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-full bg-gray-300 p-5 rounded-md ">
      <TitleForm />

      {/* Form data */}
      <div className="grid grid-cols-1 gap-10">
        {/* select roles */}
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="rolesSelectedLabel">Roles</InputLabel>
            <Select
              labelId="rolesSelectedLabel"
              id="rolesSelected"
              multiple
              value={rolesSelected}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {rolesElements.map((role) => (
                <MenuItem
                  key={role.id}
                  value={role.id}
                  style={getStyles(role.name, rolesSelected, theme)}
                >
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {/* buttons */}
      <ButtonsForm />
    </div>
  );
};
