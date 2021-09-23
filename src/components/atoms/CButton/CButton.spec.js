/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CButton from "./button.vue";

describe("button.vue", () => {
  it("renders a button", () => {
    const component = shallowMount(CButton, {
      slots: {
        default: "Test",
      },
    });

    expect(component.text()).toBe("Test");
  });
});
