import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function Inputs({setQuery, units, setUnits}) {
    const [city, setCity] = useState("");
    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name
        if (units !== selectedUnit) setUnits(selectedUnit);
    };
    const handleSearchClick = () => {
        if(city !== '') setQuery({q:city})
    };
    const handleLocationClick = () => {
        if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            setQuery({lat, lon});
            })
        }
    }
    return (
         <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row items-center justify-center space-x-3">
                <label class="relative block">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <UilSearch 
                            size={20} 
                            className="text-gray-200 cursor-pointer transition ease-out hover:scale-125"
                            onClick={handleSearchClick} 
                        />
                    </span>
                    <input
                        value={city}
                        onChange={(e) => setCity(e.currentTarget.value)}
                        class="leading-4 font-light w-full rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none capitalize placeholder:lowercase" 
                        placeholder="Search for city" 
                        type="text" 
                        name="search"/>
                </label>
                <UilLocationPoint 
                    size={20} 
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                    onClick={handleLocationClick} 
                />
            </div>
        <div className="flex flex-row items-center justify-center pl-5">
            <button 
                name="metric" 
                className="text-white text-xl font-light transition ease-out hover:scale-110"
                onClick={handleUnitsChange}
            >
                °C
            </button>
            <p className="text-white text-xl mx-1 text-center">|</p>
            <button 
                name="imperial" 
                className="text-white text-xl font-light transition ease-out hover:scale-110"
                onClick={handleUnitsChange}
            >
                °F
            </button>
        </div>
    </div>
    );
}

export default Inputs