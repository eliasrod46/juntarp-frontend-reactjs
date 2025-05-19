import Breadcrumb from "@/components/Breadcrumb";
import { RolesIndexTable } from "../components";

export function IndexRoles() {
  return (
    <div>
      <h2 className="text-center text-2xl my-4">Roles</h2>
      <div>
        <Breadcrumb/>
      </div>
      <RolesIndexTable />
    </div>
  );
}
