import { FormChangePassword } from "@/Modules/Auth/components/forms/FormChangePassword";

export function IndexProfile() {
  return (
    <div className="">
      <h1 className="text-center text-4xl">Perfil de usuario</h1>
      <FormChangePassword />
    </div>
  );
}
