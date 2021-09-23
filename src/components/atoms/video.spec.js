/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CVideo from "./video.vue";

describe("video.vue", () => {
  it("renders a video container", () => {
    const component = shallowMount(CVideo, {
      propsData: {
        details: {
          id: "1234",
        }
      },
    });

  expect(component.isVisible()).toBe(true);
  });
});
