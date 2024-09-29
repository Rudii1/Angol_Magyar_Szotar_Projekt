'use client';

import React from "react";
import { useRouter } from "next/navigation";

const ManualGamePage = () => {
    const router = useRouter();

    const handleGameClick = () => {
        router.push("/new-game");
    };

    const handleDictionaryClick = () => {
        router.push("/dictionary-edit");
    };

    const handleBackClick = () => {
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-transparent p-8">
            <div className="bg-brown-800 p-10 rounded-lg shadow-lg w-full max-w-3xl text-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-8">Manuális játék</h1>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleGameClick}
                        className="bg-white text-black font-semibold py-3 px-4 rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110"
                    >
                        Játék
                    </button>
                    <button
                        onClick={handleDictionaryClick}
                        className="bg-white text-black font-semibold py-3 px-4 rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110"
                    >
                        Szótár Módosítás
                    </button>
                </div>
                <div className="mt-8">
                    <button
                        onClick={handleBackClick}
                        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-blue-600 hover:scale-110"
                    >
                        Vissza a főoldalra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManualGamePage;
