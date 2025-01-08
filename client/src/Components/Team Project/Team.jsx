import React from 'react'
import { Link } from 'react-router-dom';
import ShowTeamProject from './ShowTeamProject';

const Team = () => {
    return (
        <div className="w-full h-full bg-gray-200">
            <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
                <Link to={`/${name}/all_tasks`} className="text-3xl font-semibold">All Team Project List</Link>
                <div className="flex gap-4">
                    <Link className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"> Create New Team</Link>
                    <button className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90">Filter</button>
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 px-4 py-10">
                <ShowTeamProject/>
            </div>
        </div>
    )
}

export default Team