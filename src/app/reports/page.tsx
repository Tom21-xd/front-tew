import React from 'react';
import CardAirports from '@/components/reports/CardAirports';
import OptionAirports from '@/components/reports/OptionAirports';

export default function Page(){
    return(
        <div className="flex flex-col h-screen overflow-auto pt-16 pb-8">
            Holi
            <div className="flex-none">
                <OptionAirports />
            </div>
            <div className="flex-grow overflow-auto">
                <CardAirports />
            </div>
        </div>
    )
}