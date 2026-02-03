import { useContext } from 'react';
import Modecontext from '../Context/ModeContext';
import './PageiNation.css'

export const PageNation=({currentPage,totalPages,onPrev,onNext,numChange})=>{

    const ctx=useContext(Modecontext);
    console.log(ctx,"pagination Context Value");

    const handleSelectChange = (e) => {
        numChange(Number(e.target.value));
    };
    return(
        <>
            <div className={`main-pagein-class ${ctx.mode}`}>
                <select className="select-class" onChange={handleSelectChange}>
                    <option value={"10"}>10</option>
                    <option value={"20"}>20</option>
                    <option value={"25"}>25</option>
                    <option value={"25"}>30</option>
                    <option value={"35"}>35</option>
                </select>
                <button className="prev-btn-class" onClick={onPrev} disabled={currentPage==1}>PREV</button>
                <span className="label-class">{currentPage} of {totalPages}</span>
                <button className="next-btn-class" onClick={onNext} disabled={currentPage===totalPages}>NEXT</button>
            </div>
        </>
    );
}