import React from 'react'

const Upcoming = () => {
    const events = [
        { time: '10 Am', title: 'Research', duration: '30 Minute' },
        { time: '11 Am', title: 'Landing Page Design', duration: '30 Minute' },
        { time: '12 Pm', title: 'Dashboard Design', duration: '30 Minute' },
        { time: '1 Pm', title: 'Design Theory', duration: '30 Minute' },
    ];
    return (
        <div className='w-full p-4 bg-white border-2 border-yellow-400 rounded-md'>
            <h3 className="text-lg font-semibold mb-4">Upcoming</h3>
            <div className="space-y-4">
                {events.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">{event.time}</div>
                        <div className={`w-2 h-2 rounded-full bg-${['purple', 'pink', 'blue', 'green'][index]}-500`} />
                        <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs text-gray-500">{event.duration}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Upcoming