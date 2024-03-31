import './style/index.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const BASE = 'http://127.0.0.1:5000'
  const [sound,setSound] = useState('')
  const [categories,setCategories] = useState([])
  const [catId,setCatId] = useState(1)
  const [meaning,setMeaning] = useState('')
  const [allSound,setAllSound] = useState([])
  const [player,setPlayer] = useState(new Audio(''))

  const postNewSound = async () => {
    await axios.post(BASE +'/create',{text:sound,category_id:String(catId),meaning:meaning})
      .then((res)=> {
        setMeaning("")
        setSound("")
        window.location.reload()
      })
  }
  const getCategories = async () => {
    axios.get(BASE + '/categories')
      .then((res)=> {
        setCategories(res.data.categories)
      })
  }
  const getAllSound = async (id = 1)=> {
    axios.get(BASE + `/sounds/${id}`)
      .then((res)=> {
        setAllSound(res.data.sounds)
      })
  }
  useEffect(()=> {
    getCategories()
    getAllSound()
  },[])

  const playSound = async (name) => {
    console.log(name)
    const response = axios.get(BASE + `/sound/${name}`,{responseType:'blob'})
      .then((res)=> {
        console.log(res.data)
        setPlayer(new Audio(URL.createObjectURL(res.data)))
      })
  }
  useEffect(()=> {
    player.play()
  },[player])
  return (
    <>
      <div className='new-word-form'>
        <input className='input-field' 
        value={sound}
        onChange={(e)=>setSound(e.target.value)}/>
        <input className='input-field' 
        value={meaning}
        onChange={(e)=>setMeaning(e.target.value)}/>
        <select
          className='select-field'
          onChange={(e)=>setCatId(e.target.value)}
        >
          {categories && categories.map((e)=> {
            return(
              <>
                <option value={e.category_id}>
                  {e.category_name}
                </option>
              </>
            )
          })}
        </select>
        <button className='submit-button'
          onClick={postNewSound}
        >send</button>
      </div>
      <div className='flex-cont'>
      {categories && categories.map((e)=> {
        return (
          <>
            <button className='submit-button' onClick={()=>{getAllSound(e.category_id)}}>
              {e.category_name}
            </button>
          </>
        )
      })}
    </div>
      <div className='words'>
      {allSound && allSound.map((e)=> {
        return (
          <div className='cover'>
            <button className='submit-button'
              onClick={()=>{playSound(e.text)}}
              >
                <div className="meaning">
                  {e.meaning}
                </div>
              {e.text}
            </button>
          </div>
        )
      })}
      </div>
    </>
)
}

export default App
