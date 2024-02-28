import React, { useState } from "react";
import { TextGenerator } from "./ui/TextGenerator.tsx"; // Adjust the import path as necessary
import { DotBackgroundDemo } from "./ui/grid-background.tsx"; // Adjust the import path as necessary
import { Xterm } from "./ui/Terminal.tsx";
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
                <TextGenerator className="dark:bg-black bg-dot-white/[0.3]  relative font-bold z-20 text-pretty justify-center" setIsVisible={handleClick} />
            ) : (
                <>
                    {/* <DotBackgroundDemo className="h-[50rem] w-full dark:bg-black bg-black  bg-dot-white/[0.3] relative flex items-center justify-center"/> */}
                    <Xterm className={"h-[50rem] w-full dark:bg-black bg-black  bg-dot-white/[0.3] relative flex items-center justify-center"}/>
                </>
            )}
        </>
    );
}
