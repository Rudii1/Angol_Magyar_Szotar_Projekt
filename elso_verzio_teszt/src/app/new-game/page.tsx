'use client';

import React from "react";
import { useRouter } from "next/navigation";

const NewGamePage = () => {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-8">Szia</h1>
            <button
                onClick={handleHomeClick}
                className="bg-white text-black font-semibold py-3 px-4 rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110"
            >
                Főoldal
            </button>
        </div>
    );
};

export default NewGamePage;
