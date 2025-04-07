//modal
import React, { useEffect, useState, useContext } from "react";
import { Box, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { CustomSelect } from "@/components/CustomSelect";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TurnosTypesContext } from "@/Modules/Turnos/context";
import { InputErrors } from "@/Modules/Turnos/components";
import { style } from "./StyleModals";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export const ShowTurnoTypeModal = ({
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
    inscriptionType: "",
    turnoMoment: "",
    name: "",
    quantity_dates: "",
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

  // inscription_type data
  const turnoMomentData = [
    {
      id: "Mañana",
      name: "Mañana",
    },
    {
      id: "Tarde",
      name: "Tarde",
    },
  ];

  const { updateTurnoType, createTurnoType, errors } =
    useContext(TurnosTypesContext);
  const [dataForm, setDataForm] = useState(dataFormBase);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        name: row.name ? row.name : "",
        quantity_dates: row.quantity_dates ? row.quantity_dates : "",
        inscriptionType: "",
        turnoMoment: "",
      };
      setDataForm(dataFormRecived);
    } else {
      setDataForm(dataFormBase);
    }
  }, [row]);

  // ============================================> modal hadlers
  //update dataform from inputs
  const handleChangeinputs = (e) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    //conver to number if name quantity_dates
    if (nameInput == "quantity_dates") {
      if (isNaN(Number(e.target.value))) {
        valueInput = "";
      } else {
        valueInput = e.target.value;
      }
      // update state
      setDataForm((prevState) => ({
        ...prevState,
        [nameInput]: valueInput,
      }));
    } else {
      console.log(valueInput);

      let name;
      if (valueInput != "none") {
        if (nameInput == "inscriptionType") {
          name = `${valueInput} - ${dataForm.turnoMoment}`; //complementaria - tarde
        } else {
          name = `${dataForm.inscriptionType} - ${valueInput}`; //complementaria - tarde
        }

        // update state
        setDataForm((prevState) => ({
          ...prevState,
          name,
          [nameInput]: valueInput,
        }));
      }
    }
  };

  //store dataform from inputs
  const handleStoreData = async () => {
    try {
      const dataToSend = {
        name: dataForm.name,
        quantity_dates: Number(dataForm.quantity_dates),
      };

      if (row) {
        await updateTurnoType(row.id, dataToSend);
      } else {
        await createTurnoType(dataToSend);
      }

      handleCloseShowModal();
    } catch (error) {
      console.log("Errores desde contexto: ", error);
      // Manejar los errores
      setSeverity("error");
      setAlertMessage("Ocurrio un error.");
      setShowAlertFlag(true);
    } finally {
      // getCiclos();
    }
  };

  // ============================================> modal parts
  const TitleModal = () => {
    return (
      <div className="my-5">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {row ? "Ver" : "Crear"} Tipo de turno {row ? `: ${row.name}` : ""}
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
            {/* inscriptionType */}
            <div>
              <div>
                <CustomSelect
                  title="Tipo de inscription"
                  id="inscriptionType"
                  value={dataForm.inscriptionType}
                  selectItemId="id"
                  selectItemName="name"
                  itemsList={inscriptionTypeData}
                  handleChange={handleChangeinputs}
                />
              </div>
              <div>
                {errors.inscriptionType ? (
                  <span className="text-red-500 font-bold text-base">
                    {errors.inscriptionType}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* turnoMomentData */}
            <div>
              <div>
                <CustomSelect
                  title="Momento del dia"
                  id="turnoMoment"
                  value={dataForm.turnoMoment}
                  selectItemId="id"
                  selectItemName="name"
                  itemsList={turnoMomentData}
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

            {/* quantity_dates */}
            <div>
              <div>
                <TextField
                  name="quantity_dates"
                  type="number"
                  // label="time"
                  variant="standard"
                  size="small"
                  value={dataForm.quantity_dates}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.time} />
              </div>
            </div>

            {/* name */}
            <div>
              <div>
                <TextField
                  name="name"
                  type="text"
                  // label="time"
                  variant="standard"
                  size="small"
                  value={dataForm.name}
                  // onChange={handleChangeinputs}
                  aria-readonly
                />
              </div>
              <div>
                <InputErrors errors={errors.time} />
              </div>
            </div>
          </div>
          {/* buttons */}
          <ButtonsModal />
        </div>
      </Box>
    </Modal>
  );
};
