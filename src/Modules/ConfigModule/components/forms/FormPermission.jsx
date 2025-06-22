//modal
import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { InputGroup } from "@/components";
import { RolesContext } from "../../context";
import { PermissionsContext } from "../../context/PermissionsContext";

export const FormPermission = ({
  row,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // structure dataForm
  const dataFormBase = {
    name: "",
    group: "",
    route: "",
  };

  // contexts
  const {
    getPermissions,
    updatePermission,
    createPermission,
    createPermissions,
    validationErrors,
  } = useContext(PermissionsContext);
  const { authTokens } = useContext(AuthContext);

  // states
  const [dataForm, setDataForm] = useState(dataFormBase);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        name: row.name ? row.name : "",
        group: row.group ? row.group : "",
        route: row.route ? row.route : "",
      };
      setDataForm(dataFormRecived);
    } else {
      setDataForm(dataFormBase);
    }
  }, [row]);

  //update dataform from inputs
  const handleChangeinputs = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;

    // update state
    setDataForm((prevState) => ({
      ...prevState,
      [nameInput]: valueInput,
    }));
  };

  //store dataform from inputs
  const handleStoreData = async () => {
    try {
      const dataToSend = {
        name: dataForm.name,
        group: dataForm.group,
        route: dataForm.route,
      };

      if (row) {
        await updatePermission(authTokens, row.id, dataToSend);
      } else {
        await createPermission(authTokens, dataToSend);
      }

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

  //masive generation standard permissions
  const handleStandarGenerationPermissions = async () => {
    try {
      const dataToSend = {
        permissions: [
          //docentes
          {
            name: "Ver docentes",
            group: "Docentes",
            route: "docentes/index",
          },
          {
            name: "Crear docente",
            group: "Docentes",
            route: "docentes/create",
          },
          {
            name: "Actualizar docente",
            group: "Docentes",
            route: "docentes/update",
          },
          {
            name: "Eliminar docente",
            group: "Docentes",
            route: "docentes/delete",
          },
          //users
          {
            name: "Ver usuarios",
            group: "Usuarios",
            route: "users/index",
          },
          {
            name: "Crear usuario",
            group: "Usuarios",
            route: "users/create",
          },
          {
            name: "Actualizar usuario",
            group: "Usuarios",
            route: "users/update",
          },
          {
            name: "Eliminar usuario",
            group: "Usuarios",
            route: "users/delete",
          },
          {
            name: "Resetear password",
            group: "Usuarios",
            route: "users/password/reset",
          },
          {
            name: "Vincular roles",
            group: "Usuarios",
            route: "users/link/roles",
          },
          //roles
          {
            name: "Ver roles",
            group: "Roles",
            route: "roles/index",
          },
          {
            name: "Crear rol",
            group: "Roles",
            route: "roles/create",
          },
          {
            name: "Actualizar rol",
            group: "Roles",
            route: "roles/update",
          },
          {
            name: "Eliminar rol",
            group: "Roles",
            route: "roles/delete",
          },
          //permissions
          {
            name: "Ver permisos",
            group: "Permisos",
            route: "permissions/index",
          },
          {
            name: "Crear permiso",
            group: "Permisos",
            route: "permissions/create",
          },
          {
            name: "Actualizar permiso",
            group: "Permisos",
            route: "permissions/update",
          },
          {
            name: "Eliminar permiso",
            group: "Permisos",
            route: "permissions/delete",
          },
          //==>file
          //folders
          {
            name: "Ver archivo",
            group: "Archivo",
            route: "file/index",
          },
          {
            name: "Ver carpetas",
            group: "Archivo",
            route: "file/folder/index",
          },
          {
            name: "Ver historial de carpetas",
            group: "Archivo",
            route: "file/folders/history",
          },
          {
            name: "Ver historial de carpeta",
            group: "Archivo",
            route: "file/folder/history",
          },
          {
            name: "Mover carpetas",
            group: "Archivo",
            route: "file/folder/movements",
          },
          {
            name: "Crear carpeta",
            group: "Archivo",
            route: "file/folder/create",
          },
          {
            name: "Editar carpeta",
            group: "Archivo",
            route: "file/folder/update",
          },
        ],
      };

      await createPermissions(authTokens, dataToSend);

      setSeverity("success");
      setAlertMessage(`Permisos creados con exito`);
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

  // ============================================> form parts
  const TitleForm = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row ? "Actualizar" : "Crear"} Rol {row ? `: ${row.name}` : ""}
        </h2>
      </div>
    );
  };

  const ButtonsForm = () => {
    return (
      <div className="mt-10 flex gap-x-6">
        <Button onClick={handleStoreData} variant="contained" color="success">
          {row ? "Actualizar" : "Crear"}
        </Button>
        <Button
          onClick={handleStandarGenerationPermissions}
          variant="contained"
          color="info"
        >
          {"Generacion estandar de pemisos"}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-full bg-gray-300 p-5 rounded-md ">
      <TitleForm />

      {/* Form data */}
      <div className="grid grid-cols-2 gap-10">
        {/* name */}
        <InputGroup
          id="name"
          type="text"
          label="Nombre"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />

        {/* group */}
        <InputGroup
          id="group"
          type="text"
          label="Grupo"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />

        {/* route */}
        <InputGroup
          id="route"
          type="text"
          label="Permiso"
          dataForm={dataForm}
          handleChangeinputs={handleChangeinputs}
          validationErrors={validationErrors}
        />
      </div>
      {/* buttons */}
      <ButtonsForm />
    </div>
  );
};
