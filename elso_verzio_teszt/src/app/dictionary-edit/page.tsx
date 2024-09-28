'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DictionaryEditPage = () => {
    const router = useRouter();
    const [hungarianWord, setHungarianWord] = useState("");
    const [englishWord, setEnglishWord] = useState("");
    const [words, setWords] = useState<any[]>([]); // any[] helyett specifikus típust is használhatsz

    // Szavak betöltése az API-ból a komponens betöltésekor
    useEffect(() => {
        const fetchWords = async () => {
            const response = await fetch('/api/dictionary');
            const data = await response.json();
            setWords(data);
        };

        fetchWords();
    }, []);

    const handleBackToHome = () => {
        router.push("/"); // Vissza a főoldalra navigál
    };

    const handleAddWord = async () => {
        if (hungarianWord && englishWord) {
            const response = await fetch('/api/dictionary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hungarian: hungarianWord, english: englishWord }),
            });

            if (response.ok) {
                const newWord = await response.json();
                setWords([...words, { magyar: hungarianWord, angol: englishWord }]);
                setHungarianWord("");
                setEnglishWord("");
            } else {
                alert('Hiba történt a szó hozzáadása során!');
            }
        } else {
            alert("Kérlek, töltsd ki mindkét mezőt!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-8">
            <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl text-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-8">Szótár Módosítás</h1>


                <p className="text-lg font-semibold text-yellow-300 mb-6 bg-gray-700 p-4 rounded-lg shadow-lg">
                    Itt tudsz manuálisan saját magadnak egy szótárat létrehozni. Ha lementesz egy szópárt,  akkor egy másik menüpontban fogsz tudni saját magadnak egy játékot létrehozni.
                </p>


                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-black rounded-lg shadow-lg border border-gray-300">
                        <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            <th className="py-3 px-4 border-b border-gray-300">Magyar Szavak</th>
                            <th className="py-3 px-4 border-b border-gray-300">Angol Szavak</th>
                        </tr>
                        </thead>
                        <tbody>
                        {words.length === 0 ? (
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300 text-center" colSpan={2}>Nincsenek szavak hozzáadva</td>
                            </tr>
                        ) : (
                            words.map((word, index) => (
                                <tr key={index} className="hover:bg-gray-200 transition duration-300">
                                    <td className="py-2 px-4 border-b border-gray-300">{word.magyar}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{word.angol}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Itt adunk bátyám hozzá egy szót */}
                <div className="mt-6">
                    <input
                        type="text"
                        value={hungarianWord}
                        onChange={(e) => setHungarianWord(e.target.value)}
                        placeholder="Magyar szó"
                        className="border rounded-lg p-2 mr-2 text-black" // Fekete szöveg
                    />
                    <input
                        type="text"
                        value={englishWord}
                        onChange={(e) => setEnglishWord(e.target.value)}
                        placeholder="Angol szó"
                        className="border rounded-lg p-2 mr-2 text-black" // Fekete szöveg
                    />
                    <button
                        onClick={handleAddWord}
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Hozzáadás
                    </button>
                </div>


                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleBackToHome}
                        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg mt-8 transition-transform duration-300 hover:scale-105"
                    >
                        Vissza a főoldalra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DictionaryEditPage;
