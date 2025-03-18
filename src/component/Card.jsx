import React from 'react';
import { BriefcaseBusiness } from 'lucide-react';

const Card = ({ title, value, icon: Icon }) => {
    return (
        <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full">
            <div className="p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-emerald-100 bg-teal-600">
                <div className="text-center xl:mb-0 mb-3">
                    <div>
                        {Icon && <Icon size={48} className="m-auto" />}
                        <p className="mb-3 text-xl font-medium text-gray-50 dark:text-gray-100">{title}</p>
                        <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">{value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
