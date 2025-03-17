import React from "react";
import { quantum } from "ldrs";

quantum.register(); // Register the loader

const Loader = ({ size = "45", speed = "1.75", className = "text-emerald-500 dark:text-emerald-400" }) => {
    return (
        <div className="flex justify-center mt-4">
            <l-quantum size={size} speed={speed} className={className}></l-quantum>
        </div>
    );
};

export default Loader;
