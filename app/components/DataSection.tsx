'use client'

import { useState } from "react"
import DropZone from "./DropZone";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import InfoCard from "./InfoCard";
import WordsChart from "./WordsChart";
import HigherLower from "./HigherLower";
import SearchWordPanel from "./SearchWordPanel";

interface Chats {
    name: string,
    messages: number
}

interface Years {
    year: Chats[]
  }

  interface Words {
    word: string,
    usage: number,
  }

interface Data {
    chats: Years[],
    hours: Years[],
    timeline: Chats[],
    sentMessages: number,
    totalWords: number,
    usedWords: any,
    topWords: Words[]
}

export default function DataSection() {
    const [data, setData] = useState<Data | null>(null);

    if (data === null) {
      return (
          <DropZone setData={(setData)}/>
      )
    }

    return (
        <>
          <DropZone setData={(setData)}/>
          <LineChart data={data.timeline} title="Messages timeline"/>
          <div className="flex gap-4 my-4">
            <BarChart data={data.chats} title="Contacts"/>
            <BarChart data={data.hours} title="Time of the day"/>
          </div>
          <div className="flex gap-4 mb-4">
            <InfoCard title="Sent messages" explanation="The number of messages that you have sent." amount={data.sentMessages} value="messages"/>
            <InfoCard title="Sent words" explanation="The number of words that you have sent." amount={data.totalWords} value="words"/>
            <InfoCard title="Sent words in pages" explanation="The number of pages that you could have written." amount={Math.round(data.totalWords / 280)} value="pages"/>
          </div>
          <WordsChart data={data.topWords} title="Most used words"/>
          <SearchWordPanel data={data.usedWords}/>
          <HigherLower data={data.usedWords}/>
        </>
      )
}