export default function ({title, explanation, amount, value}: {title: string, explanation: string, amount: number, value: string}) {
    return(
        <div className="flex-1">
            <div className="bg-accent rounded-t-md flex justify-center items-center p-1">
                <h3 className="font-bold text-xl">{title}</h3>
            </div>
            <div className="bg-semi-black py-4 rounded-b-md">
                <p className="text-center italic text-xs mb-3 text-gray">{explanation}</p>
                <p className="text-7xl text-accent text-center font-bold">{amount}</p>
                <p className="text-xl text-accent leading-none text-center">{value}</p>
            </div>
        </div>
    )
}