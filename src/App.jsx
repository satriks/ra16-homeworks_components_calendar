import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/calendar.css'
import Calendar from './components/Calendar'


function App() {
  const [count, setCount] = useState(0)

  const now = new Date(2017, 2, 8);

  return (
    <Calendar day ={now} />
  )
  
}

export default App
