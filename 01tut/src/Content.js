import React from 'react'

const Content = () => {
    const handleNameChange = ()=>{
        const names = ["Adam", "Bob", "Dave"]
        const int = Math.floor(Math.random()*3)
        return names[int]
    }
    const handleClick = () =>{
        console.log("You clicked it.")
    }
    const handleClick2 = (name) =>{
        console.log(`${name} clicked`)
    }
    const handleClick3 = (e) =>{
        console.log(e.target.innerText)
    }
    

  return (
    <main>
        <p on onDoubleClick={handleClick}>
            Hello {handleNameChange()}!
        </p>
        <button onClick={handleClick}>Click Me ! </button>
        <button onClick={()=>handleClick2('Dave')}>Click Me2 ! </button>
        <button onClick={(e)=>handleClick3(e)}>Click Me3 ! </button>
    </main>
  )
}

export default Content

