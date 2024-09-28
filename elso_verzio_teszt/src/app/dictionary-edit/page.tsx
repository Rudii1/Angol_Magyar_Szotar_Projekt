'use client';

import React from "react";

const DictionaryEditPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-8">
            <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl text-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-8">Szótár Módosítás</h1>
                <p className="text-white">Itt tudod szerkeszteni a szótárat!</p>
                {/* Ide jöhet a szótár módosító funkció */}
            </div>
        </div>
    );
};

export default DictionaryEditPage;
