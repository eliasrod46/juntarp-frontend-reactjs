import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { InputErrors } from "../components";

export function IndexProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {};

  return (
    <div>
      <h2 className="text-center text-2xl my-4">Perfil</h2>

      <h2 className="text-center text-2xl my-4">Cambiar Password</h2>
      <div className="grid grid-cols-4">
        {/* oldPassword */}
        <div>
          <div>
            <TextField
              name="oldPassword"
              type="text"
              label="Password anterior"
              variant="standard"
              // size=""
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </div>
          {/* <div><InputErrors errors={errors.name} /></div> */}
        </div>
        {/* newPassword */}
        <div>
          <div>
            <TextField
              name="newPassword"
              type="text"
              label="Password nuevo"
              variant="standard"
              // size=""
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          {/* <div><InputErrors errors={errors.name} /></div> */}
        </div>
        {/* confirmPassword */}
        <div>
          <div>
            <TextField
              name="confirmPassword"
              type="text"
              label="Password nuevo"
              variant="standard"
              // size=""
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          {/* <div><InputErrors errors={errors.name} /></div> */}
        </div>
        {/* boton */}
        <div>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            color="success"
          >
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  );
}
