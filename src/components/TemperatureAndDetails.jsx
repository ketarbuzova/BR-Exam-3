import React from 'react';
import {UilArrowUp, UilArrowDown, UilTemperatureEmpty, UilTear, UilCloudWind, UilSun, UilSunset,} from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({
    weather: {details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone,},
}) {
    return ( 
        <div>
            <div className="flex items-center justify-center py-6 text-xl text-gray-500">
                <p>{details}</p>
            </div>
            <div className="text-white flex flex-row items-center justify-between py-3">
                <img 
                    src={iconUrlFromCode(icon)} 
                    className="w-20" 
                    alt="" 
                />
                <p className="text-6xl">{`${temp.toFixed()}°`}</p>
                <div className="flex flex-col space-y-2">
                    <div className="flex font-light text-sm items-center justify-center">
                        <UilTemperatureEmpty size={18} className="mr-1" />
                        Real fell: 
                        <span className="font-medium ml-2">{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <UilTear size={18} className="mr-1" />
                        Humidity: 
                        <span className="font-medium ml-2">{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <UilCloudWind size={18} className="mr-1" />
                        Wind: 
                        <span className="font-medium ml-2">{`${speed.toFixed()} km/h`}</span>
                    </div>
                </div>
            </div>
            <div className="text-white flex flex-row items-center justify-center space-x-2 text-sm py-3.5">
                <UilSun size={15} className="mr-1" />
                <p className="font-light">
                    Rise: 
                    <span className="font-medium ml-2">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
                </p>
                <p className="font-light">|</p>
                <UilSunset size={15} className="mr-1" />
                <p className="font-light">
                    Set: 
                    <span className="font-medium ml-2">{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
                </p>
                <p className="font-light">|</p>
                <UilArrowUp size={15} className="mr-1" />
                <p className="font-light">
                    High: 
                    <span className="font-medium ml-2">{`${temp_max.toFixed()}°`}</span>
                 </p>
                <p className="font-light">|</p>
                <UilArrowDown size={15} className="mr-1" />
                <p className="font-light">
                    Low: 
                    <span className="font-medium ml-2">{`${temp_min.toFixed()}°`}</span>
                </p>
            </div>
        </div>
    );
}

export default TemperatureAndDetails;