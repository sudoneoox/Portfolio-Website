import React, { useState } from "react";
import { TextGenerator } from "./ui/TextGenerator.tsx"; // Adjust the import path as necessary
import { DotBackgroundDemo } from "./ui/grid-background.tsx"; // Adjust the import path as necessary
import '../index.css';

export function ParentComponent() {
    let [isEvervaultCardVisible, setIsEvervaultCardVisible] = useState(true);
    let [isTextGeneratorVisible, setIsTextGeneratorVisible] = useState(true);

    const handleClick = () => {
        setIsTextGeneratorVisible(false);
    };

    if (!isEvervaultCardVisible) return null;

    return (
        <>
            {isTextGeneratorVisible ? (
                <TextGenerator className="relative font-bold z-1 text-pretty justify-center" setIsVisible={handleClick} />
            ) : (
                <div>
                    <DotBackgroundDemo className="h-[50rem] w-full dark:bg-black bg-black  bg-dot-white/[0.3] relative flex items-center justify-center"/>
                </div>
            )}
        </>
    );
}
