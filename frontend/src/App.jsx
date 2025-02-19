import React from 'react'
import { Loader, LoaderPinwheelIcon, MessageCircle } from 'lucide-react'

const App = () => {
  return (
    <div>
       <h1 class="text-6xl font-bold text-red-400 ">
    Hello world!<MessageCircle />
    <Loader className='text-black' />
    .
  </h1>
    </div>
  )
}

export default App
