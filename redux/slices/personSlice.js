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

    addPersonIdea: (state, action) => {
      const person = state.people.find(
        (person) => person.id === action.payload.personId
      );
      if (person) {
        if (!person.ideas) {
          person.ideas = [];
        }

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
  addPersonIdea,
  assignId,
  assignName,
  deletePersonIdea,
} = personSlice.actions;

export default personSlice.reducer;
