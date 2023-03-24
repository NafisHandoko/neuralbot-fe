import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function Question(props:{text:string}) {
  return (
    <div className='p-7 px-64'>
      <div className='flex flex-row items-start container mx-auto gap-4'>
        <i className="bi bi-question-circle-fill text-2xl"></i>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

function Answer(props:{text:string}) {
  return (
    <div className='bg-violet-600 p-7 px-64'>
      <div className='flex flex-row items-start container mx-auto gap-4'>
        <i className="bi bi-robot text-2xl"></i>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

function App() {
  const [input, setInput] = useState('')

  // const [chats, setChats] = useState([
  //   {
  //     question: 'how to write lorem',
  //     answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non quibusdam libero ut consectetur sed quisquam necessitatibus consequuntur maiores tempore repudiandae?'
  //   },
  //   {
  //     question: 'how to write lorem',
  //     answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non quibusdam libero ut consectetur sed quisquam necessitatibus consequuntur maiores tempore repudiandae?'
  //   }
  // ])

  enum TextType {
    QUESTION = 'question',
    ANSWER = 'answer'
  }

  interface Chats {
    text: string,
    type: string
  }
  const [chats, setChats] = useState<Chats[]>([])

  const handleSubmit = async () => {
    // e.preventDefault()
    const tempChats = [...chats, {
      text: input,
      type: TextType.QUESTION
    }]
    setChats(tempChats)
    setInput('')
    const resp = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input
      })
    })
    if (resp.ok) {
      const respJson = await resp.json()
      const parsedData = respJson.bot.trim()
      // const tempChats = chats
      // tempChats[tempChats.length - 1].answer = parsedData
      setChats([...tempChats, {
        text: parsedData,
        type: TextType.ANSWER
      }])
      // dispatch({ type: 'SET_QUOTE', payload: respJson })
      console.log('openai answer: ' + parsedData)
    }

  }

  const handleKeyDown = async (e:KeyboardEvent) => {
    console.log('masuk')
    if (e.key === 'Enter') {
      await handleSubmit()
    }
  };

  return (
    <div className='text-white'>
      <div>
        {chats && chats.map((chat, index) => (
          // <div key={index}><Question text={chat.question} /><Answer text={chat.answer} /></div>
          <div key={index}>
            {chat.type == TextType.QUESTION? <Question text={chat.text} />: <Answer text={chat.text} />}
          </div>
        ))}
        {/* <div className='p-7 px-64'>
          <div className='flex flex-row items-start container mx-auto gap-4'>
            <i className="bi bi-question-circle-fill text-2xl"></i>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum consectetur quam quia dolor explicabo eligendi cum tempore molestias, optio similique fugit veritatis numquam, itaque quas esse a est doloribus quaerat delectus velit mollitia distinctio? Deserunt inventore, eum voluptatem, tempore ab sit illum ratione beatae ex rem cumque, maiores fuga dolor porro itaque vel asperiores. Non labore obcaecati error repellendus vero velit voluptatibus tenetur aut vitae corrupti sit accusamus, omnis, harum veritatis dolorem? Itaque, fuga nostrum. Quae sequi ut consectetur eveniet, minima iusto quo nesciunt dolor doloremque assumenda esse facere eos dignissimos repudiandae minus atque, voluptas distinctio qui, rem hic quaerat.</p>
          </div>
        </div>
        <div className='bg-violet-600 p-7 px-64'>
          <div className='flex flex-row items-start container mx-auto gap-4'>
            <i className="bi bi-robot text-2xl"></i>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum consectetur quam quia dolor explicabo eligendi cum tempore molestias, optio similique fugit veritatis numquam, itaque quas esse a est doloribus quaerat delectus velit mollitia distinctio? Deserunt inventore, eum voluptatem, tempore ab sit illum ratione beatae ex rem cumque, maiores fuga dolor porro itaque vel asperiores. Non labore obcaecati error repellendus vero velit voluptatibus tenetur aut vitae corrupti sit accusamus, omnis, harum veritatis dolorem? Itaque, fuga nostrum. Quae sequi ut consectetur eveniet, minima iusto quo nesciunt dolor doloremque assumenda esse facere eos dignissimos repudiandae minus atque, voluptas distinctio qui, rem hic quaerat.</p>
          </div>
        </div>
        <div className='p-7 px-64'>
          <div className='flex flex-row items-start container mx-auto gap-4'>
            <i className="bi bi-question-circle-fill text-2xl"></i>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum consectetur quam quia dolor explicabo eligendi cum tempore molestias, optio similique fugit veritatis numquam, itaque quas esse a est doloribus quaerat delectus velit mollitia distinctio? Deserunt inventore, eum voluptatem, tempore ab sit illum ratione beatae ex rem cumque, maiores fuga dolor porro itaque vel asperiores. Non labore obcaecati error repellendus vero velit voluptatibus tenetur aut vitae corrupti sit accusamus, omnis, harum veritatis dolorem? Itaque, fuga nostrum. Quae sequi ut consectetur eveniet, minima iusto quo nesciunt dolor doloremque assumenda esse facere eos dignissimos repudiandae minus atque, voluptas distinctio qui, rem hic quaerat.</p>
          </div>
        </div> */}
      </div>
      <div className='fixed bottom-5 w-full flex flex-col items-center'>
        <div className="relative w-3/5">
          {/* <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none">
            <i className="bi bi-question-circle-fill text-violet-700"></i>
          </div> */}
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => handleKeyDown} type="text" id="simple-search" className="shadow-lg bg-white text-violet-700 border border-violet-600 text-sm rounded-lg focus:ring-violet-700 focus:border-violet-700 block w-full px-5 p-2.5 placeholder-gray-500" placeholder="Ask a question..." />
          <button className="flex absolute inset-y-0 right-0 items-center pr-5 cursor-pointer" onClick={handleSubmit}>
            <i className="bi bi-send-fill text-violet-700"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
