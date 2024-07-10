import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react"

export default function HigherLower ({data}: {data: any}) {

    const randomWord = () => {
        let word = data[Math.floor(Math.random() * data.length)];
        while (word[1] < 5) {
            word = data[Math.floor(Math.random() * data.length)];
        }
        return word;
    }

    const [firstWord, setFirstWord] = useState(randomWord());
    const [secondWord, setSecondWord] = useState(randomWord());
    const [gameState, setGameState] = useState("unanswered");
    const [score, setScore] = useState(0);
    const usages = useMotionValue(0);
    const rounded = useTransform(usages, latest => Math.round(latest));

    const onAnswerClicked = (higher: boolean) => {
        if (higher && firstWord[1] <= secondWord[1] || !higher && firstWord[1] >= secondWord[1]) {
            usages.set(0);
            animate(usages, secondWord[1], {
                duration: 1
            })
            setGameState("loading");
            setTimeout(() => {
                setGameState("unanswered");
                setFirstWord(secondWord);
                setSecondWord(randomWord());
                setScore(score + 1);
            }, 1300);
            
        } else {
            usages.set(0);
            animate(usages, secondWord[1], {
                duration: 1
            })
            setGameState("loading");
            setTimeout(() => {
                setGameState("wrong");
            }, 1300);
        }
    }

    return (
        <>
            <div className="bg-accent rounded-t-md flex justify-center items-center p-1">
                <h3 className="font-bold text-xl">Higher/Lower</h3>
            </div>
            <div className="flex relative bg-semi-black mb-4 rounded-md p-4 h-48 items-center">
                    <motion.div variants={{start: {opacity: [0, 100]}, stop: {opacity: 0}}} animate={gameState === "wrong" ? "start" : "stop"} transition={{type: "easeIn"}} className="w-full h-full absolute left-0 top-0 rounded-md bg-black bg-opacity-85 z-10 flex justify-center items-center flex-col gap-2 border-2 border-semi-black" style={{display: gameState === "wrong" ? "flex" : "none"}}>
                        <p className="text-white font-medium text-3xl">Score: {score}</p>
                        <button className="text-accent px-6 py-2 border border-white rounded-md font-medium bg-black hover:bg-white hover:text-black transition duration-200" onClick={() => {setGameState("unanswered"); setScore(0); setFirstWord(randomWord()); setSecondWord(randomWord());}}>Try again</button>
                    </motion.div>
                
                <div className="bg-white rounded-full size-12 flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">VS</div>
                <p className="absolute right-3 bottom-2 text-white">Score: {score}</p>
                <motion.div className="w-1/2 flex justify-center items-center" variants={{start: {scale: [.8, 1]}, stop: {scale: 1}}} animate={gameState === "unanswered" ? "start" : "stop"}>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-4xl  text-white">"{firstWord[0]}"</p>
                        <p className=" text-white">used</p>
                        <p className="text-4xl text-accent ">{firstWord[1]}</p>
                        <p className="text-white">times</p>
                    </div>
                </motion.div>

                <motion.div className="w-1/2 flex justify-center items-center" variants={{start: {scale: [.8, 1]}, stop: {scale: 1}}} animate={gameState === "unanswered" ? "start" : "stop"}>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-4xl text-center text-white">"{secondWord[0]}"</p>
                        <p className="text-center text-white">used</p>
                        {gameState === "unanswered" ? 
                            <>
                                <div className="my-2 flex">
                                    <button className="text-accent px-6 py-2 border border-white rounded-md mr-3 flex gap-2 items-center justify-center font-medium hover:bg-white hover:text-black higher-lower-button transition duration-200" onClick={() => {onAnswerClicked(true)}}>Higher <img src="../up-arrow.svg" alt="" className="size-3 transition-all duration-200" /></button>
                                    <button className="text-accent px-6 py-2 border border-white rounded-md flex gap-2 items-center justify-center font-medium hover:bg-white hover:text-black higher-lower-button transition duration-200" onClick={() => {onAnswerClicked(false)}}>Lower <img src="../up-arrow.svg" alt="" className="size-3 rotate-180 transition-all duration-200" /></button>
                                </div>
                                <p className="text-white">than "{firstWord[0]}"</p>
                            </>
                            :
                            <>
                                <motion.p className="text-4xl text-accent text-center">{rounded}</motion.p>
                                <p className="text-center text-white">times</p>
                            </>
                        }
                    </div>
                </motion.div>
            </div>
        </>
    )
}