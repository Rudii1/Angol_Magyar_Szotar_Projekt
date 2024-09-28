'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const [showWords, setShowWords] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultySetting | null>(null);
    const [hungarianWords, setHungarianWords] = useState<string[]>([]);
    const [englishWords, setEnglishWords] = useState<string[]>([]);
    const [selectedHungarian, setSelectedHungarian] = useState<string | null>(null);
    const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<{ magyar: string; angol: string }[]>([]);
    const [incorrectPairs, setIncorrectPairs] = useState<{ magyar: string; angol: string }[]>([]);
    const [showRestartPopup, setShowRestartPopup] = useState(false);
    const [difficultySelected, setDifficultySelected] = useState(false);

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

    const handleBackToSelection = () => {
        setShowWords(false);
        resetGame();
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const difficulty = difficultyLevels.find(level => level.value === selectedValue);
        setSelectedDifficulty(difficulty || null);
        setDifficultySelected(!!difficulty);
    };

    const handleHungarianClick = (word: string) => {
        if (selectedHungarian === word) {
            setSelectedHungarian(null);
        } else {
            setSelectedHungarian(word);
        }
    };

    const handleEnglishClick = (word: string) => {
        if (selectedEnglish === word) {
            setSelectedEnglish(null);
        } else {
            setSelectedEnglish(word);
        }

        if (selectedHungarian && word) {
            const pairFound = wordsData[selectedDifficulty!.value].find(
                (pair: { magyar: string; angol: string }) =>
                    pair.magyar === selectedHungarian && pair.angol === word
            );

            if (pairFound) {
                setMatchedPairs(prev => [...prev, pairFound]);
            } else {
                const incorrectPair = { magyar: selectedHungarian, angol: word };
                setIncorrectPairs(prev => [...prev, incorrectPair]);
            }

            setSelectedHungarian(null);
            setSelectedEnglish(null);
        }
    };

    const handleRestartClick = () => {
        setShowRestartPopup(true);
    };

    const confirmRestart = () => {
        resetGame();
        handleStartClick();
        setShowRestartPopup(false);
    };

    const cancelRestart = () => {
        setShowRestartPopup(false);
    };

    const resetGame = () => {
        setHungarianWords([]);
        setEnglishWords([]);
        setMatchedPairs([]);
        setIncorrectPairs([]);
        setSelectedHungarian(null);
        setSelectedEnglish(null);
        setDifficultySelected(false);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-8">
            {/* Sárga-zöld színátmenet háttér */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-400 opacity-90"/>
            <h1 className="text-5xl font-bold text-white mb-8 relative z-10 transform transition-transform duration-300 hover:scale-110">
                Angol-Magyar párosító
            </h1>

            {!showWords ? (
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl z-10">
                    <p className="text-lg font-semibold text-yellow-300 mb-6 bg-gray-700 p-4 rounded-lg shadow-lg">
                        Itt ki kell választani egy nehézségi szintet. Ez alapján lesz generálva egy szó összekötő játék. Majd lesz esélyed bármikor újra kezdeni illetve változtatni a nehézségi szinten később is.
                    </p>
                    {!difficultySelected && (
                        <p className="text-red-500 mb-4">Kötelezően válassz ki egy nehézségi szintet!</p>
                    )}
                    <div className="grid grid-cols-4 gap-4">
                        <button
                            onClick={handleStartClick}
                            className={`bg-white text-black font-semibold py-3 px-4 rounded-lg ${!difficultySelected ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!difficultySelected}
                        >
                            Start
                        </button>
                        <button className="bg-white text-black font-semibold py-3 px-4 rounded-lg">
                            Extra gomb
                        </button>
                        <button className="bg-white text-black font-semibold py-3 px-4 rounded-lg">
                            Extra gomb
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
                    <button
                        onClick={() => router.push("/")}
                        className="bg-red-500 text-white font-semibold py-3 px-4 rounded-lg mt-4"
                    >
                        Vissza a főoldalra
                    </button>
                </div>
            ) : (
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl relative z-10">
                    <h2 className="text-2xl text-white mb-4">{selectedDifficulty?.label}</h2>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="flex flex-col">
                            <h3 className="text-xl text-white mb-2">Helyes párok:</h3>
                            {matchedPairs.length === 0 ? (
                                <p className="text-white">Nincsenek helyes párok!</p>
                            ) : (
                                matchedPairs.map((pair, index) => (
                                    <p key={index} className="bg-green-400 text-black p-4 rounded mb-4">
                                        {`${pair.magyar} - ${pair.angol}`}
                                    </p>
                                ))
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-xl text-white mb-2">Hibás párok:</h3>
                            {incorrectPairs.length === 0 ? (
                                <p className="text-white">Nincsenek hibás párok!</p>
                            ) : (
                                incorrectPairs.map((pair, index) => (
                                    <p key={index} className="bg-red-400 text-black p-4 rounded mb-4">
                                        {`${pair.magyar} - ${pair.angol}`}
                                    </p>
                                ))
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col mb-8 relative">
                            <h3 className="text-white mb-4">Magyar szavak:</h3>
                            {hungarianWords.map((word, index) => {
                                const isMatched = matchedPairs.some(pair => pair.magyar === word);
                                return (
                                    <div
                                        key={index}
                                        className={`p-6 rounded-full text-center text-black cursor-pointer 
                                            ${isMatched ? "bg-green-400" : incorrectPairs.some(pair => pair.magyar === word) ? "bg-red-400" : "bg-white"} 
                                            transition duration-200 ease-in-out transform hover:scale-105 mb-4`}
                                        onClick={() => handleHungarianClick(word)}
                                    >
                                        {word}
                                    </div>
                                );
                            })}
                            {selectedHungarian && selectedEnglish && (
                                <div className="absolute bg-blue-400 w-1"
                                     style={{height: '100%', top: '50%', transform: 'translateY(-50%)'}}/>
                            )}
                        </div>
                        <div className="flex flex-col mb-8 relative">
                            <h3 className="text-white mb-4">Angol szavak:</h3>
                            {englishWords.map((word, index) => {
                                const isMatched = matchedPairs.some(pair => pair.angol === word);
                                return (
                                    <div
                                        key={index}
                                        className={`p-6 rounded-full text-center text-black cursor-pointer 
                                            ${isMatched ? "bg-green-400" : incorrectPairs.some(pair => pair.angol === word) ? "bg-red-400" : "bg-white"} 
                                            transition duration-200 ease-in-out transform hover:scale-105 mb-4`}
                                        onClick={() => handleEnglishClick(word)}
                                    >
                                        {word}
                                    </div>
                                );
                            })}
                            {selectedHungarian && selectedEnglish && (
                                <div className="absolute bg-blue-400 w-1"
                                     style={{height: '100%', top: '50%', transform: 'translateY(-50%)'}}/>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleRestartClick}
                        className="bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg mb-4"
                    >
                        Újrakezdés
                    </button>
                    <button
                        onClick={handleBackToSelection}
                        className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg"
                    >
                        Vissza a nehézségi szint kiválasztásához
                    </button>

                    {showRestartPopup && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                            <div className="bg-white p-8 rounded-lg">
                                <h2 className="text-xl mb-4">Biztosan újra akarod kezdeni?</h2>
                                <div className="flex justify-between">
                                    <button
                                        onClick={confirmRestart}
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
                                    >
                                        Igen
                                    </button>
                                    <button
                                        onClick={cancelRestart}
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg"
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
