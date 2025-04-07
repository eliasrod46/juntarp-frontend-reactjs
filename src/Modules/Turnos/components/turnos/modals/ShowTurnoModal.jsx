//modal
import React, { useEffect, useState, useContext } from "react";
import { Box, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { CustomSelect } from "@/components/CustomSelect";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TurnosContext, TurnosTypesContext } from "@/Modules/Turnos/context";
import { CiclosContext } from "@/Modules/Ciclos/context";
import { DocentesContext } from "@/Modules/Docentes/context";
import { InputErrors } from "@/Modules/Docentes/components";
import { style } from "./StyleModals";
import dayjs from "dayjs";

export const ShowTurnoModal = ({
  row,
  showModalFlag,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // structures
  // structure dataForm
  const dataFormBase = {
    date: "",
    time: "",
    inscription_type: "",
    cicloId: "",
    turnoTypeId: "",
    docenteId: null,
  };

  // inscription_type data
  const inscriptionTypeData = [
    {
      id: "Normal",
      name: "Normal",
    },
    {
      id: "Complementaria",
      name: "Complementaria",
    },
  ];

  const { updateTurno, createTurno, errors } = useContext(TurnosContext);
  const { getTurnosTypes, elements: turnosTypes } =
    useContext(TurnosTypesContext);
  const { getCiclos, elements: ciclos } = useContext(CiclosContext);
  const { getDocentes, docentes } = useContext(DocentesContext);
  const [dataForm, setDataForm] = useState(dataFormBase);
  useEffect(() => {
    getCiclos();
    getTurnosTypes();
    getDocentes();
  }, []);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        date: row.date ? row.date : "",
        time: row.time ? row.time : "",
        inscription_type: row.inscription_type ? row.inscription_type : "",
        cicloId: row.ciclo ? row.ciclo.id : "",
        turnoTypeId: row.turnoType ? row.turnoType.id : "",
        docenteId: row.docente ? row.docente.id : "",
      };
      setDataForm(dataFormRecived);
    } else {
      setDataForm(dataFormBase);
    }
  }, [row]);

  // ============================================> modal hadlers
  //update dataform from inputs
  const handleChangeinputs = (e) => {
    let nameInput = "";
    let valueInput = "";
    nameInput = e.target.name;
    valueInput = e.target.value;

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
        date: dataForm.date,
        time: dayjs(dataForm.time, "HH:mm").format("YYYY-MM-DDTHH:mm:ss.sssZ"),
        inscription_type: dataForm.inscription_type,
        cicloId: dataForm.cicloId,
        turnoTypeId: dataForm.turnoTypeId,
      };

      if (row) {
        await updateTurno(row.id, dataToSend);
      } else {
        await createTurno(dataToSend);
      }

      handleCloseShowModal();
    } catch (error) {
      console.log("Errores desde contexto: ", error);
      // Manejar los errores
      setSeverity("error");
      setAlertMessage("Ocurrio un error.");
      setShowAlertFlag(true);
    } finally {
      getCiclos();
    }
  };

  // ============================================> modal parts
  const TitleModal = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row ? "Ver" : "Crear"} Turno{" "}
          {row ? `: ${row.date} - ${row.time}` : ""}
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
          onClick={() => handleCloseShowModal(true)}
          variant="contained"
          color="error"
        >
          Cerrar
        </Button>
        <Button onClick={handleStoreData} variant="contained" color="success">
          {row ? "Actualizar" : "Crear"}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      open={showModalFlag}
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
          {/* <BodyModal /> */}
          <div className="grid grid-cols-2 gap-10 items-center">
            {/* date */}
            <div>
              <div>
                <TextField
                  name="date"
                  type="date"
                  // label="date"
                  variant="standard"
                  size="small"
                  value={dataForm.date}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.date} />
              </div>
            </div>
            {/* time */}
            <div>
              <div>
                <TextField
                  name="time"
                  type="time"
                  // label="time"
                  variant="standard"
                  size="small"
                  value={dataForm.time}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.time} />
              </div>
            </div>
            {/* inscription_type */}
            <div>
              <div>
                <CustomSelect
                  title="Tipo de inscription"
                  id="inscription_type"
                  value={dataForm.inscription_type}
                  selectItemId="id"
                  selectItemName="name"
                  itemsList={inscriptionTypeData}
                  handleChange={handleChangeinputs}
                />
              </div>
              <div>
                {errors.inscription_type ? (
                  <span className="text-red-500 font-bold text-base">
                    {errors.inscription_type}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* turnoTypeId */}
            <div>
              <div>
                <CustomSelect
                  title="Tipos de turno"
                  id="turnoTypeId"
                  value={dataForm.turnoTypeId}
                  selectItemId="id"
                  selectItemName="name"
                  itemsList={turnosTypes}
                  handleChange={handleChangeinputs}
                />
              </div>
              <div>
                {errors.inscription_type ? (
                  <span className="text-red-500 font-bold text-base">
                    {errors.inscription_type}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* ciclos */}
            <div>
              <div>
                <CustomSelect
                  title="Ciclos"
                  id="cicloId"
                  value={dataForm.cicloId}
                  selectItemId="id"
                  selectItemName="year"
                  itemsList={ciclos}
                  handleChange={handleChangeinputs}
                />
              </div>
              <div>
                {errors.inscription_type ? (
                  <span className="text-red-500 font-bold text-base">
                    {errors.inscription_type}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* docenteId */}
            {/* <div>
              <div>
                <CustomSelect
                  title="Docentes"
                  id="docenteId"
                  value={dataForm.docenteId}
                  selectItemId="id"
                  selectItemName="name"
                  itemsList={docentes}
                  handleChange={handleChangeinputs}
                  sercheable
                />
              </div>
              <div>
                {errors.inscription_type ? (
                  <span className="text-red-500 font-bold text-base">
                    {errors.inscription_type}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div> */}
          </div>
          {/* buttons */}
          <ButtonsModal />
        </div>
      </Box>
    </Modal>
  );
};
