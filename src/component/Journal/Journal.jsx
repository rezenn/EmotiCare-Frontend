// import React, { Component } from "react";
// import { connect } from "react-redux";
// import JournalForm from "./JournalForm";
// import JournalItem from "./JournalItem";

// export class Journal extends Component {
//   render() {
//     const { addItem, journalItems } = this.props;
//     return (
//       <div className="grid-container">
//         <div className="Journal">
//           <h1>Daily Journal</h1>
//           <JournalForm addItem={(item) => addItem(item)} />
//         </div>
//         <div className="Journal">
//           {journalItems.length > 0 ? (
//             journalItems.map((item, index) => {
//               return <JournalItem item={item} />;
//             })
//           ) : (
//             <h1>No items</h1>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   journalItems: state.journalItems,
// });

// const mapDispatchToProps = () => ({
//   addItem: (item) => dispatch(addItem(item)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Journal);
