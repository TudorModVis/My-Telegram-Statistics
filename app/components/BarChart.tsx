'use client'

import { Button, ToggleButtonGroup } from "@mui/joy";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from "recharts";

interface Chats {
  name: string,
  messages: number
}

interface Years {
  year: Chats[]
}

const CustomButton = ({text, value, first, last}: {value: string, text: string, first?: boolean, last?: boolean}) => {
  return(
    <Button value={value} 
      sx={{
        color: "#B3B8B8",
        '&:hover': {
          color: "#212121"
        },
        '&[aria-pressed="true"]': {
          color: "#212121"
        }
      }}
      data-first-child={first}
      data-last-child={last}
    >
      {text}</Button>
  )
}

export default function BarChartFunc ({data, title}: {data: Years[], title: string}) {
  const [year, setYear] = useState<string | null>('0');

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <>
          <ToggleButtonGroup
              variant="outlined"
              value={year}
              onChange={(event, newValue) => {
                setYear(newValue);
              }}
              size="sm"
              
            >
              <CustomButton value="0" text="All time" first={true}/>
              <CustomButton value="4" text="2024"/>
              <CustomButton value="3" text="2023"/>
              <CustomButton value="2" text="2022"/>
              <CustomButton value="1" text="2021" last={true}/>
          </ToggleButtonGroup>
        {
          payload.reverse().map((entry: any, index: number) => (
            <>
              <div key={`${entry.value}-${index}`} style={{display: "flex", alignItems: "center", gap: 4, color: "#f1f1f1"}}><div style={{display:'inline-block',width:'12px',height:'12px',backgroundColor:"#24A1DE", borderRadius: 3}}></div>{entry.value.slice(0, 1).toUpperCase() + entry.value.slice(1, entry.value.length)}</div>
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
      <div className="flex-1">
          <div className="bg-accent rounded-t-md flex justify-center items-center p-1">
            <h3 className="font-bold text-xl">{title}</h3>
          </div>
          <div className="p-4 bg-[#212121] pb-[4.5rem] pt-6 rounded-b-md">
            <ResponsiveContainer width="100%" height={360} style={{backgroundColor: "#21121", marginLeft: 0}}>
                <BarChart data={data[Number(year)].year} {...{overflow: 'visible'}}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="15%" stopColor="#24A1DE" stopOpacity={.8}/>
                        <stop offset="95%" stopColor="#24A1DE" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" fill='#212121' strokeOpacity={.25}/>
                    <XAxis  dataKey="name" angle={-35} dy={24} tickFormatter={(tick) => {return tick.length > 10 ? tick.slice(0, 7) + "..." : tick}} tick={{fill: "#B3B8B8", fontSize: ".875rem"}}/>
                    <YAxis tick={{fill: "#B3B8B8", fontSize: ".875rem"}}/>
                    <Tooltip cursor={{fill: '#636363'}} content={<CustomTooltip/>} />
                    <Legend wrapperStyle={{bottom: "-3rem", display: 'flex', justifyContent: 'space-between'}} content={renderLegend}/>
                    <Bar dataKey="messages" fill="url(#colorPv)" radius={[5, 5, 0, 0]}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    )
}