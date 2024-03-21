import { useState } from 'react'

const Content = () => {

    const [name, setName] = useState('Dave') // Dave is th default name for when the state loads
    const [count, setCount] = useState(0) //0 is the default value

    const handleNameChange = ()=>{
        const names = ["Adam", "Bob", "Dave"]
        const int = Math.floor(Math.random()*3)
        // return names[int]
        setName(names[int])
    }

    // state updates may be asynchronous. 
    // This means that immediately after calling setCount, the count value available within the same function scope does not reflect the updated state. 
    // Instead, it still shows the value of count before the update
    
    const handleClick = () =>{
        setCount(count+1)
        console.log(count)
    }
    
    const handleClick3 = (e) =>{
        console.log(count)
    }
    

  return (
    <main>
        <p on onDoubleClick={handleClick}>
            Hello {name}!
        </p>
        <button onClick={handleNameChange}>Change Name</button>
        <button onClick={handleClick}>Click Me ! </button>
        <button onClick={handleClick3}>Click Me3 ! </button>
    </main>
  )
}

export default Content

