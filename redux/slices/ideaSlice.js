import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ideas: [],
  id: 0,
  name: "",
};

const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    addIdea: (state, action) => {
      state.ideas.push(action.payload);
    },

    assignName: (state, action) => {
      state.name = action.payload;
    },

    assignId: (state, action) => {
      state.id = action.payload;
    },

    deleteIdea: (state, action) => {
      state.ideas = state.ideas.filter((idea) => idea.id !== action.payload);
    },
  },
});

export const { addIdea, assignName, assignId } = ideaSlice.actions;

export default ideaSlice.reducer;
