/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import CSectionArrange from './CSectionArrange.vue'
import store from '@/store';

describe('./CSectionArrange.vue', () => {
  it('renders section arrangement widget', () => {
    const component = shallowMount(CSectionArrange, {
      global: {
        plugins: [store]
      }
    });
    expect(component.isVisible()).toBe(true)
  })
})
