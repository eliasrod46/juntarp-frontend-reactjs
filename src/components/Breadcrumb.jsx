import React from 'react';
import { Link, useLocation } from 'react-router-dom';



const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  const breadcrumbs = [{ path: '/inicio', label: 'Inicio' }];

  pathSegments.forEach((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    // Aquí podrías buscar información adicional sobre el segmento (ej., título)
    // basándote en tu configuración de rutas o alguna otra fuente de datos.
    const label = segment.charAt(0).toUpperCase() + segment.slice(1); // Ejemplo de etiqueta
    breadcrumbs.push({ path, label });
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className='flex bg-black bg-opacity-20 rounded-lg m-1 p-5 pl-2 text-lg'>
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="mr-2">
            {index < breadcrumbs.length - 1 ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              <span className="text-gray-600" aria-current="page">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;



