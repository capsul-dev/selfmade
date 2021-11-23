/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CSection from "./CSection.vue";
import store from "@/store"

describe("./CSection.vue", () => {
  it("renders a section container", () => {
    const component = shallowMount(CSection, {
      global: {
        plugins: [store]
      },
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
