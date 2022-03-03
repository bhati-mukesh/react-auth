import React from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const key = "user";
const user = {name: 'mukesh'}

const Test = () => {
    const {getData, setData} = useLocalStorage(key, user);
    console.log(getData())
    
    // console.log(getData())
    return (
        <div>
            <button onClick={(()=>{ setData({name: 'bhati'}) })}>set</button>
        </div>
    )
}

export default Test
