import { useEffect, useState } from "react";

export const CanAccess = ({ children, permissions = [] }) => {
  const [accessGranted, setAccessGranted] = useState(false); // Inicializado en false (denegado por defecto)

  useEffect(() => {
    if (permissions && permissions.length > 0) {
      const hasTruePermission = permissions.some(
        (permission) => permission === true
      );
      setAccessGranted(hasTruePermission); // Se concede acceso si al menos uno es true
    } else {
      setAccessGranted(true); // Si no hay permisos, concede acceso (comportamiento a definir)
    }
  }, [permissions]);

  return accessGranted ? <>{children}</> : null;
};
