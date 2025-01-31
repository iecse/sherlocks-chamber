import React from 'react';
import Button from './Button';

const TeamForm = () => {
    return (
        <div className="flex items-center justify-center min-h-auto mt-20">
            <form className="  rounded px-0 py-6 max-w-sm w-full ">


                <div className="mb-4 ">
                    <label className="block text-white text-md font-bold mb-2  " htmlFor="team-name">
                        Team Leader ID
                    </label>
                    <input
                        className="shadow appearance-none border rounded  w-100 py-2 px-3 bg-[#B9B9B9] leading-tight focus:outline-none focus:shadow-outline"
                        id="team-name"
                        type="text"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white text-md  font-bold mb-2 " htmlFor="team-number">
                        Team Number
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-100  py-2 px-3 bg-[#B9B9B9] leading-tight focus:outline-none focus:shadow-outline"
                        id="team-number"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block  text-white   text-md font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded  bg-[#B9B9B9] w-100  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="*************"
                        required
                    />
                </div>

                <div className="flex items-center justify-center ">
                    <Button>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TeamForm;
