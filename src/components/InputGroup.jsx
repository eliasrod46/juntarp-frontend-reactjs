import { TextField } from "@mui/material";
import { InputError } from ".";

export const InputGroup = ({
  id,
  type,
  label,
  dataForm,
  handleChangeinputs,
  validationErrors,
}) => {
  return (
    <div>
      <div>
        <TextField
          name={id}
          type={type}
          label={label}
          variant="filled"
          size="small"
          value={dataForm[id]}
          onChange={handleChangeinputs}
        />
      </div>
      <div>
        <InputError validationErrors={validationErrors} value={id} />
      </div>
    </div>
  );
};