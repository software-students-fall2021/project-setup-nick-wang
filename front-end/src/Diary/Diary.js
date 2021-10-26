import React, {useState, useEffect} from 'react'
import HomeButton from '../components/HomeButton/HomeButton'
import DiaryContainer from '../components/DiaryContainer/DiaryContainer'
import DiaryStack from '../components/DiaryStack/DiaryStack'
import BottomNav from '../components/BottomNav/BottomNav'
import request from './service'
import "./Diary.css"

const Diary = () => {

    const [content, setContent] = useState([])

    useEffect(async() => {
        try{
            const diaries = await request()
            console.log(diaries)
            setContent(diaries)
        }
        catch{
            console.log("No Data Found")
        }
    });
    //console.log(content)
    return (
        <div className="Diary">
           <HomeButton></HomeButton>
            <DiaryStack>
            </DiaryStack>    
            <BottomNav>
            </BottomNav>
        </div>
    )
}

export default Diary