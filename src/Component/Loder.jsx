import './Loder.css'
import Lottie from "react-lottie-player";
import loder from'../assets/image/Meta AI logo.json'

const Loder=()=>{
    return(
        <>
        <div className="loader-overlay">
            <div className="loader-box">
                <Lottie
                animationData={loder}
                play
                loop
                style={{ width: 200, height: 200 }}
                />
                <p>Loading...</p>
            </div>
        </div>
        </>
    );
}
export default Loder;