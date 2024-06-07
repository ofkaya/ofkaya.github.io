import './AppFooter.css';
import BroshLogo from '../../img/BroshLogo.png'
import Bhad1Logo from '../../img/Bhad1Logo.png'

function AppFooter() {
    return (
        <footer className="footer">
            <div className="left">
                <div className="image-container">
                    <img src={Bhad1Logo} alt={Bhad1Logo} />

                </div>
            </div>
            <div className="text">
                <p>אֱמֹר מְעַט וַעֲשֵׂה הַרְבֵּה</p>
                <p>פותח על ידי פלוגה ב’ ברוש 82 ועודכן על ידי פלוגת נבו ברוש 85</p>
                <a href='https://forms.gle/CKAe4pDf7nHTZ3Q26' dir="rtl" target="_blank" className="link"
        rel="noreferrer">מצאתם באג? רוצים לדווח על תקלה? לחצו כאן</a>
            </div>
            <div className="right">
                <div className="image-container">
                    <img src={BroshLogo} alt={BroshLogo} />
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;
