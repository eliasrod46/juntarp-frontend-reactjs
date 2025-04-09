import AuthContext from "@/Modules/Auth/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const IndexMain = () => {
  const [hasSuperAdminAccess, setHasSuperAdminAccess] = useState(false);
  const { can } = useContext(AuthContext);

  useEffect(() => {
    const checkSuperAdminArchivoAccess = async () => {
      const result = await can(["Super Admin"]);
      setHasSuperAdminAccess(result);
    };

    checkSuperAdminArchivoAccess();
  }, [can]);
  return (
    <div>
      <h2 className="text-center text-2xl my-4">
        Junta de Clasificacion Docente Rama Primaria
      </h2>
      <div className="flex gap-5">
        {hasSuperAdminAccess ? (
          <div>
            <Link to="/usuarios">
              <div className="w-44 bg-gray-500 rounded-lg shadow-xl shadow-neutral-500 h-36 grid grid-cols-1">
                <div className="w-16 m-auto">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <circle cx="12" cy="6" r="4" fill="#1C274C"></circle>{" "}
                      <path
                        d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                        fill="#1C274C"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="text-center text-xl m-auto">
                  <span>Usuarios</span>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div>
          <Link to="/archivo/carpetas">
            <div className="w-44 bg-gray-500 rounded-lg shadow-xl shadow-neutral-500 h-36 grid grid-cols-1">
              <div className="w-16 m-auto">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M0 1H5L8 3H13V5H3.7457L2.03141 11H4.11144L5.2543 7H16L14 14H0V1Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="text-center text-xl m-auto">
                <span>Movimiento de carpetas</span>
              </div>
            </div>
          </Link>
        </div>
        {/* perfil */}
        {/* <div>
          <Link to="/auth/profile">
            <div className="w-44 bg-gray-500 rounded-lg shadow-xl shadow-neutral-500 h-36 grid grid-cols-1">
              <div className="w-16 m-auto">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M0 1H5L8 3H13V5H3.7457L2.03141 11H4.11144L5.2543 7H16L14 14H0V1Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="text-center text-xl m-auto">
                <span>Perfil</span>
              </div>
            </div>
          </Link>
        </div> */}
        {/* Configuracion */}
        <div>
          <Link to="/configuracion">
            <div className="w-44 bg-gray-500 rounded-lg shadow-xl shadow-neutral-500 h-36 grid grid-cols-1">
              <div className="w-16 m-auto">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M0 1H5L8 3H13V5H3.7457L2.03141 11H4.11144L5.2543 7H16L14 14H0V1Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="text-center text-xl m-auto">
                <span>Configuración</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
