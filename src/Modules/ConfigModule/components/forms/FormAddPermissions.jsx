//modal
import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { RolesContext } from "../../context";
import { PermissionsContext } from "../../context/PermissionsContext";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Permisos iniciales asignados al rol específico (viene del backend)
export const FormAddPermissions = ({
  row,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // contexts
  const { permissions, getPermissions } = useContext(PermissionsContext);
  const { assignPermissions } = useContext(RolesContext);
  const { authTokens } = useContext(AuthContext);

  // states
  const [allPermissions, setAllPermissions] = useState([]);
  const [role, setRole] = useState(null);
  const [assignedPermissions, setAssignedPermissions] = useState([]);

  useEffect(() => {
    getPermissions(authTokens);
  }, []);

  useEffect(() => {
    if(permissions){
        const orderedPermissions = [...permissions];

        orderedPermissions.sort((a, b) => {
          const groupA = a.group ? a.group.toUpperCase() : ""; // Convertir a mayúsculas para un ordenamiento insensible a mayúsculas/minúsculas
          const groupB = b.group ? b.group.toUpperCase() : "";
    
          if (groupA < groupB) {
            return -1;
          }
          if (groupA > groupB) {
            return 1;
          }
          return 0;
        });
        setAllPermissions(orderedPermissions);
    }


  }, [permissions]);

  //when row recived, update role state
  useEffect(() => {
    if (row && row.permissions) {
      const newAssignedPermissions = row.permissions.map(
        (permission) => permission.id
      );
      setAssignedPermissions(newAssignedPermissions);
    }

    setRole(row);
  }, [row]);

  //store store data from inputs
  const handleStoreData = async () => {
    try {
      const selectedPermissions = allPermissions
        .filter((permission) => assignedPermissions.includes(permission.id))
        .map((permission) => ({
          name: permission.name,
          group: permission.group,
          route: permission.route,
        }));

      const dataToSend = { permissions: selectedPermissions };

      await assignPermissions(authTokens, role.id, dataToSend);
      setSeverity("success");
      setAlertMessage(`Permiso ${row ? "actualizado" : "creado"} con exito`);
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
      getPermissions(authTokens);
    }
  };

  const handlePermissionToggle = (permissionObject) => {
    // Accedemos al ID del permiso desde el objeto completo
    const permissionId = permissionObject.id;

    const isAssigned = assignedPermissions.includes(permissionId);

    if (isAssigned) {
      // Remover permiso
      setAssignedPermissions(
        assignedPermissions.filter((id) => id !== permissionId)
      );
    } else {
      // Añadir permiso
      setAssignedPermissions([...assignedPermissions, permissionId]);
    }
  };

  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {role ? `Actualizar permisos para el rol: ${role.name}` : ""}
        </h2>
      </div>
    );
  };

  const ButtonsForm = () => {
    return (
      <div className="mt-10">
        <Button onClick={handleStoreData} variant="contained" color="success">
          {role ? "Asingar" : ""}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-full bg-gray-300 p-5 rounded-md ">
      {allPermissions && role && (
        <>
          <TitleForm />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="permissions table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Grupo</TableCell>
                  <TableCell>Ruta</TableCell>
                  <TableCell align="center">Asignado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allPermissions.map((permission) => (
                  <TableRow
                    key={permission.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {permission.name}
                    </TableCell>
                    <TableCell>{permission.group}</TableCell>
                    <TableCell>{permission.route}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={assignedPermissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ButtonsForm />
        </>
      )}
    </div>
  );
};
