import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";

export function IndexConfig() {
  return (
    <div>
      <h2 className="text-center text-2xl my-4">Configuración</h2>
      <div>
        <Breadcrumb />
      </div>
      <div className="flex gap-5">
        {/* Roles */}
        <div>
          <Link to="/configuracion/roles">
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
                <span>Roles</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Permissions */}
        <div>
          <Link to="/configuracion/permisos">
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
                <span>Permisos</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
