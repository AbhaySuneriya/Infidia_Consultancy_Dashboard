import { useState } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children }) {
  return <div className="cursor-pointer">{children}</div>;
}

export function DropdownMenuContent({ children, align = "end" }) {
  return (
    <div
      className={`absolute mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md ${
        align === "end" ? "right-0" : "left-0"
      }`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <div className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClick}>
      {children}
    </div>
  );
}
