import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  let myObj={
    username:'Hitesh',
    age:21
  }
  let newArr=[1,2,3,4]

  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>tailwind test</h1>
      <Card username='chaiaurcode' price='2020' /*someObj={myObj}*//>
      <Card username='Shiladitya' />
    </>
  )
}

export default App
