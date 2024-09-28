'use client';

import React, { useState } from "react";
import wordsData from "../../data/words.json";

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
    const [hungarianWords, setHungarianWords] = useState<string[]>([]);
    const [englishWords, setEnglishWords] = useState<string[]>([]);
    const [selectedHungarian, setSelectedHungarian] = useState<string | null>(null);
    const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<{ magyar: string; angol: string }[]>([]);
    const [incorrectPairs, setIncorrectPairs] = useState<{ magyar: string; angol: string }[]>([]);
    const [showRestartPopup, setShowRestartPopup] = useState(false); // Új state a popup kezeléséhez

    const handleStartClick = () => {
        if (selectedDifficulty) {
            const pairs = wordsData[selectedDifficulty.value];

            const hungarian = pairs.map(pair => pair.magyar);
            const english = pairs.map(pair => pair.angol);

            const shuffledHungarian = hungarian.sort(() => Math.random() - 0.5);
            const shuffledEnglish = english.sort(() => Math.random() - 0.5);

            setHungarianWords(shuffledHungarian);
            setEnglishWords(shuffledEnglish);
            setShowWords(true);
        }
    };

    const handleBackClick = () => {
        setShowWords(false);
        resetGame();
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const difficulty = difficultyLevels.find(level => level.value === selectedValue);
        setSelectedDifficulty(difficulty || null);
    };

    const handleHungarianClick = (word: string) => {
        if (selectedHungarian === word) {
            setSelectedHungarian(null); // Ha a szó már ki van választva, akkor töröljük a választást
        } else {
            setSelectedHungarian(word);
        }
    };

    const handleEnglishClick = (word: string) => {
        if (selectedEnglish === word) {
            setSelectedEnglish(null); // Ha a szó már ki van választva, akkor töröljük a választást
        } else {
            setSelectedEnglish(word);
        }

        // Párosító elenőrzés
        if (selectedHungarian && word) {
            const pairFound = wordsData[selectedDifficulty!.value].find(
                (pair: { magyar: string; angol: string }) =>
                    pair.magyar === selectedHungarian && pair.angol === word
            );

            if (pairFound) {
                // Helyes párosítás esetén
                setMatchedPairs(prev => [...prev, pairFound]);
            } else {
                // Hibás párosítás esetén
                const incorrectPair = { magyar: selectedHungarian, angol: word };
                setIncorrectPairs(prev => [...prev, incorrectPair]);
            }

            setSelectedHungarian(null); // Választás törlése
            setSelectedEnglish(null); // Választás törlése
        }
    };

    const handleRestartClick = () => {
        setShowRestartPopup(true); // Popup megjelenítése
    };

    const confirmRestart = () => {
        resetGame();
        handleStartClick(); // Játék újraindítása
        setShowRestartPopup(false); // Popup bezárása
    };

    const cancelRestart = () => {
        setShowRestartPopup(false); // Popup bezárása
    };

    const resetGame = () => {
        setHungarianWords([]);
        setEnglishWords([]);
        setMatchedPairs([]);
        setIncorrectPairs([]);
        setSelectedHungarian(null);
        setSelectedEnglish(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-8 transform transition-transform duration-300 hover:scale-110">
                Angol-Magyar párosító
            </h1>

            {!showWords ? (
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl">
                    <div className="grid grid-cols-4 gap-4">
                        <button
                            onClick={handleStartClick}
                            className="bg-white text-black font-semibold py-3 px-4 rounded-lg"
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
                        <div className="flex flex-col">
                            {hungarianWords.map((word, index) => {
                                const isMatched = matchedPairs.some(pair => pair.magyar === word);
                                const isIncorrect = incorrectPairs.some(pair => pair.magyar === word);

                                return (
                                    <div
                                        key={index}
                                        className={`p-8 rounded-full text-center text-black cursor-pointer 
                                            ${isMatched ? "bg-green-400" : isIncorrect ? "bg-red-400" : "bg-white"}`}
                                        onClick={() => handleHungarianClick(word)}
                                        style={{ marginBottom: '10px' }} // Margin a szavak között
                                    >
                                        {word}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col">
                            {englishWords.map((word, index) => {
                                const isMatched = matchedPairs.some(pair => pair.angol === word);
                                const isIncorrect = incorrectPairs.some(pair => pair.angol === word);

                                return (
                                    <div
                                        key={index}
                                        className={`p-8 rounded-full text-center text-black cursor-pointer 
                                            ${isMatched ? "bg-green-400" : isIncorrect ? "bg-red-400" : "bg-white"}`}
                                        onClick={() => handleEnglishClick(word)}
                                        style={{ marginBottom: '10px' }} // Margin a szavak között
                                    >
                                        {word}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Párok külön oszlopokban */}
                    <div className="flex justify-between mb-4 text-white">
                        <div>
                            {matchedPairs.length > 0 && (
                                <div>
                                    <h3 className="text-green-400">Helyes párok:</h3>
                                    {matchedPairs.map((pair, index) => (
                                        <p key={index}>{`${pair.magyar} - ${pair.angol}`}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            {incorrectPairs.length > 0 && (
                                <div>
                                    <h3 className="text-red-400">Helytelen párok:</h3>
                                    {incorrectPairs.map((pair, index) => (
                                        <p key={index}>{`${pair.magyar} - ${pair.angol}`}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={handleRestartClick}
                            className="bg-red-500 text-black font-semibold py-2 px-4 rounded-lg"
                        >
                            Restart
                        </button>
                        <button
                            onClick={handleBackClick}
                            className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg"
                        >
                            Vissza
                        </button>
                    </div>

                    {/* Popup rész ez lesz , bizony ez lesz */}
                    {showRestartPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-lg font-semibold mb-4">Életem biztos újra kezded??</p>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={confirmRestart}
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg"
                                    >
                                        Igen
                                    </button>
                                    <button
                                        onClick={cancelRestart}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                                    >
                                        Nem
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WordMatchingGame;
