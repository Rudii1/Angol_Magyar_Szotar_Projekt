'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const OtleteljPage = () => {
    const [newIdea, setNewIdea] = useState("");
    const [ideas, setIdeas] = useState<any[]>([]);
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchIdeas = async () => {
            const response = await fetch('/api/otletek');
            const data = await response.json();
            setIdeas(data);
        };

        fetchIdeas();
    }, []);

    const handleAddIdea = async () => {
        if (newIdea) {
            const response = await fetch('/api/otletek', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newIdea }),
            });

            if (response.ok) {
                const addedIdea = await response.json();
                setIdeas([...ideas, { idea: newIdea }]);
                setNewIdea("");
            } else {
                alert('Hiba történt az ötlet hozzáadása során!');
            }
        } else {
            alert("Kérlek, írj be egy ötletet!");
        }
    };

    const handleBackToHome = () => {
        router.push('/');
    };

    const toggleDisclaimer = () => {
        setShowDisclaimer(!showDisclaimer);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-blue-200 p-8">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">Itt tudsz ötletelni</h1>

                <div className="mb-6">
                    <input
                        type="text"
                        value={newIdea}
                        onChange={(e) => setNewIdea(e.target.value)}
                        placeholder="Írd be az új ötleted"
                        className="border border-gray-400 rounded-lg p-3 mr-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    />
                    <button
                        onClick={handleAddIdea}
                        className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition-transform duration-200 hover:bg-green-600 hover:scale-105"
                    >
                        Ötlet hozzáadása
                    </button>
                </div>

                <div className="bg-gray-100 text-gray-800 p-4 rounded-lg shadow-lg w-full">
                    <h2 className="text-3xl font-bold mb-4">Ötletek:</h2>
                    {ideas.length === 0 ? (
                        <p className="text-gray-600">Nincsenek ötletek.</p>
                    ) : (
                        <ul className="space-y-2">
                            {ideas.map((idea, index) => (
                                <li key={index} className="p-2 bg-white rounded shadow-md transition duration-200 hover:bg-gray-200">
                                    {idea.idea}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex justify-between mt-8 w-full">
                    <button
                        onClick={handleBackToHome}
                        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
                    >
                        Vissza a főoldalra
                    </button>

                    <button
                        onClick={toggleDisclaimer}
                        className="bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-transform duration-300 hover:bg-yellow-600 hover:scale-105"
                    >
                        &#33;
                    </button>
                </div>

                {showDisclaimer && (
                    <div className="mt-6 bg-yellow-200 text-black p-4 rounded-lg shadow-lg transition-opacity duration-500">
                        <p className="font-bold">
                            Szóval az ügyes csapatunk tiszteletben tartja az önök ötleteit.
                        </p>
                        <p>
                            Kérnénk szépen, hogy írják ide le miben tudnánk fejlődni. Megcsinálni nem lesz időnk,
                            de azért igyekszünk tiszteletben és szeretetben élni mindenkivel.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OtleteljPage;
