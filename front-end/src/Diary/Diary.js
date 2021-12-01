import React, {useState} from 'react'
import DiaryStack from './components/DiaryStack/DiaryStack'
import BottomNav from './components/BottomNav/BottomNav'
import "./Diary.css"

const Diary = () => {

    const [pickedDate, setPickedDate] = useState(new Date());

    return (
        <div className="Diary">
            <DiaryStack pickedDate={pickedDate}></DiaryStack>    
            <BottomNav pickedDate={pickedDate} setPickedDate={setPickedDate}></BottomNav>
        </div>
    )
}

export default Diary