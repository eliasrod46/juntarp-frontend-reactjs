import { InputError } from "@/components/InputError";
import React from "react";

export const InputLogin = ({
  item,
  setItem,
  value,
  validationErrors,
  label,
  type,
  icon,
}) => {
  return (
    <div className="mb-8">
      <h2 className="self-center mb-2 text-sm font-light text-gray-600 sm:text-xl dark:text-white">{label}</h2>
      <div className="flex relative">
        <div className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
          {icon}
        </div>

        <input
          className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type={type}
          placeholder={label}
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </div>

      <InputError validationErrors={validationErrors} value={value} />
    </div>
  );
};
