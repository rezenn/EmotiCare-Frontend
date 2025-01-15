import Navbar from "../component/Navbar/Navbar";
import MoodCalendar from "../component/Calendar/MoodCalendar";
import Footer from "../component/Footer/Footer2";

function MoodTracker({setAuth}){
    return(
        <>
        <Navbar/>
        <MoodCalendar setAuth={setAuth}/>
        <Footer/>
        </>
    )
}

export default MoodTracker;