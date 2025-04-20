import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { InputLogin } from "..";
import { GeneralAlert, PasswordIcon, UserIcon } from "@/components";

export function LoginForm() {
  const navigate = useNavigate();
  // form items
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //contexts
  const { login, validationErrors } = useContext(AuthContext);
  //alerts
  const [showAlertFlag, setShowAlertFlag] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = { email, password };
      await login(dataToSend);

      navigate("/inicio", { replace: true });
    } catch (error) {
      if (error && error.message) {
        setSeverity("error");
        setAlertMessage(`${error.message}`);
        setShowAlertFlag(true);
      }
    }
  };

  return (
    <div className="flex justify-center m-6">
      <GeneralAlert
        severity={severity}
        alertMessage={alertMessage}
        setOpen={setShowAlertFlag}
        open={showAlertFlag}
      />
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-4xl dark:text-white">
          Iniciar Sesion
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col text-center">
              <div className="flex flex-col mb-2">
                {/* input */}
                <InputLogin
                  setItem={setEmail}
                  item={email}
                  value="email"
                  label="Usuario"
                  type="text"
                  icon={<UserIcon />}
                  validationErrors={validationErrors}
                />
              </div>
              <div className="flex flex-col mb-6">
                {/* input */}
                <InputLogin
                  setItem={setPassword}
                  item={password}
                  value="password"
                  label="Password"
                  type="password"
                  icon={<PasswordIcon />}
                  validationErrors={validationErrors}
                />
              </div>
            </div>

            {/* buttons */}
            <div className="flex w-full">
              <button
                type="submit"
                className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
        {/* Mostrar el mensaje de error */}
        {/* <div className="flex items-center justify-center mt-6">
          <a
            href="#"
            target="_blank"
            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
          >
            You don&#x27;t have an account?
          </a>
        </div> */}
      </div>
    </div>
  );
}
