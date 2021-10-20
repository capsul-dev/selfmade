/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CBusinessConfig from "./CBusinessConfig.vue";

describe("./CBusinessConfig.vue", () => {
  it("renders information form", () => {
    const component = shallowMount(CBusinessConfig);

    expect(component.isVisible()).toBe(true);
  });
});
