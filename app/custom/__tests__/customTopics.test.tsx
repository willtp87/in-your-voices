import { renderRouter } from "expo-router/testing-library";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../../store";
import { createTopic } from "../../../store/customTopics";
import PlayCustomTopics from "../customTopics";

describe("<PlayCustomTopics />", () => {
  it("has expected number of children", async () => {
    const dispatch = store.dispatch;
    dispatch(createTopic());
    const tree: any = renderRouter({
      index: () => (
        <Provider store={store}>
          <PlayCustomTopics />
        </Provider>
      ),
    }).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
