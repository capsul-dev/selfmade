/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CButton from "./CButton.vue";

describe("./CButton.vue", () => {
  it("renders a button", () => {
    const component = shallowMount(CButton, {
      slots: {
        default: "Test",
      },
    });

    expect(component.text()).toBe("Test");
  });
});
