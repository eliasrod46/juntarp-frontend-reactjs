import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { InputErrors } from "../components";
import { UsersContext } from "@/Modules/Users/context";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AlertTable = ({
  severity,
  alertMessage,
  setOpen,
  showAlertFlag,
  duration = 3000,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      // key={"top" + "center"}
      open={showAlertFlag}
      autoHideDuration={duration}
      onClose={() => setOpen(false)} //close on duration
    >
      <Alert
        severity={severity}
        sx={{ width: "100%", py: 2, fontSize: "1.25rem" }}
        onClose={() => setOpen(false)} //close on click
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export function IndexProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //context
  const { changePasssword, errors } = useContext(UsersContext);
  const { authTokens, authUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Inicializa useNavigate
  //alerts
  const [showAlertFlag, setShowAlertFlag] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChangePassword = async () => {
    // authTokens, id, data
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    try {
      await changePasssword(authTokens, authUser.id, data);
      setSeverity("success");
      setAlertMessage(`Password cambiardo correctamente`);
      setShowAlertFlag(true);
      setTimeout(() => {
        navigate('/inicio');
      }, 5000);
    } catch (error) {
      setSeverity("error");
      setAlertMessage(`Ocurrio algo`);
      setShowAlertFlag(true);
    }
  };

  return (
    <div>
      <AlertTable
        severity={severity}
        alertMessage={alertMessage}
        setOpen={setShowAlertFlag}
        showAlertFlag={showAlertFlag}
      />
      <h2 className="text-center text-2xl my-4">Perfil</h2>

      <h2 className="text-center text-2xl my-4">Cambiar Password</h2>
      <div>
        {/* oldPassword */}
        <div className="flex felx-col w-full gap-x-10">
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
          <div>
            <InputErrors errors={errors.oldPassword} />
          </div>
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
          <div>
            <InputErrors errors={errors.newPassword} />
          </div>
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
          <div>
            <InputErrors errors={errors.confirmPassword} />
          </div>
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
