import React, {useState, useEffect} from 'react'
import HomeButton from './components/HomeButton/HomeButton'
import DiaryStack from './components/DiaryStack/DiaryStack'
import BottomNav from './components/BottomNav/BottomNav'
import "./Diary.css"

const Diary = () => {

    const [content, setContent] = useState([])
    const [pickedDate, setPickedDate] = React.useState(new Date());

    return (
        <div className="Diary">
            <DiaryStack pickedDate={pickedDate}></DiaryStack>    
            <BottomNav pickedDate={pickedDate} setPickedDate={setPickedDate}></BottomNav>
        </div>
    )
}

export default Diary