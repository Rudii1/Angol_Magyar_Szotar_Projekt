'use client'

import React, { useState } from "react";

interface DifficultySetting {
    label: string;
    value: string;
    wordPairs: number;
}

const difficultyLevels: DifficultySetting[] = [
    { label: "Nagyon könnyű", value: "very-easy", wordPairs: 2 },
    { label: "Könnyű", value: "easy", wordPairs: 3 },
    { label: "Normális", value: "normal", wordPairs: 5 },
    { label: "Nehéz", value: "hard", wordPairs: 7 },
    { label: "Kurva nehéz", value: "very-hard", wordPairs: 10 }
];

const WordMatchingGame = () => {
    const [showWords, setShowWords] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultySetting | null>(null);

    const handleStartClick = () => {
        setShowWords(true);
    };

    const handleBackClick = () => {
        setShowWords(false);
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const difficulty = difficultyLevels.find(level => level.value === selectedValue);
        setSelectedDifficulty(difficulty || null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-8 transform transition-transform duration-300 hover:scale-110">
                Angol-Magyar párosító
            </h1>

            {!showWords ? (
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl transition-all duration-300 ease-in-out group">
                    <div className="grid grid-cols-4 gap-4">
                        <button
                            onClick={handleStartClick}
                            className="bg-white text-black font-semibold py-3 px-4 rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 group-hover:scale-110"
                        >
                            Start
                        </button>
                        <button className="bg-white text-black font-semibold py-3 px-4 rounded-lg">
                            Extra gomb
                        </button>
                        <button className="bg-white text-black font-semibold py-3 px-4 rounded-lg">
                            Szótár
                        </button>
                        <select
                            onChange={handleDifficultyChange}
                            className="bg-white text-black font-semibold py-3 px-4 rounded-lg"
                        >
                            <option value="">Válassz nehézségi szintet</option>
                            {difficultyLevels.map(level => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl">
                    <h2 className="text-2xl text-white mb-4">{selectedDifficulty?.label}</h2>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        {[...Array(selectedDifficulty?.wordPairs)].map((_, index) => (
                            <React.Fragment key={index}>
                                <div className="bg-white p-8 rounded-full text-center text-black">
                                    Magyar szó
                                </div>
                                <div className="bg-white p-8 rounded-full text-center text-black">
                                    Angol szó
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <button
                        onClick={handleBackClick}
                        className="bg-white text-black font-semibold py-3 px-4 rounded-lg"
                    >
                        Vissza
                    </button>
                </div>
            )}
        </div>
    );
};

export default WordMatchingGame;
