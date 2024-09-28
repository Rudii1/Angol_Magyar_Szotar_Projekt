'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import wordsData from "../../../data/dictionary.json"; // Szótár fájl elérési útja

const WordMatchingGame = () => {
    const router = useRouter();
    const [showWords, setShowWords] = useState(false);
    const [numberOfPairs, setNumberOfPairs] = useState(2); // Alapértelmezett szópár szám
    const [hungarianWords, setHungarianWords] = useState<string[]>([]);
    const [englishWords, setEnglishWords] = useState<string[]>([]);
    const [selectedHungarian, setSelectedHungarian] = useState<string | null>(null);
    const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<{ magyar: string; angol: string }[]>([]);
    const [incorrectPairs, setIncorrectPairs] = useState<{ magyar: string; angol: string }[]>([]);
    const [showRestartPopup, setShowRestartPopup] = useState(false);

    const maxPairs = wordsData.length;

    const handleStartClick = () => {
        const randomPairs = getRandomPairs(wordsData, numberOfPairs);

        const hungarian = randomPairs.map(pair => pair.magyar);
        const english = randomPairs.map(pair => pair.angol);

        const shuffledHungarian = hungarian.sort(() => Math.random() - 0.5);
        const shuffledEnglish = english.sort(() => Math.random() - 0.5);

        setHungarianWords(shuffledHungarian);
        setEnglishWords(shuffledEnglish);
        setShowWords(true);
    };

    const getRandomPairs = (allPairs: { magyar: string; angol: string }[], count: number) => {
        const shuffled = allPairs.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handleBackToSelection = () => {
        setShowWords(false);
        resetGame();
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfPairs(parseInt(event.target.value, 10));
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
            const pairFound = wordsData.find(
                (pair) =>
                    pair.magyar === selectedHungarian && pair.angol === word
            );

            if (pairFound) {
                setMatchedPairs((prev) => [...prev, pairFound]);
            } else {
                const incorrectPair = { magyar: selectedHungarian, angol: word };
                setIncorrectPairs((prev) => [...prev, incorrectPair]);
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
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-8">
                Angol-Magyar párosító
            </h1>

            {!showWords ? (
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl">
                    <p className="text-2xl font-bold text-yellow-300 mb-4 text-center">
                        Nah el érkeztünk a saját játék létrehozása menüponthoz.
                        Itt ki tudod választani a saját szótárból hozzá adott szópárokból összeállított szavakból a játékot.
                        <br />
                        <span className="font-normal">
                            Disclaimer: Csak annyi szóból tudsz játékot kreálni magadnak, ahány darab szópár van a szótárban.
                        </span>
                    </p>
                    <label className="text-white mb-2">Szópárok száma: {numberOfPairs}</label>
                    <input
                        type="range"
                        min="2"
                        max={maxPairs}
                        value={numberOfPairs}
                        onChange={handleSliderChange}
                        className="w-full"
                    />
                    <button
                        onClick={handleStartClick}
                        className="bg-white text-black font-semibold py-3 px-4 rounded-lg mt-4"
                    >
                        Start
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-red-500 text-white font-semibold py-3 px-4 rounded-lg mt-4"
                    >
                        Vissza a főoldalra
                    </button>
                </div>
            ) : (
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl relative">
                    <h2 className="text-2xl text-white mb-4">Párosító játék</h2>
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
                        <div className="flex flex-col mb-8">
                            <h3 className="text-white mb-4">Magyar szavak:</h3>
                            {hungarianWords.map((word, index) => (
                                <div
                                    key={index}
                                    className={`p-6 rounded-full text-center text-black cursor-pointer 
                                        ${matchedPairs.some(pair => pair.magyar === word) ? "bg-green-400" :
                                        incorrectPairs.some(pair => pair.magyar === word) ? "bg-red-400" :
                                            "bg-white"} 
                                        transition duration-200 ease-in-out transform hover:scale-105 mb-4`}
                                    onClick={() => handleHungarianClick(word)}
                                >
                                    {word}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col mb-8">
                            <h3 className="text-white mb-4">Angol szavak:</h3>
                            {englishWords.map((word, index) => (
                                <div
                                    key={index}
                                    className={`p-6 rounded-full text-center text-black cursor-pointer 
                                        ${matchedPairs.some(pair => pair.angol === word) ? "bg-green-400" :
                                        incorrectPairs.some(pair => pair.angol === word) ? "bg-red-400" :
                                            "bg-white"} 
                                        transition duration-200 ease-in-out transform hover:scale-105 mb-4`}
                                    onClick={() => handleEnglishClick(word)}
                                >
                                    {word}
                                </div>
                            ))}
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
                        className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg mb-4"
                    >
                        Vissza a csúszkához
                    </button>
                    {showRestartPopup && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg">
                                <h2 className="text-xl mb-4">Biztosan újra akarod kezdeni?</h2>
                                <div className="flex justify-between">
                                    <button
                                        onClick={confirmRestart}
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg"
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
