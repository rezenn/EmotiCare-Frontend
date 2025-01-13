// import { ADD_ITEM, DELETE_ITEM } from "./action";

// const initialState = {
//   journalItems: [],
// };

// const journalReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ITEM:
//       let id = 1;
//       if (state.journalItems.length > 0) {
//         id = state.journalItems[0].id + 1;
//       }
//       let item = {
//         id: id,
//         title: action.payload.title,
//         date: action.payload.date,
//         text: action.payload.text,
//       };
//       return {
//         ...state,
//         journalItems: [item, ...state.journalItems],
//       };
//     default:
//       return state;
//   }
// };
// export default journalReducer;
