import "./Footer.css";

function Footer(){
    return(
        <>
        
        <footer className="footer">
            <hr />
            <img  src="./src/assets/logo.png" alt="EmotiCare Logo" />
            <hr />
            <div className="footerRow">
                <div className="footerCol">
                    <h4>Useful Social Sites</h4>
                    <ul>
                        <li><a href="https://www.thehealthsite.com/" target="_blank"> The Health Site</a></li>
                        <li><a href="https://mhanational.org/" target="_blank"> Mental Health America</a></li>
                        <li><a href="https://www.mentalhealth.com/" target="_blank"> MentalHealth.com</a></li>
                        <li><a href="https://www.moodgym.com.au/" target="_blank"> Mood Gym</a></li>
                    </ul>
                </div>
                <div className="footerCol">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="https://www.activeminds.org/about-mental-health/self-care/" target="_blank">Active Minds</a></li>
                        <li><a href="https://everymind.org.au/need-help-now/self-care" target="_blank">EveryMind</a></li>
                        <li><a href="https://classroommentalhealth.org/self-care/student/" target="_blank"> Classroom Mental Health</a></li>
                        <li><a href="https://www.annafreud.org/resources/children-and-young-peoples-wellbeing/self-care/" target="_blank">Anna freud</a></li>
                    </ul>
                </div>
                <div className="footerCol">
                    <h4>News</h4>
                    <ul>
                        <li><a href="https://www.foxnews.com/" target="_blank">Fox News</a></li>
                        <li><a href="https://www.bbc.com/" target="_blank">BBC News</a></li>
                        <li><a href="https://www.ted.com/" target="_blank">TED</a></li>
                        <li><a href="https://www.dailymail.co.uk/home/index.html" target="_blank">Daily Mail</a></li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="copyright">
            <p>© {new Date().getFullYear()}, EmotiCare All rights reserved</p>

            </div>
        </footer>
        </>
    );
}
export default Footer