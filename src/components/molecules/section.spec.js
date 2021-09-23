/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CSection from "./section.vue";

describe("section.vue", () => {
  it("renders a section container", () => {
    const component = shallowMount(CSection, {
      slots: {
        named: {
          info: "Section information",
        },
      },
      propsData: {
        element: {
          selectedStyle: {
            name: "Style #1",
            image: "image_source",
          },
        },
      },
    });

    expect(component.element.querySelector("img").src).toContain(
      "image_source"
    );
  });
});
