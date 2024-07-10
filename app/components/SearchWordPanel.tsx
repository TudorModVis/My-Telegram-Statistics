import { useState } from "react";
import SearchWord from "./SearchWord";

interface Word {
    word: string,
    count: number
}


export default function SearchWordPanel ({data}: {data: any}) {
    const [history, setHistory] = useState<Array<Word>>([
        {
            word: "...",
            count: 0
        },
        {
            word: "...",
            count: 0
        },
        {
            word: "...",
            count: 0
        },
    ]);

    const updateHistory = (word: string, count: number) => {
        let newHistory = [
            { word: word, count: count},
            ...history,
          ];

        newHistory = newHistory.slice(0, 3);

        setHistory(newHistory);
    }

    return (
        <div className="flex gap-4 mb-4 items-stretch">
            <SearchWord data={data} updateHistory={updateHistory}/>
            <div className="flex-1">
                <div className="bg-accent rounded-t-md flex justify-center items-center p-1">
                    <h3 className="font-bold text-xl">Word search history</h3>
                </div>
                    <div className="bg-semi-black overflow-hidden rounded-b-md">
                        <table className="w-full">
                            <tbody>
                                <tr className="even:bg-opacity-15 odd:bg-opacity-0 bg-white w-full text-white text-xl border-b border-white"><th className="pl-6 py-4 text-left">Word</th><th className="text-right pr-6">Times used</th></tr>
                                {
                                    history.map((search, index) => <tr key={index} className="even:bg-opacity-15 odd:bg-opacity-0 bg-white w-full text-white text-xl"><td className="pl-6 py-4">{search.word}</td><td className="text-right pr-6">{search.count}</td></tr>)
                                }
                            </tbody>
                            
                        </table>
                    </div>
                </div>
          </div>
    )
}