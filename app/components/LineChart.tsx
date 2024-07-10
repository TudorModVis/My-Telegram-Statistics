'use client'

import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from "recharts";

interface Chats {
  name: string,
  messages: number
}

export default function LineChartFunc ({data, title}: {data: Chats[], title: string}) {
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <>
        {
          payload.reverse().map((entry: any, index: number) => (
            <>
              <div key={`${entry.value}-${index}`} style={{display: "flex", alignItems: "center", gap: 4, color: "#f1f1f1"}}><div style={{display:'inline-block',width:'12px',height:'2px',backgroundColor:entry.color, borderRadius: 3}}></div>{entry.value.slice(0, 1).toUpperCase() + entry.value.slice(1, entry.value.length)}</div>
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
          <p className="text-accent">{`Messages: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

    return (
      <div className="w-full">
          <div className="bg-accent rounded-t-md flex justify-center items-center p-1">
            <h3 className="font-bold text-xl">{title}</h3>
          </div>
          <div className="p-4 bg-[#212121] pb-[4.5rem] pt-6 rounded-b-md">
            <ResponsiveContainer width="100%" height={360} style={{backgroundColor: "#21121", marginLeft: 0}}>
                    <AreaChart data={data} {...{overflow: 'visible'}}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="15%" stopColor="#24A1DE" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#24A1DE" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" fill='#212121' strokeOpacity={.25}/>
                    <XAxis  dataKey="name" dy={24} tickFormatter={(tick) => {return tick.startsWith("Jan") || tick.startsWith("Jul") ? tick : ""}} tick={{fill: "#B3B8B8", fontSize: ".875rem"}}/>
                    <YAxis tick={{fill: "#B3B8B8", fontSize: ".875rem"}}/>
                    <Tooltip cursor={{fill: '#6B6B6B'}} content={<CustomTooltip/>} />
                    <Legend wrapperStyle={{bottom: "-3rem", display: 'flex', justifyContent: 'end'}} content={renderLegend}/>
                    <Area type="monotone" dataKey="messages" stroke="#24A1DE" fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    )
}