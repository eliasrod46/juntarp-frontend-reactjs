//modal
import React, { useEffect, useState, useContext } from "react";
import { Box, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CiclosContext } from "@/Modules/Ciclos/context";
import { InputErrors } from "@/Modules/Ciclos/components";
import { style } from "./StyleModals";
import dayjs from "dayjs";

export const ShowCicloModal = ({
  row,
  showModalFlag,
  handleCloseShowModal,
  setSeverity,
  setAlertMessage,
  setShowAlertFlag,
}) => {
  // structure dataForm
  const dataFormBase = {
    name: "",
    year: "",
    details: "",
    start_date: "",
    end_date: "",
  };

  const { getCiclos, updateCiclo, createCiclo, errors } =
    useContext(CiclosContext);
  const [dataForm, setDataForm] = useState(dataFormBase);

  //when row recived, update dataForm
  useEffect(() => {
    if (row) {
      const dataFormRecived = {
        name: row.name ? row.name : "",
        year: row.year ? row.year : "",
        details: row.details ? row.details : "",
        start_date: row.start_date ? row.start_date : "",
        end_date: row.end_date ? row.end_date : "",
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
    //conver to number if name dni
    if (nameInput == "year") {
      if (isNaN(Number(e.target.value))) {
        valueInput = "";
      } else {
        valueInput = Number(e.target.value);
      }
    }

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
        year: dataForm.year,
        details: dataForm.details,
        start_date: dataForm.start_date,
        end_date: dataForm.end_date,
      };

      if (row) {
        await updateCiclo(row.id, dataToSend);
      } else {
        await createCiclo(dataToSend);
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
          {row ? "Ver" : "Crear"} Ciclo {row ? `: ${row.year}` : ""}
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
          <div className="grid grid-cols-2 gap-10">
            {/* year */}
            <div>
              <div>
                <TextField
                  name="year"
                  type="number"
                  label="year"
                  variant="filled"
                  size="small"
                  value={dataForm.year}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.year} />
              </div>
            </div>

            {/* name */}
            <div>
              <div>
                <TextField
                  name="name"
                  type="text"
                  label="name"
                  variant="standard"
                  size="small"
                  value={dataForm.name}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.name} />
              </div>
            </div>

            {/* start_date */}
            <div>
              <div>
                <TextField
                  name="start_date"
                  type="date"
                  label="start_date"
                  variant="standard"
                  size="small"
                  value={dataForm.start_date}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.start_date} />
              </div>
            </div>

            {/* end_date */}
            <div>
              <div>
                <TextField
                  name="end_date"
                  type="date"
                  label="end_date"
                  variant="standard"
                  size="small"
                  value={dataForm.end_date}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.end_date} />
              </div>
            </div>

            {/* details */}
            <div>
              <div>
                <TextField
                  name="details"
                  type="text"
                  label="details"
                  variant="standard"
                  size="small"
                  value={dataForm.details}
                  onChange={handleChangeinputs}
                />
              </div>
              <div>
                <InputErrors errors={errors.details} />
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
