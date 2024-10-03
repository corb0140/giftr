import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.people.push(action.payload);
    },

    deletePerson: (state, action) => {
      state.people = state.people.filter(
        (person) => person.id !== action.payload
      );
    },
  },
});

export const { addPerson } = personSlice.actions;

export default personSlice.reducer;
