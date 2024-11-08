import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";
import {
  customTopic,
  card,
  updateTopic,
  createTopic,
  deleteTopic,
  getTopics,
  createCard,
  deleteCard,
  updateCard,
  moveCardUp,
  moveCardDown,
} from "./customTopics";

// Tracks the custom topics associated info.
// Typing for `state`.
interface customTopicsState {
  topics: customTopic[];
  managingTopic: customTopic | null;
  managingCard: card | null;
  activeTopic: customTopic | null;
  error: string | null | undefined;
}
const initialState: customTopicsState = {
  topics: [],
  managingTopic: null,
  managingCard: null,
  activeTopic: null,
  error: null,
};

// Helper that updates managing, active and topic list with a new topic.
const updateTopicStates = (state: customTopicsState, topic: customTopic) => {
  // Update managing topic.
  state.managingTopic = topic;
  // Update active topic.
  if (state.managingTopic?.dir === state.activeTopic?.dir)
    state.activeTopic = state.managingTopic;
  // Update topic in topic list.
  state.topics = state.topics.filter(
    (topic) => topic.dir !== state.managingTopic?.dir,
  );
  if (state.managingTopic) state.topics.push(state.managingTopic);
};

// Slice definition.
export const customTopicsSlice = createSlice({
  name: "customTopics",
  initialState,
  reducers: {
    setManagingTopic: (state, action) => {
      state.managingTopic = action.payload;
    },
    setActiveTopic: (state, action) => {
      state.activeTopic = action.payload;
    },
    setManagingCard: (state, action) => {
      state.managingCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Update topic.
    builder.addCase(updateTopic.fulfilled, (state, action) => {
      // Update topic in topic list.
      state.topics = state.topics.filter(
        (topic) => topic.dir !== action.payload.dir,
      );
      state.topics.push(action.payload);
      // Update managing/active topic if they have been edited.
      if (state.managingTopic?.dir === action.payload.dir) {
        state.managingTopic = action.payload;
      }
      if (state.activeTopic?.dir === action.payload.dir) {
        state.activeTopic = action.payload;
      }
    });
    builder.addCase(updateTopic.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Delete topic.
    builder.addCase(deleteTopic.fulfilled, (state, action) => {
      state.topics = state.topics.filter(
        (topic) => topic.dir !== action.payload.dir,
      );
      // Unset active topic if it is deleted.
      if (state.activeTopic?.dir === action.payload.dir) {
        state.activeTopic = null;
      }
    });
    builder.addCase(deleteTopic.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Create topic.
    builder.addCase(createTopic.fulfilled, (state, action) => {
      state.topics.push(action.payload);
    });
    builder.addCase(createTopic.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Get topics.
    builder.addCase(getTopics.fulfilled, (state, action) => {
      state.topics = action.payload;
    });
    builder.addCase(getTopics.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
      state.topics = [];
    });
    // Create a Card in the supplied topic.
    builder.addCase(createCard.fulfilled, (state, action) => {
      updateTopicStates(state, action.payload);
    });
    builder.addCase(createCard.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Delete a card from its topic.
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      updateTopicStates(state, action.payload);
    });
    builder.addCase(deleteCard.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Update a card in its topic.
    builder.addCase(updateCard.fulfilled, (state, action) => {
      updateTopicStates(state, action.payload);
    });
    builder.addCase(updateCard.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Move a card down in its topic.
    builder.addCase(moveCardUp.fulfilled, (state, action) => {
      updateTopicStates(state, action.payload);
    });
    builder.addCase(moveCardUp.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Move a card up in its topic.
    builder.addCase(moveCardDown.fulfilled, (state, action) => {
      updateTopicStates(state, action.payload);
    });
    builder.addCase(moveCardDown.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
  },
});

// Exports.
export const { setManagingTopic, setActiveTopic, setManagingCard } =
  customTopicsSlice.actions;
export const selectTopics = (state: RootState) => state.customTopics.topics;
export const selectManagingTopic = (state: RootState) =>
  state.customTopics.managingTopic;
export const selectManagingCard = (state: RootState) =>
  state.customTopics.managingCard;
export const selectActiveTopic = (state: RootState) =>
  state.customTopics.activeTopic;
export default customTopicsSlice.reducer;
