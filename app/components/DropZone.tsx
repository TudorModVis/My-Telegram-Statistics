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
        file.addEventListener('load', () => {
            setLoading(true);
            fetch("/api", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({ dataURI: file.result })
            })
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                    <h2 className='text-3xl font-bold text-accent mb-4 text-center'>2. It’s Your Turn to Upload Now</h2> 

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