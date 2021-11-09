/* eslint-disable no-undef */
import store from '@/store';
import { mount } from '@vue/test-utils'
import CSectionList from './CSectionList.vue'

describe('./CSectionList.vue', () => {
  it('renders section list widget', () => {
    const component = mount(CSectionList, {
      global: {
        plugins: [store]
      }
    })
    expect(component.isVisible()).toBe(true)
  })
})
