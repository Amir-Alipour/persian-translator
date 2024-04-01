"use client";

import { typeWrite } from "@/utils/typeWrite";
import { useState } from "react";

export default function Home() {
    const [text, setText] = useState("");

    const [translation, setTranslation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModelLoading, setIsModelLoading] = useState(false);

    const handleTranslate = async () => {
        if (!text || text?.trim() === "") return;

        setIsLoading(true);
        setTranslation("");

        await fetch("/api/translate", {
            method: "POST",
            body: JSON.stringify({ text }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setIsModelLoading(true);
                    setTimeout(() => {
                        handleTranslate();
                    }, 5000);
                } else {
                    setIsModelLoading(false);
                    setIsLoading(false);
                    typeWrite(
                        data[0].translation_text,
                        translation,
                        setTranslation
                    );
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log("client error : ", err);
            });
    };

    const handleGenerate = async () => {
        if (!text || text?.trim() === "") return;

        setIsLoading(true);

        await fetch("/api/fill", {
            method: "POST",
            body: JSON.stringify({ text }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setIsModelLoading(true);
                    setTimeout(() => {
                        handleGenerate();
                    }, 5000);
                } else {
                    setIsModelLoading(false);
                    setIsLoading(false);
                    typeWrite(data.generated_text, text, setText);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log("client error : ", err);
            });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5 pt-10 md:p-24">
            <div
                className={`w-full max md:container flex flex-col items-center md:items-start gap-y-3 ${
                    (isLoading || isModelLoading) && "pointer-events-none"
                }`}
            >
                <div className="w-full flex flex-wrap items-center justify-between">
                    <h2>English to Persian tranlation : </h2>
                    <div className="flex items-center gap-x-1 -mb-1">
                        {isModelLoading && (
                            <>
                                <p className="text-lg font-bold ">
                                    AI model is loading.
                                </p>
                                <p>It may take time.</p>
                                <p>be patient</p>
                            </>
                        )}
                    </div>
                </div>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    name="text"
                    className="w-full border-2 border-black transition-all rounded-lg resize-none outline-none p-5"
                    placeholder="Type English"
                    rows={7}
                ></textarea>

                <textarea
                    dir="rtl"
                    value={translation}
                    readOnly={true}
                    className="w-full border border-zinc-300 rounded-lg p-5 resize-none outline-none"
                    rows={7}
                    placeholder={isLoading ? "درحال ترجمه ..." : "نتیجه فارسی"}
                ></textarea>

                <div className="flex gap-x-5">
                    <button
                        onClick={handleTranslate}
                        className="w-[120px] transition-all hover:shadow-[0px_2px_5px_0px_#1a202c] p-4 bg-black text-white rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading" : "Translate"}
                    </button>

                    <button
                        onClick={handleGenerate}
                        className="w-[120px] transition-all p-4 border border-black rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading" : "Random Fill"}
                    </button>
                </div>
            </div>
        </main>
    );
}
