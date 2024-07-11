'use client'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCallback, useRef, useState } from 'react';
import Slider from "react-slick";
import {useDropzone} from 'react-dropzone'
import CoffeeLink from './CoffeeLink';

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

const DragArea = () => {
    return (
        <div className='w-full h-64 rounded-md border-dashed border border-gray flex flex-col justify-center items-center gap-2'>
             <button className='bg-accent rounded-lg py-3 px-6 flex items-center gap-2 text-lg font-bold mx-auto group hover:bg-opacity-75 transition duration-200'>
                <img src="/file.svg" alt="right arrow" className='size-8' />
                Choose File
            </button>
            <p className='text-accent text-xs font-medium'>Drag & Drop files here</p>
        </div>
    )
}

export default function DropZone ({setData}: {setData: (data: Data) => void}) {
    const [slide, setSlide] = useState(0);
    const [loading, setLoading] = useState(false)
    let sliderRef = useRef<Slider | null>(null);

    const settings = {
        customPaging: function(i:number) {
            return (
              <div className="border border-gray size-2 box-border rounded-full"></div>
            );
          },
        dots: true,
        speed: 500,
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (current:number, next:number) => {
            setSlide(current);
            setSlide(next);
          },
        
    };

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        const file:any = new FileReader;
        file.addEventListener('load', async () => {
            setLoading(true);
            const base64String = file.result.split(',')[1];
            const jsonString = Buffer.from(base64String, 'base64').toString('utf-8');
            setData(getData(JSON.parse(jsonString)));
            setLoading(false);

            // fetch("/api", {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json'
            //       },
            //     body: JSON.stringify({ dataURI: file.result })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     setData(data);
            //     setLoading(false);
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        });

        file.readAsDataURL(acceptedFiles[0]);
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>
            {
                loading && 
                <div className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <p className="font-bold text-lg text-white">Loading...</p>
                </div>
            }
            
            <div className='bg-semi-black py-12 rounded-xl w-[50rem] mx-auto mb-16'>
                {
                    slide === 0 ?
                    <h2 className='text-3xl font-bold text-accent mb-4 text-center'>1. Download Your Telegram File</h2> :
                    <h2 className='text-3xl font-bold text-accent mb-4 text-center'>2. It&apos;s Your Turn to Upload Now</h2> 

                }
                {
                    slide === 0 ?
                    <p className='text-sm text-gray italic mb-8 text-center'> <span className='text-[#F43C3C] font-bold'>IMPORTANT</span> - Select <span className='text-[#F43C3C] font-bold'>Account Information</span> & <span className='text-[#F43C3C] font-bold'>Machine-Readable JSON</span> | Unselect <span className='text-[#F43C3C] font-bold'>Media</span></p> :
                    <p className='text-sm text-gray italic mb-8 text-center'>Upload the file with the correct settings here</p>

                }
                <Slider {...settings} className='relative' ref={sliderRef}>
                    <div>
                        <video src="/ExDataBlog.mp4" className='rounded-md w-[20rem] mx-auto' autoPlay playsInline muted loop></video>
                    </div>
                    <div className="px-24">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <DragArea/>
                            }
                        </div>
                    </div>
                    
                </Slider>
                {
                    slide === 0 ?
                    <button className='border-2 border-accent border-opacity-100 hover:border-opacity-30 bg-accent rounded-lg py-3 px-6 flex items-center gap-2 text-sm font-bold mx-auto group hover:bg-opacity-75 transition-all duration-200 mt-14' onClick={() => {sliderRef.current?.slickNext()}}>
                        Continue
                        <img src="/right-arrow.svg" alt="right arrow" className='size-4 group-hover:translate-x-1 transition duration-200' />
                    </button> :
                     <button className='border-2 border-opacity-50 border-white text-white rounded-lg py-3 px-6 flex items-center gap-2 text-sm font-bold mx-auto group hover:bg-opacity-75 transition duration-200 mt-14' onClick={() => {sliderRef.current?.slickPrev()}}>
                        <img src="/right-arrow.svg" alt="right arrow" className='size-4 group-hover:-translate-x-1 transition duration-200 invert rotate-180' />
                        Back
                    </button>
                    
                }
            </div>
            <p className='text-gray italic8 text-center mb-4'>Your contribution helps this product run and improve.</p>
            <div className="flex justify-center mb-24">
                <CoffeeLink />
            </div>
        </>
       
        
    )
}

