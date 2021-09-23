/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CInput from "./CInput.vue";

describe("./CInput.vue", () => {
  it("renders a input wrapper", () => {
    const component = shallowMount(CInput, {
      propsData: {
        type: "password",
        modelValue: "test",
        placeholder: "Password",
      },
      slots: {
        default: "Your password",
      },
    });

    const input = component.element.querySelector("input");

    expect(input.type).toBe("password");
    expect(input.placeholder).toBe("Password");
    expect(component.element.querySelector(".text-sm").innerHTML).toBe(
      "Your password"
    );
  });
});
