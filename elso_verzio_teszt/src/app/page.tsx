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
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#9333EA] to-[#F472B6] p-8 overflow-hidden">
        {/* Animált háttér elemek */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-60 w-96 h-96 rounded-full blur-3xl animate-blob top-10 left-10"></div>
          <div className="absolute bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 opacity-60 w-80 h-80 rounded-full blur-3xl animate-blob animation-delay-2000 bottom-10 right-10"></div>
        </div>

        <h1 className="text-7xl font-extrabold text-white mb-16 transform transition-transform duration-500 hover:scale-105 text-shadow-lg drop-shadow-lg">
          Angol-Magyar Párosító
        </h1>

        {/* Gombok interaktív hatásokkal */}
        <div className="bg-gray-900 bg-opacity-80 p-12 rounded-lg shadow-2xl w-full max-w-3xl transition-all duration-500 ease-in-out z-10 backdrop-blur-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
                onClick={handleStartClick}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-2xl py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 hover:scale-110 hover:shadow-2xl hover:brightness-125"
            >
              START
            </button>
            <button
                onClick={handleManualClick}
                className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold text-2xl py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 hover:scale-110 hover:shadow-2xl hover:brightness-125"
            >
              Manuális Játék
            </button>
            <button
                onClick={handleDictionaryClick}
                className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-bold text-2xl py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 hover:scale-110 hover:shadow-2xl hover:brightness-125"
            >
              Szótár
            </button>
            <button
                onClick={handleOtleteljClick}
                className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold text-2xl py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 hover:scale-110 hover:shadow-2xl hover:brightness-125"
            >
              Ötletelj
            </button>
          </div>
        </div>

        {/* Lábjegyzet animációval */}
        <footer className="mt-20 text-white text-center z-10 animate-fade-in">
          <p className="mb-2 text-lg">© 2024 Angol-Magyar Játék. Minden jog fenntartva.</p>
          <p className="mb-2 text-lg">A komoly csávók azért oda verték ezt a projektet</p>
          <p className="text-lg">Köszönjük a sok sok figyelmet</p>
        </footer>
      </div>
  );
};

export default HomePage;