const convertMonth = (month: string) => {
    switch(month) {
      case '01': return "Jan"
      case '02': return "Feb"
      case '03': return "Mar"
      case '04': return "Apr"
      case '05': return "May"
      case '06': return "June"
      case '07': return "July"
      case '08': return "Aug"
      case '09': return "Sept"
      case '10': return "Oct"
      case '11': return "Nov"
      case '12': return "Dec"
    }
    return ""
  }


const getData = (result: any) => {
    const chatsArr: Years[] = Array.from({ length: 5 }, () => ({ year: [] }));
    const hoursArr: Years[] = Array.from({ length: 5 }, () => ({ year: [] }));
    const timeline: any = {}
    let sentMessages = 0
    let totalWords = 0;
    const wordsUsed: any = {}

    const hours = Array.from({ length: 5 }, () => Array(24).fill(0));

    const userId = "user" + result.personal_information.user_id
    result.chats.list.forEach((contact: {name: string, messages: []}) => {
      // Chat messages counter
      let texts = new Array(5).fill(0);
      // sentMessages += contact.messages.length;

      contact.messages.forEach((message: any) => {
        if (message.from_id !== userId) return;

        sentMessages++;

        const year = message.date.split("T")[0].substr(0, 4);
        const month = message.date.split("T")[0].substr(5, 2);
        const hour = message.date.split("T")[1].substr(0, 2);

        // Calculate the total number of words used
        Object.hasOwn(timeline, `${year}-${month}`) ? timeline[`${year}-${month}`]++ : timeline[`${year}-${month}`] = 1;

        // Count the total number of words used
        if (message.text !== '' && typeof message.text === 'string') {
          const words = message.text.split(" ");
          words.forEach((word: string) => {
            if (word == ' ' || word.length === 0 || /^[a-zA-Z0-9]$/.test(word) || typeof word !== 'string') return;
            totalWords++;
            if (/^[^a-zA-Z0-9]/.test(word)) word = word.substring(1);
            if (/[^a-zA-Z0-9]$/.test(word)) word = word.substring(0, word.length - 1);
            Object.hasOwn(wordsUsed, word.toString().toLowerCase()) ? wordsUsed[word.toString().toLowerCase()]++ : wordsUsed[word.toString().toLowerCase()] = 1;
          });
        }

        // Count all messages
        texts[0]++;
        hours[0][Number(hour)]++;

        // Count messages for 2021
        if (year === '2021') {
          texts[1]++;
          hours[1][Number(hour)]++;
        }

        // Count messages for 2022
        if (year === '2022') {
          texts[2]++;
          hours[2][Number(hour)]++;
        }

        // Count messages for 2023
        if (year === '2023') {
          texts[3]++;
          hours[3][Number(hour)]++;
        }

        // Count messages for 2024
        if (year === '2024') {
          texts[4]++;
          hours[4][Number(hour)]++;
        }

      });

      // Pushing chat messages for a year
      for (let i = 0; i < 5; i++) {
        chatsArr[i].year.push({name: contact.name, messages: texts[i]})
      }
    });

     for (let i = 0; i < 5; i++) {
        // Pushing chats into final array
        chatsArr[i].year = chatsArr[i].year.sort((a, b) => b.messages - a.messages).slice(0, 10);

        // Pushing hours messages for a year
        for (let j = 0; j < 24; j++) {
            const hour = j === 0 ? "12 AM" : j < 13 ? j + " AM" : (j - 12) + " PM";
            hoursArr[i].year.push({ name: hour, messages: hours[i][j] });
        }
    }
   
    // Arranging timeline into chart format
    let orderedTimeline = Object.keys(timeline).sort().reduce(
      (obj: any, key: string) => {
        obj[key] = timeline[key];
        return obj
      },
      {}
    )

     // Sorting words used by count
     const sortedUsedWords = Object.entries(wordsUsed).sort((a: any, b: any) => b[1]-a[1]);

     // Determening top 10 words used 
     let topWords:Words[] = [];
     for (let i = 0; i < sortedUsedWords.length; i++) {
      if (sortedUsedWords[i][0].length < 4) continue;
      topWords.push({word: sortedUsedWords[i][0], usage: Number(sortedUsedWords[i][1])});
      if (topWords.length > 19) break; 
     }

    const finalTimeline: Chats[] = [];
    for (const [key, value] of Object.entries(orderedTimeline)) {

      const month = convertMonth(key.split("-")[1]);
      finalTimeline.push({name: `${month} '${key.split("-")[0].slice(2)}`, messages: Number(value)})
    }

    return {chats: chatsArr, hours: hoursArr, timeline: finalTimeline, sentMessages: sentMessages, totalWords: totalWords, usedWords: sortedUsedWords, topWords: topWords};
  }