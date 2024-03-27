import { FaPlus } from "react-icons/fa"
import { useRef } from "react"

const AddItem = ({newItem, setNewItem, handleSubmit}) => {
    // to bring back focus to input from the add btn once you add an item
    const inputRef = useRef()
  return (
    <form action="" className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="addItem">
            Add Item
        </label>
        <input
            autoFocus
            ref={inputRef}
            id='addItem'
            type="text"
            placeholder='Add Item'
            required
            value = {newItem}
            onChange={(e) => setNewItem(e.target.value)}

        />
        <button
            type='submit'
            aria-label='Add Item'
            onClick={() => inputRef.current.focus()}
        >
            <FaPlus/>
        </button>
    </form>
  )
}

export default AddItem