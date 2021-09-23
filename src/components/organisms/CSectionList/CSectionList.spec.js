/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CSectionList from './CSectionList.vue'

describe('./CSectionList.vue', () => {
  it('renders save options', () => {
    const component = shallowMount(CSectionList)
    expect(component.isVisible()).toBe(true)
  })
})
