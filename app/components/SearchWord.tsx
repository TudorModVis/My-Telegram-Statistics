import { useState } from "react";

export default function SerachWord ({data, updateHistory}: {data: any, updateHistory: (word: string, count: number) => void}) {
    const [word, setWord] = useState("");

    return(
        <div className="flex-1 flex flex-col">
            <div className="bg-accent rounded-t-md flex justify-center items-center p-1">
                <h3 className="font-bold text-xl">Search how many times you used a word</h3>
            </div>
            <div className="bg-semi-black py-6 rounded-b-md flex-1 flex items-center justify-center">
                <form className='flex flex-col items-center gap-6' onSubmit={(event) => {
                    event.preventDefault();
                    const count = data.find((item: any) => item[0] === word);
                    if (count === undefined || word === "") return;
                    
                    updateHistory(word, count[1])
                }}>
                    <input type="text" name="" id="" className='bg-transparent text-5xl w-96 focus:outline-none focus:placeholder-transparent text-white text-center' placeholder=' Type a word...' value={word} onChange={e => {setWord(e.currentTarget.value)}}/>
                    <button className='bg-accent py-2 px-4 text-xl font-semibold rounded-md'>Search</button>
                </form>
            </div>
        </div>
    )
}