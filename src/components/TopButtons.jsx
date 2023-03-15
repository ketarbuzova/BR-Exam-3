import React from 'react'

function TopButtons({ setQuery }) {
    const cities = [
        {
            id: 1,
            title: 'London'
        },
        {
            id: 2,
            title: 'Paris'
        },
        {
            id: 3,
            title: 'Berlin'
        },
        {
            id: 4,
            title: 'Stambul'
        },
        {
            id: 5,
            title: 'New York'
        },
    ]

    return (
        <div className="flex items-center justify-around my-6">
            {cities.map ((city) => (
                <button key={city.id} className="text-white text-lg font-medium cursor-pointer transition hover:scale-110"
                onClick={() => setQuery({ q: city.title })}>
                    {city.title}
                </button>
            ))}
        </div>
    );
}

export default TopButtons;
