import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
  name: "",
  id: 0,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.people.push({ ...action.payload, ideas: [] });
    },

    deletePerson: (state, action) => {
      state.people = state.people.filter(
        (person) => person.id !== action.payload
      );
    },

    addPersonIdea: (state, action) => {
      const person = state.people.find(
        (person) => person.id === action.payload.personId
      );
      if (person) {
        person.ideas.push(action.payload.idea);
      }
    },

    deletePersonIdea: (state, action) => {
      const person = state.people.find(
        (person) => person.id === action.payload.personId
      );

      if (person) {
        person.ideas = person.ideas.filter(
          (idea) => idea.id !== action.payload.ideaId
        );
      }
    },

    assignName: (state, action) => {
      state.name = action.payload;
    },

    assignId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {
  addPerson,
  deletePerson,
  addPersonIdea,
  deletePersonIdea,
  assignId,
  assignName,
} = personSlice.actions;

export default personSlice.reducer;
