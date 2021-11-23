/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import CFinish from './CFinish.vue';
import store from '@/store';

describe('./CFinish.vue', () => {
  it('renders save options', () => {
    const component = mount(CFinish, { 
      global: {
        plugins: [store],
      }
    });
    expect(component.isVisible()).toBe(true)
  })
})
