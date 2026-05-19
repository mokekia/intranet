import { useState, useEffect } from 'react';

const meetingForm = ({onSumbit, user}) => {
    const [formData, setformData] = useState({
        time: 'time',
        Date: 'date',
        location: 'location',
        type: '',
        userId: ''
    });

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value

        });
    }

    const onSumbit = (e) => {
        e.preventDefault();
        onSumbit(formData);
        setformData({
            time: 'time',
            Date: 'date',
            location: 'location',
            type: '',
            userId: ''
        });
    }


    return (
        <form onSumbit={onSumbit}>
            <input type="text" date= "date" location="location" time="time"/>
            <select name="type">
                <option value="personal meeting">Personal Meeting</option>
                <option value="group meeting">Group Meeting</option>
            </select>
            <button onClick={onSumbit}>Create Meeting</button>

        </form>
        
  );

}

export default meetingForm;