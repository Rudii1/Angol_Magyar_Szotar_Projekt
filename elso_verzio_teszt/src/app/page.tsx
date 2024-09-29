'use client';

import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/game");
  };

  const handleManualClick = () => {
    router.push("/manual-game");
  };

  const handleDictionaryClick = () => {
    router.push("/dictionary-edit");
  };

  const handleOtleteljClick = () => {
    router.push("/idea-page"); // Itt az új útvonal
  };

  return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-red-500 p-8 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-50 animate-pulse" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?neon,lights,abstract')" }} />
        <h1 className="text-6xl font-extrabold text-white mb-8 transform transition-transform duration-300 hover:scale-110 text-shadow">
          Angol-Magyar párosító
        </h1>
        <div className="bg-gray-800 bg-opacity-80 p-10 rounded-lg shadow-lg w-full max-w-3xl transition-all duration-300 ease-in-out z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
                onClick={handleStartClick}
                className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110 hover:shadow-xl"
            >
              Start
            </button>
            <button
                onClick={handleManualClick}
                className="bg-green-400 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110 hover:shadow-xl"
            >
              Manuális játék
            </button>
            <button
                onClick={handleDictionaryClick}
                className="bg-purple-400 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110 hover:shadow-xl"
            >
              Szótár
            </button>
            <button
                onClick={handleOtleteljClick}  // Az új funkció gombja
                className="bg-red-400 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110 hover:shadow-xl"
            >
              Ötletelj
            </button>
          </div>
        </div>
        <footer className="mt-10 text-white text-sm z-10">
          <p>© 2024 Angol-Magyar Játék. Minden jog fenntartva.</p>
          <p>A komoly csávók azért oda verték ezt a projektet</p>
          <p>Köszönjük a sok sok figyelmet</p>
        </footer>
      </div>
  );
};

export default HomePage;
