import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
  name: "",
  id: 0,
  width: 0,
  height: 0,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.people.push({ ...action.payload, ideas: [] });
    },

    addPersonIdea: (state, action) => {
      const person = state.people.find(
        (person) => person.id === action.payload.personId
      );
      if (person) {
        if (!person.ideas) {
          person.ideas = [];
        }
        console.log(action.payload.idea);
        person.ideas.push(action.payload.idea);
      }
    },

    deletePerson: (state, action) => {
      state.people = state.people.filter(
        (person) => person.id !== action.payload
      );
    },

    assignName: (state, action) => {
      state.name = action.payload;
    },

    assignId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { addPerson, addPersonIdea, assignId, assignName, deletePerson } =
  personSlice.actions;

export default personSlice.reducer;
