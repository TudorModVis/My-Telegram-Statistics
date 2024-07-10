'use client'

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from "recharts";

interface Words {
    word: string,
    usage: number,
  }

export default function WordsChart ({data, title}: {data: Words[], title: string}) {
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <>
        {
          payload.reverse().map((entry: any, index: number) => (
            <>
                <p key={`${entry.value + '0'}-${index}`} className="text-center italic text-xs text-gray">*Words that are under 4 characters long where omited to make the top more interesting</p>
                <div key={`${entry.value + '1'}-${index}`} style={{display: "flex", alignItems: "center", gap: 5, color: "#f1f1f1"}}><div style={{display:'inline-block',width:'12px',height:'12px',backgroundColor:"#24A1DE", borderRadius: 3}}></div>Number of times used</div>
            </>
          ))
        }
      </>
    );
  }

  const CustomTooltip = ({ active, payload, label }: {active?: boolean, payload?: any, label?: string}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-accent">{`Used: ${payload[0].value} times`}</p>
        </div>
      );
    }
  
    return null;
  };

    return (
      <div className="w-full mb-4">
          <div className="bg-accent rounded-t-md flex justify-center items-center p-1">
            <h3 className="font-bold text-xl">{title}</h3>
          </div>
          <div className="p-4 bg-[#212121] pb-[4.5rem] pt-6 rounded-b-md">
          <ResponsiveContainer width="100%" height={360} style={{backgroundColor: "#21121", marginLeft: 0}}>
                <BarChart data={data} {...{overflow: 'visible'}}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="15%" stopColor="#24A1DE" stopOpacity={.8}/>
                        <stop offset="95%" stopColor="#24A1DE" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" fill='#212121' strokeOpacity={.25}/>
                    <XAxis  dataKey="word" dy={24} tickFormatter={(tick) => {return tick.length > 10 ? tick.slice(0, 7) + "..." : tick}} tick={{fill: "#B3B8B8", fontSize: ".875rem"}}/>
                    <YAxis tick={{fill: "#B3B8B8", fontSize: ".875rem"}}/>
                    <Tooltip cursor={{fill: '#636363'}} content={<CustomTooltip/>} />
                    <Legend wrapperStyle={{bottom: "-3rem", display: 'flex', justifyContent: 'space-between', alignItems: 'end'}} content={renderLegend}/>
                    <Bar dataKey="usage" fill="url(#colorPv)" radius={[5, 5, 0, 0]}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    )
}