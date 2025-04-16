import { InputError } from "@/components/InputError";
import React from "react";

export const InputLogin = ({ item, setItem, value, validationErrors }) => {
  return (
    <div>
      <div className="flex relative">
        <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
          {/* ... icono de email ... */}
        </span>
        <input
          className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          placeholder={value}
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </div>

      <InputError validationErrors={validationErrors} value={value} />
    </div>
  );
};
