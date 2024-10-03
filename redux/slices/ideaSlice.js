import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ideas: [],
};

const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    addIdea: (state, action) => {
      state.ideas.push(action.payload);
    },

    deleteIdea: (state, action) => {
      state.ideas = state.ideas.filter((idea) => idea.id !== action.payload);
    },
  },
});

export const { addIdea } = ideaSlice.actions;

export default ideaSlice.reducer;
