import { createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

import { forceCreateDir } from "../lib/files";

// CustomTopics CRUD.
// Filename for customTopics data.
const customTopicsJsonBasename = "/customTopics.json";

// Typing for `card`.
export interface card {
  image: string | null;
  title: string | null;
  desc: string | null;
  machineName: string;
}
// Typing for `state`.
export interface customTopic {
  dir: string;
  title: string | null;
  desc: string | null;
  cardsOverTime: number;
  cards: card[];
}

// Directory constants.
export const customTopicsDir = FileSystem.documentDirectory + "customTopics/";

// Get customTopics.
export const getTopics = createAsyncThunk("getCustomTopics", async () => {
  await forceCreateDir(customTopicsDir);
  const topicDirs = await FileSystem.readDirectoryAsync(customTopicsDir);
  let topics: customTopic[] = [];
  if (topicDirs) {
    topics = await Promise.all(
      topicDirs.map(async (topicDir) => {
        let topicVals: customTopic = {
          dir: customTopicsDir + topicDir,
          title: null,
          desc: null,
          cards: [],
          cardsOverTime: 0,
        };
        try {
          topicVals = JSON.parse(
            await FileSystem.readAsStringAsync(
              customTopicsDir + topicDir + customTopicsJsonBasename,
            ),
          );
        } catch (err) {
          console.error("Failed while getting topics", err);
        }
        return topicVals;
      }),
    );
  }
  return topics;
});

// Write a topic JSON file.
const writeTopicJson = async (topicIn: customTopic) => {
  return await FileSystem.writeAsStringAsync(
    topicIn.dir + customTopicsJsonBasename,
    JSON.stringify(topicIn),
  );
};

// Create a topic.
export const createTopic = createAsyncThunk("createTopic", async () => {
  await forceCreateDir(customTopicsDir);

  const topicDirs = await FileSystem.readDirectoryAsync(customTopicsDir);
  const topicDir =
    customTopicsDir +
    (topicDirs
      ? topicDirs.reduce((acc: number, value: string) => {
          return (acc =
            acc > parseInt(value, 10) ? acc : parseInt(value, 10) + 1);
        }, 1)
      : 1);

  await forceCreateDir(topicDir);

  const topic = {
    dir: topicDir,
    title: null,
    desc: null,
    cards: [],
    cardsOverTime: 0,
  };
  writeTopicJson(topic);

  return topic;
});

// Delete a topic.
export const deleteTopic = createAsyncThunk(
  "deleteTopic",
  async (dir: string) => {
    await FileSystem.deleteAsync(dir, { idempotent: true });
    return { dir };
  },
);

// Update a topic.
export const updateTopic = createAsyncThunk(
  "updateTopic",
  async (topicIn: customTopic) => {
    await writeTopicJson(topicIn);
    return topicIn;
  },
);
// Implement createCard.
export const createCard = createAsyncThunk(
  "createCard",
  async (topic: customTopic) => {
    const updatedTopic = JSON.parse(JSON.stringify(topic));
    updatedTopic.cardsOverTime++;
    const newCard = {
      image: "",
      title: null,
      desc: null,
      machineName: `${updatedTopic.cardsOverTime}`,
    };
    updatedTopic.cards.push(newCard);
    writeTopicJson(updatedTopic);
    return updatedTopic;
  },
);
// Implement deleteCard.
export const deleteCard = createAsyncThunk(
  "deleteCard",
  async ({ topic, card }: { topic: customTopic; card: card }) => {
    const updatedTopic = JSON.parse(JSON.stringify(topic));
    updatedTopic.cards = updatedTopic.cards.filter(
      (val: card) => val.machineName !== card.machineName,
    );
    writeTopicJson(updatedTopic);
    return updatedTopic;
  },
);
// @todo Implement updateCard.
export const updateCard = createAsyncThunk(
  "updateCard",
  async ({ topic, card }: { topic: customTopic; card: card }) => {
    const updatedTopic = JSON.parse(JSON.stringify(topic));
    writeTopicJson(updatedTopic);
    return updatedTopic;
  },
);
// @todo Implement moveCardUp.
export const moveCardUp = createAsyncThunk(
  "moveCardUp",
  async ({ topic, card }: { topic: customTopic; card: card }) => {
    const updatedTopic = JSON.parse(JSON.stringify(topic));
    writeTopicJson(updatedTopic);
    return updatedTopic;
  },
);
// @todo Implement moveCardDown.
export const moveCardDown = createAsyncThunk(
  "moveCardDown",
  async ({ topic, card }: { topic: customTopic; card: card }) => {
    const updatedTopic = JSON.parse(JSON.stringify(topic));
    writeTopicJson(updatedTopic);
    return updatedTopic;
  },
);
