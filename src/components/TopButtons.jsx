import React from 'react'

function TopButtons(setQuery) {
    const cities = [
        {
            id: 1,
            title: 'Kyiv'
        },
        {
            id: 1,
            title: 'Kharkiv'
        },
        {
            id: 1,
            title: 'Dnipro'
        },
        {
            id: 1,
            title: 'Odesa'
        },
        {
            id: 1,
            title: 'Lviv'
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