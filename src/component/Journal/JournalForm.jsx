// import React, { useState } from "react";

// export default function JournalForm(addItem) {
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [text, setText] = useState("");

//   const onSumbit = (event) => {
//     event.preventDefault();
//     let itemObject = {
//       title: title,
//       date: date,
//       text: text,
//     };
//     addItem(itemObject);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <div className="journal-form">
//           <input
//             onChange={(event) => setTitle(event.target.value)}
//             type="text"
//             placeholder="Item"
//             className="journal-input"
//           />
//           <input
//             type="date"
//             onChange={(event) => setDate(event.target.value)}
//             className="journal-date"
//           />
//         </div>
//         <textarea
//           onChange={(event) => setText(event.target.value)}
//           className="journal-textArea"
//           rows="2"
//         ></textarea>
//         <button className="journal-button" type="submit">
//           Add Journal
//         </button>
//       </form>
//     </div>
//   );
// }
