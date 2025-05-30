import React, { useState } from "react";
import { FoldersIndexTable } from "../components/folders/foldersIndexTabla/FoldersIndexTable";
import Breadcrumb from "@/components/Breadcrumb";

export const IndexMovementFolders = () => {
  const tabActivaClass =
    "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group";
  const tabInactivaClass =
    "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";
  const iconoActivoClass = "w-4 h-4 me-2 text-blue-600 dark:text-blue-500";
  const iconoInactivoClass =
    "w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300";

  const [tab, setTab] = useState(1);
  return (
    <div>
      <h2 className="text-center text-2xl my-4">Movimieto de carpetas</h2>

      <div>
        <Breadcrumb />
      </div>
      <div>
        <ul className="flex flex-wrap -mb-px text-sm font-medium justify-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <button
              onClick={() => setTab(1)}
              className={tab === 1 ? tabActivaClass : tabInactivaClass}
            >
              <svg
                className={tab === 1 ? iconoActivoClass : iconoInactivoClass}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              Total
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setTab(2)}
              className={tab === 2 ? tabActivaClass : tabInactivaClass}
            >
              <svg
                className={tab === 2 ? iconoActivoClass : iconoInactivoClass}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              Carpetas en archivo
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setTab(3)}
              className={tab === 3 ? tabActivaClass : tabInactivaClass}
            >
              <svg
                className={tab === 3 ? iconoActivoClass : iconoInactivoClass}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              Carpetas fuera de archivo
            </button>
          </li>
        </ul>
      </div>

      {tab == 1 ? (
        <div>
          <h2 className="text-center text-xl my-4">Carpetas</h2>
          <FoldersIndexTable tab={tab} />
        </div>
      ) : (
        ""
      )}
      {tab == 2 ? (
        <div>
          <h2 className="text-center text-xl my-4">Carpetas en archivo</h2>

          <FoldersIndexTable tab={tab} />
        </div>
      ) : (
        ""
      )}
      {tab == 3 ? (
        <div>
          <h2 className="text-center text-xl my-4">
            Carpetas fuera del archivo
          </h2>

          <FoldersIndexTable tab={tab} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
