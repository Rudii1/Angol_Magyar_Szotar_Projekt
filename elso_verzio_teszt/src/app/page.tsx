'use client';

import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/game"); // Azonnal a játék oldalra visz
  };

  const handleManualClick = () => {
    router.push("/manual-game"); // Manuális játékra visz
  };

  const handleDictionaryClick = () => {
    router.push("/dictionary-edit"); // Szótár oldalra visz
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 transform transition-transform duration-300 hover:scale-110">
          Angol-Magyar párosító
        </h1>
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-4 gap-4">
            <button
                onClick={handleStartClick}
                className="bg-white text-black font-semibold py-3 px-4 rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110"
            >
              Start
            </button>
            <button
                onClick={handleManualClick}
                className="bg-white text-black font-semibold py-3 px-4 rounded-lg"
            >
              Manuális játék
            </button>
            <button
                onClick={handleDictionaryClick}
                className="bg-white text-black font-semibold py-3 px-4 rounded-lg"
            >
              Szótár
            </button>
            <select className="bg-white text-black font-semibold py-3 px-4 rounded-lg">
              <option value="very-easy">Nagyon könnyű</option>
              <option value="easy">Könnyű</option>
              <option value="normal">Normális</option>
              <option value="hard">Nehéz</option>
              <option value="very-hard">Kurva nehéz</option>
            </select>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
