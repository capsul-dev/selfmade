/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CSectionList from './CSectionList.vue'

describe('./CSectionList.vue', () => {
  it('renders section list widget', () => {
    const component = shallowMount(CSectionList)
    expect(component.isVisible()).toBe(true)
  })
})
