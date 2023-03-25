import { FormEvent, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function Question(props: { text: string }) {
  return (
    <div className='p-7 px-44'>
      <div className='flex flex-row items-start container mx-auto gap-4'>
        <i className="bi bi-question-circle-fill text-2xl"></i>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

function Answer(props: { text: string }) {
  return (
    <div className='bg-violet-600 p-7 px-44'>
      <div className='flex flex-row items-start container mx-auto gap-4'>
        <i className="bi bi-robot text-2xl"></i>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

function App() {
  const [input, setInput] = useState('')

  enum TextType {
    QUESTION = 'question',
    ANSWER = 'answer'
  }

  interface Chats {
    text: string,
    type: string
  }

  const dummyChats: Chats[] = [
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia qui distinctio adipisci iusto quidem saepe mollitia nulla fugiat exercitationem, totam dolores asperiores et aperiam quae consequatur sunt consectetur sed fuga sequi labore voluptatum earum perferendis?',
      type: TextType.QUESTION
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia qui distinctio adipisci iusto quidem saepe mollitia nulla fugiat exercitationem, totam dolores asperiores et aperiam quae consequatur sunt consectetur sed fuga sequi labore voluptatum earum perferendis?',
      type: TextType.ANSWER
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia qui distinctio adipisci iusto quidem saepe mollitia nulla fugiat exercitationem, totam dolores asperiores et aperiam quae consequatur sunt consectetur sed fuga sequi labore voluptatum earum perferendis?',
      type: TextType.QUESTION
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia qui distinctio adipisci iusto quidem saepe mollitia nulla fugiat exercitationem, totam dolores asperiores et aperiam quae consequatur sunt consectetur sed fuga sequi labore voluptatum earum perferendis?',
      type: TextType.ANSWER
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia qui distinctio adipisci iusto quidem saepe mollitia nulla fugiat exercitationem, totam dolores asperiores et aperiam quae consequatur sunt consectetur sed fuga sequi labore voluptatum earum perferendis?',
      type: TextType.QUESTION
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia qui distinctio adipisci iusto quidem saepe mollitia nulla fugiat exercitationem, totam dolores asperiores et aperiam quae consequatur sunt consectetur sed fuga sequi labore voluptatum earum perferendis?',
      type: TextType.ANSWER
    }
  ]

  const [chats, setChats] = useState<Chats[]>([])
  const chatsContainer = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // window.scrollTo(0, document.body.scrollHeight)
    if (input != '') {
      const tempChats = [...chats, {
        text: input,
        type: TextType.QUESTION
      }]
      setChats(tempChats)
      setInput('')
      const resp = await fetch('https://neuralbot-be.up.railway.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input
        })
      })
      // chatsContainer.current!.scrollTop = chatsContainer.current!.scrollHeight
      if (resp.ok) {
        const respJson = await resp.json()
        const parsedData = respJson.bot
        setChats([...tempChats, {
          text: parsedData,
          type: TextType.ANSWER
        }])
        console.log('openai answer: ' + parsedData)
        // window.scrollTo(0, document.body.scrollHeight)
        // chatsContainer.current!.scrollTop = chatsContainer.current!.scrollHeight
      }
    }
  }

  const testSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (input != '') {
      console.log('submit succeed')
      const tempChats = [...chats, {
        text: input,
        type: TextType.QUESTION
      }]
      setChats(tempChats)
      setInput('')
      // window.scrollTo(0, document.body.scrollHeight)
    }
    // chatsContainer.current!.scrollTop = chatsContainer.current!.scrollHeight
  }

  const testScroll = () => {
    // chatsContainer.current!.scrollTop = chatsContainer.current!.scrollHeight
  }

  useEffect(() => {
    // const chatsContainer = useRef<HTMLDivElement>(null)
    // chatsContainer.current!.scrollTop = chatsContainer.current!.scrollHeight
    const chatsContainer = document.getElementById('chats_container')
    if (chatsContainer != null) {
      chatsContainer.scrollTop = chatsContainer.scrollHeight
    }

  }, [chats])

  // return (
  //   <div className={`text-white ${chats.length ? 'pb-20' : ''}`}>
  //     {chats.length ? <div className='' ref={chatsContainer}>
  //       {chats && chats.map((chat, index) => (
  //         <div key={index}>
  //           {chat.type == TextType.QUESTION ? <Question text={chat.text} /> : <Answer text={chat.text} />}
  //         </div>
  //       ))}
  //     </div> : <div className='container mx-auto flex flex-col items-center justify-center h-screen w-full text-center'>
  //       <i className="bi bi-robot text-3xl mb-4"></i>
  //       <h1 className='text-2xl font-bold'>Welcome to NeuralBot</h1>
  //       <h1 className='text-2xl font-bold'>You can ask anything here</h1>
  //       <span className='mt-4'>Made with ❤️ by Nafis Handoko</span>
  //     </div>}
  //     <div className='fixed bottom-5 w-full flex flex-col items-center'>
  //       <form onSubmit={testSubmit} className="relative w-3/5">
  //         <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none">
  //           <i className="bi bi-question-circle-fill text-violet-700"></i>
  //         </div>
  //         <input value={input} onChange={(e) => setInput(e.target.value)} type="text" id="simple-search" className="shadow-lg bg-white text-violet-700 border border-violet-600 text-sm rounded-lg focus:ring-violet-700 focus:border-violet-700 block w-full px-14 p-2.5 placeholder-gray-500" placeholder="Ask a question..." />
  //         <button type='submit' className="flex absolute inset-y-0 right-0 items-center pr-5 cursor-pointer">
  //           <i className="bi bi-send-fill text-violet-700"></i>
  //         </button>
  //       </form>
  //     </div>
  //     <button className='fixed top-5 left-5 p-3 bg-white text-black rounded' onClick={() => window.scrollTo(0, document.body.scrollHeight)}>Scrolldown</button>
  //   </div>
  // )

  return (
    <div className='relative max-h-screen overflow-y-hidden'>
      <div className='h-screen flex flex-row items-stretch'>
        <div className='bg-white rounded-r-3xl text-black flex flex-col items-center w-1/5'>
          <div className='flex flex-col items-center justify-between h-screen w-full gap-y-10 pt-5'>
            <div className='text-center'>
              <i className="bi bi-robot text-3xl mb-4 text-violet-700"></i>
              <h1 className='text-violet-700 font-bold text-xl'>NeuralBot</h1>
            </div>
            <div className='text-violet-700 w-full text-center p-5 space-y-2'>
              <a href="https://github.com/NafisHandoko/neuralbot-fe" target='_blank' className='hover:bg-violet-700 hover:text-white w-11/12 rounded py-2 inline-block'>Repo</a>
              <button onClick={testScroll} className='hover:bg-violet-700 hover:text-white w-11/12 rounded py-2'>Scrolldown</button>
              <button className='hover:bg-violet-700 hover:text-white w-11/12 rounded py-2' onClick={() => setChats([])}>Clear Chats</button>
            </div>
          </div>
        </div>
        <div className='bg-violet-700 text-white w-full overflow-y-hidden relative'>
          <div>
            {chats.length ? <div className='h-screen overflow-y-scroll pb-20' ref={chatsContainer} id='chats_container'>
              {chats && chats.map((chat, index) => (
                <div key={index}>
                  {chat.type == TextType.QUESTION ? <Question text={chat.text} /> : <Answer text={chat.text} />}
                </div>
              ))}
            </div> : <div className='container mx-auto flex flex-col items-center justify-center h-screen w-full text-center'>
              <i className="bi bi-robot text-3xl mb-4"></i>
              <h1 className='text-2xl font-bold'>Welcome to NeuralBot</h1>
              <h1 className='text-2xl font-bold'>You can ask anything here</h1>
              <span className='mt-4'>Made with ❤️ by Nafis Handoko</span>
            </div>}
          </div>
          <div className='sticky left-0 bottom-5 w-full flex flex-col items-center'>
            <form onSubmit={handleSubmit} className="relative w-2/3">
              <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none">
                <i className="bi bi-question-circle-fill text-violet-700"></i>
              </div>
              <input value={input} onChange={(e) => setInput(e.target.value)} type="text" id="simple-search" className="shadow-lg bg-white text-violet-700 border border-violet-600 text-sm rounded-lg focus:ring-violet-700 focus:border-violet-700 block w-full px-14 p-2.5 placeholder-gray-500" placeholder="Ask a question..." />
              <button type='submit' className="flex absolute inset-y-0 right-0 items-center pr-5 cursor-pointer">
                <i className="bi bi-send-fill text-violet-700"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
