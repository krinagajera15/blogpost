import './ConfirmationModal.css'

export const ConformModel=({
    title,
    desc,
    onConfirm,
    onClose,
    ConfirmBtnText
})=>{

    return(
        <div className="model-main-class">
            <div className="model-class">
                <h1>{title}</h1>
                <h2>{desc}</h2>

                <div className="model-all-btn-class">
                    <button className="model-cancel-btn-class" onClick={onClose}>Cancel</button>
                    <button className="model-delete-btn-class" onClick={onConfirm}>{ConfirmBtnText}</button>
                </div>
            </div>
        </div>
    );
}