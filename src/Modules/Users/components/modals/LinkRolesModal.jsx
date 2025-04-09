import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DocentesContext } from "@/Modules/Docentes/context";
import { style } from "./StyleModals";
import { RolesContext } from "@/Modules/ConfigModule/context";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { UsersContext } from "../../context";

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

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

function getStyles(name, rolesSelected, theme) {
  return {
    fontWeight: rolesSelected.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export const LinkRolesModal = ({
  row,
  openLinkRolesModalFlag,
  handleCloseLinkRolesModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRolesSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { authTokens } = useContext(AuthContext);
  const { roles, getRoles } = useContext(RolesContext);
  const { assignRoles, getUsers } = useContext(UsersContext);

  const [rolesElements, setRolesElements] = useState([]);
  const [rolesSelected, setRolesSelected] = useState([]);

  useEffect(() => {
    getRoles(authTokens);
  }, []);

  useEffect(() => {
    setRolesElements(roles);
  }, [roles]);

  // ============================================> modal hadlers

  //store dataform from inputs
  const handleStoreData = async () => {
    try {
      const dataToSend = {
        user_id: row.id,
        roles_id: rolesSelected,
      };

      await assignRoles(authTokens, dataToSend);

      handleCloseLinkRolesModal();
    } catch (error) {
      // console.log("Errores desde contexto: ", error);
      // Manejar los errores
      setSeverity("error");
      setAlertMessage("Ocurrio un error.");
      setShowAlertFlag(true);
    } finally {
      getUsers(authTokens);
    }
  };

  // ============================================> modal parts (nothing after this seccion, only return(render))
  const TitleModal = () => {
    return (
      <div className="m-5">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {`Eliminar Docente: ${row ? row.lastname : ""}, ${
            row ? row.name : ""
          }`}
        </h2>
      </div>
    );
  };

  const GeneralErrorsHeader = () => {
    return (
      <div>
        {typeof errors == "string" ? (
          <span className="text-red-500 font-bold text-base">{errors}</span>
        ) : (
          ""
        )}
      </div>
    );
  };

  const ButtonsModal = () => {
    return (
      <div className="mt-10">
        <Button
          onClick={() => handleCloseLinkRolesModal(true)}
          variant="contained"
          color="error"
        >
          Cerrar
        </Button>
        <Button onClick={handleStoreData} variant="contained" color="success">
          Guardar
        </Button>
      </div>
    );
  };

  // ============================================> render
  return (
    <Modal
      open={openLinkRolesModalFlag}
      // onClose={handleCloseShowModal} // close on click out of modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col items-center justify-between h-full">
          {/* title */}
          <TitleModal />
          {/* general errors header */}
          <GeneralErrorsHeader />
          {/* body */}
          {rolesElements && rolesElements.length > 0 ? (
            <div className="grid grid-cols-2 gap-10">
              {/* dni */}
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
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
          ) : (
            ""
          )}
          {/* buttons */}
          <ButtonsModal />
        </div>
      </Box>
    </Modal>
  );
};
