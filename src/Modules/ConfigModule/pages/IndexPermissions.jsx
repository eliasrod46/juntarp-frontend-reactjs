import Breadcrumb from "@/components/Breadcrumb";
import { PermissionsIndexTable } from "../components/tables/permissionsIndexTable/PermissionsIndexTable";

export function IndexPermissions() {
  return (
    <div>
      <h2 className="text-center text-2xl my-4">Permisos</h2>
      <div>
        <Breadcrumb />
      </div>
      <PermissionsIndexTable />
    </div>
  );
}
