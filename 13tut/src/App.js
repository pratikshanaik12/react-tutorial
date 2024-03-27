// npx json-server -p 3500 -w data/db.json  -- run cmd on other server to get db.json started

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {

  const API_URL = 'http://localhost:3500/items'

  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState('')

  const [search, setSearch] = useState('')

  const [fetchError, setFetchError] = useState('')
  
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(()=>{
  //   localStorage.setItem('shoppinglist', JSON.stringify(items))
  // },[items])


  useEffect(()=>{
    const fetchItems = async() => {
      try{
        const response = await fetch(API_URL)
        if (!response.ok) throw Error(`Did not recieve expected data`)  // API_URL error handling
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch(err){
        // console.log(err.message)
        setFetchError(err.message)
      } finally{
        setIsLoading(false)
      }
    }

    // simulate the loading time, as we are not using REST APIs
    setTimeout(()=>{
      fetchItems()
    },2000)

    // fetchItems()
    // (async()=> await fetchItems())()
  },[])


const addItem = async (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1
  const myNewItem = {id, checked: false, item}
  const listItems = [...items, myNewItem]
  setItems(listItems)

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(myNewItem)
  }
  const result = await apiRequest(API_URL, postOptions)
  if (result) setFetchError(result)
}

const handleCheck = async (id) => {
  const listItems = items.map((item)=> item.id === id ? 
  {...item, checked : !item.checked}
  : item)
  setItems(listItems)
  const myItem = listItems.filter((item) => item.id === id)
  const updateOptions = {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({checked: myItem[0].checked})
  }
  const reqUrl = `${API_URL}/${id}`
  const result = await apiRequest(reqUrl, updateOptions)
  if (result) setFetchError(result)
}

const handleDelete = async(id) => {
  const listItems = items.filter((item) => item.id !== id )
  setItems(listItems)

  const deleteOptions = {method:'DELETE'}
  const reqUrl = `${API_URL}/${id}`
  const result = await apiRequest(reqUrl, deleteOptions)
  if (result) setFetchError(result)


}

const handleSubmit = (e) => {

  // stops auto reload and maintans state
  e.preventDefault();
  if (!newItem) return;
  // console.log(newItem)

  // addItem
  addItem (newItem);
  setNewItem('')  // sets form to empty after pressing enter, so that next thing can be typed
  
}
  
  return (
    <div className="App">
      <Header title = "Grocery List" />
      
      <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />

      <SearchItem
        search={search}
        setSearch = {setSearch}
      />

      <main>
        {isLoading && <p>Loading Items....</p>}
        {fetchError && <p style = {{color:'red'}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />}
      </main>
      
      <Footer length = {items.length} />
    </div>
  );
}

export default App;
