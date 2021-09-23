/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CArrow from "./CArrow.vue";

describe("./CArrow.vue", () => {
  it("renders a arrow pointing left", () => {
    const component = shallowMount(CArrow, {
      propsData: { direction: "left" },
    });

    expect(component.element.children[0]?.classList).toContain(
      "fa-chevron-left"
    );
  });

  it("renders a arrow pointing right", () => {
    const component = shallowMount(CArrow, {
      propsData: { direction: "right" },
    });

    expect(component.element.children[0]?.classList).toContain(
      "fa-chevron-right"
    );
  });
});
