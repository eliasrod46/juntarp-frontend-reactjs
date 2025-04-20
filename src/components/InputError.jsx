import { useEffect } from "react";

export const InputError = ({ validationErrors, value }) => {

  return (
    <div>
      {validationErrors && validationErrors[value] && (
        <ul>
          {validationErrors[value].map((element, i) => {
            return (
              <li key={i} className="text-red-500 font-bold text-base">
                {element}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
