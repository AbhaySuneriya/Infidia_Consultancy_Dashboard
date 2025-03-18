import React from 'react';
import Card from './Card';
import { BriefcaseBusiness, FileUser, UserSearch, UserCog } from 'lucide-react';

const cardData = [
    { title: "Total Jobs", value: "2050.82", icon: BriefcaseBusiness },
    { title: "Total Applicants", value: "1500", icon: FileUser },
    { title: "Total Jobseekers", value: "120", icon: UserSearch },
    { title: "Total Employers", value: "50,000", icon: UserCog }
];

const Dashboard = () => {
    return (
        <div>
            <h1 className="mt-1 mb-3 font-bold">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardData.map((card, index) => (
                    <Card key={index} title={card.title} value={card.value} icon={card.icon} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
