import "./note.css"

function Note(){

    return(
        <>
        <div className="noteContainer">
            <span className="noteTitle">Notes</span>
            <hr />
            <textarea name="notes" id="notes" className="note"></textarea>
        </div>
        </>
    )
}

export default Note;