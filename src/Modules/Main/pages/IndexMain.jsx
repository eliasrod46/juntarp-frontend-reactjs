import Breadcrumb from "@/components/Breadcrumb";
import AuthContext from "@/Modules/Auth/context/AuthContext";
import { CanAccess } from "@/Modules/Auth/pages/CanAccess";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const IndexMain = () => {
  const [SuperAdmin, setSuperAdmin] = useState(false);
  const [usersIndex, setUsersIndex] = useState(false);
  const [docentesIndex, setDocentesIndex] = useState(false);
  const [fileIndex, setFileIndex] = useState(false);
  const { can } = useContext(AuthContext);

  //set permissions
  useEffect(() => {
    const checkAccess = async () => {
      setUsersIndex(await can(["users/index"]));
      setDocentesIndex(await can(["docentes/index"]));
      setFileIndex(await can(["file/index"]));
      setSuperAdmin(await can(["Super Admin"]));
    };
    checkAccess();
  }, [can]);

  return (
    <div>
      <h2 className="text-center text-2xl my-4">
        Junta de Clasificacion Docente Rama Primaria
      </h2>
      <div>
        <Breadcrumb />
      </div>
      <div className="flex gap-5">
        {/* Usuarios */}
        <CanAccess permissions={[usersIndex]}>
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
        </CanAccess>
        {/* Docentes */}
        <CanAccess permissions={[docentesIndex]}>
          <div>
            <Link to="/docentes">
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
                  <span>Docentes</span>
                </div>
              </div>
            </Link>
          </div>
        </CanAccess>
        {/* Configuracion */}
        <CanAccess permissions={[SuperAdmin]}>
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
        </CanAccess>
        {/* Archivo */}
        <CanAccess permissions={[fileIndex]}>
          <div>
            <Link to="/archivo">
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
                  <span>Archivo</span>
                </div>
              </div>
            </Link>
          </div>
        </CanAccess>
        {/* perfil */}
        <div>
          <Link to="/inicio/profile">
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
        </div>
      </div>
    </div>
  );
};
