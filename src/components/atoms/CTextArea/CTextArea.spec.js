import { shallowMount } from '@vue/test-utils';
import CTextArea from './CTextArea.vue';

describe("./CTextArea.vue", () => {
    it("should render correctly" , () => {
        const wrapper = shallowMount(CTextArea, {
            props: {
                content: "content"
            }
        });
        expect(wrapper.isVisible()).toBe(true);
    });
});