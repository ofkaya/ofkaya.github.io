import { useEffect, useState } from 'react';
import axios from 'axios';
import Hebcal from 'hebcal';
import {
    NotificationManager,
} from "react-notifications";
import './MainForm.css';
function MainForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [dots, setDots] = useState('');
    const month_in_hebrow = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי",
        "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
    const megama_list = ["נחשון", "מעוז", "להב", "גפן"]
    const gdod_list = ["ברוש", "ארז", "דקל", "הדס", "חרוב", "גפן"]

    const [megama, setMegama] = useState('נחשון');
    const [gdod, setGdod] = useState('ברוש');

    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [teamNumber, setTeamNumber] = useState('');
    const [context, setContext] = useState('');
    const [rank, setRank] = useState('צוער');
    const [el, setEl] = useState('');
    const [da, setDa] = useState('');

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setDots((prevDots) => {
                    return prevDots === '...' ? '' : prevDots + '.';
                });
            }, 500); // Change the dots every 500ms

            return () => clearInterval(interval);
        }
    }, [isLoading]);



    function convertToPDF() {
        try {
            if (title !== "" && fullName !== "" && teamNumber !== "" && context !== "" && el !== "" && da !== "" && rank !== "") {
                const scriptUrl = 'https://script.google.com/macros/s/AKfycbxubmPajVZwnupbOBvFlUyQcFPa-0RPD9LHIBQaFZS2JuVV2e0VAi0f-3rnnAbb51Iz/exec';
                setIsLoading(true)

                const currentDate = new Date();
                const today = new Hebcal.HDate();
                const hebrewDateStr = today.toString('h');
                const hebrewDateArray = hebrewDateStr.split(' ');

                // Create a FormData object
                const formData = new FormData();
                formData.append('title', title);
                formData.append('context', context);
                formData.append('full_name', fullName);
                formData.append('el', el);
                formData.append('da', da);
                formData.append('rank', rank);
                formData.append('team_number', teamNumber);
                formData.append('g_day', currentDate.getDate());
                formData.append('g_month', "ב" + month_in_hebrow[currentDate.getMonth()]);
                formData.append('g_year', currentDate.getFullYear());
                formData.append('h_day', hebrewDateArray[0]);
                formData.append('h_month', hebrewDateArray[1]);
                formData.append('h_year', hebrewDateArray[2]);
                formData.append('megama', megama);
                formData.append('gdod', gdod);
                axios.post(scriptUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the Content-Type header to multipart/form-data
                    },
                })
                    .then((response) => {
                        setIsLoading(false);
                        window.location.href = response.data;
                        NotificationManager.success('הקובץ ירד תוך מספר שניות', 'המתן', 3000);



                    })
                    .catch((error) => {
                        console.error(error)
                        setIsLoading(false);
                        NotificationManager.error('לא הצליח לייצר את הקובץ', 'שגיאה', 3000);

                    });

            }
            else {
                NotificationManager.error('בבקשה למלא את כל הפרטים', 'שגיאה', 3000);
            }


        } catch (error) {
            console.error('An error occurred while converting to PDF.');
        }
    }
    return (
        <div className="main-form">
            <div className='input-block'>
                <label className='form-input-lable'>כותרת העבודה</label>
                <input type='text' className='form-input' dir='rtl' value={title} onChange={(value) => { setTitle(value.target.value) }}></input>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>שם מלא</label>
                <input type='text' className='form-input' dir='rtl' value={fullName} onChange={(value) => { setFullName(value.target.value) }}></input>
            </div>
            <div className='gdod-megama'>
                <div className='input-block'>
                    <label className='form-input-lable'>מגמה</label>

                    <select id="dropdown" value={megama} onChange={(event) => { setMegama(event.target.value) }} dir='rtl' className='form-input'>
                        <option value="">בחר מגמה...</option>
                        {megama_list.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='input-block'>
                    <label className='form-input-lable'>גדוד</label>
                    <select id="dropdown" value={gdod} onChange={(event) => { setGdod(event.target.value) }} dir='rtl' className='form-input'>
                        <option value="">בחר גדוד...</option>
                        {gdod_list.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>צוות</label>
                <input type='text' className='form-input' dir='rtl' value={teamNumber} onChange={(value) => { setTeamNumber(value.target.value) }}></input>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>דרגה</label>
                <input type='text' className='form-input' dir='rtl' value={rank} onChange={(value) => { setRank(value.target.value) }}></input>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>אל</label>
                <input type='text' className='form-input' dir='rtl' value={el} onChange={(value) => { setEl(value.target.value) }}></input>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>דע</label>
                <input type='text' className='form-input' dir='rtl' value={da} onChange={(value) => { setDa(value.target.value) }}></input>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>תוכן העבודה</label>
                <textarea className='form-input textarea' dir='rtl' style={{ height: "10vh" }} value={context} onChange={(value) => { setContext(value.target.value) }}></textarea>
            </div>
            <button
                className={`submit-button ${isLoading ? 'loading' : ''}`}
                onClick={convertToPDF}
                disabled={isLoading}
            >
                {isLoading ? `${dots}מייצר את העבודה` : `הורד עבודה`}
            </button>

        </div>

    );
}

export default MainForm;
