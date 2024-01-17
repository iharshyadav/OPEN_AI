import React, { useEffect, useRef, useState } from 'react'
import { sendMsgToOpenAI } from './openaiApi';

const App = () => {

  const msgEnd = useRef(null)


  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
    text: "Hi, I am ChatGPT, a state-of-the-art language model developed by OpenAI. I'm des",
    isBot: true,
    }
    ]);

    useEffect(()=>{
      msgEnd.current.scrollIntoView();
    },[messages])

    const handleSend = async () => {
      const text = input;
      setInput('');
      setMessages([
        ...messages,
        {text,isBot:false}
      ])
    const res = await sendMsgToOpenAI (text);
    console.log(res);
    setMessages ([
    ...messages,
    { text, isBot: false },
    { text: res, isBot: true }
    ])
  }

  // const handleClick = async ()=>{
  //     const res = await sendMsgToOpenAI(input);
  //     console.log(res);
  // }

  const handleEnter = async (e) => {
    if (e.key == 'Enter') await handleSend();
    }

  return (
    <div className="w-full h-screen flex bg-[#0C1525] text-white">
      <div className="left w-[5%] h-screen bg-red-300">

      </div>
      <div className="middle w-[25%] h-screen text-white items-center flex flex-col justify-between border-r-2">
        <h1 className="text-3xl font-semibold p-10">Text Generator</h1>
        <div className="h-[23%] flex flex-col gap-5">
          <button onClick={window.location.reload} className="p-2 pr-28 pl-28 rounded-3xl text-green-500 border-green-500 border-2">
            New Chat
          </button>
          <button className="p-2 pr-24 pl-24 rounded-3xl text-green-500 border-green-500 border-2">
            Clear Conversation
          </button>
        </div>
      </div>
      <div className="right flex flex-col items-center w-[70%] justify-between bg-[#0C1525]">
        <div className="chats overflow-hidden overflow-y-scroll scroll-smooth w-full max-w-[70rem] flex flex-col  items-start h-[calc(100vh-8rem)]">
          {messages.map((messages,i)=>
            <div key={i} className={messages.isBot?"generator ml-24 w-[90%] rounded-md m-3":"generator1 w-[90%] rounded-md m-3"}>
              <p className=" bg-[#1A2232] rounded-md p-3">
                {messages.text}
              </p>
            </div>
          )}
          <div ref={msgEnd}/>
          {/* <div className="generator1 w-[90%] rounded-md m-3">
            <p className='bg-[#1A2232] rounded-md p-3'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias eius culpa est ipsam neque, architecto rerum illo maxime
            </p>
          </div> */}
        </div>
        <div className="inputChat w-full ">
          <div className="inp flex w-[90%] border-[1px] overflow-hidden  rounded-xl ml-12 m-6 ">
            <input className='w-[88%] p-[10px] bg-transparent outline-none' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} placeholder='Send messages' type="text" />
            <button className='w-[6%]'>micro</button>
            <button className='w-[6%] bg-red-200' onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App