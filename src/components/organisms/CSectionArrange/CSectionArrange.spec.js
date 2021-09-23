/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CSectionArrange from './CSectionArrange.vue'

describe('./CSectionArrange.vue', () => {
  it('renders save options', () => {
    const component = shallowMount(CSectionArrange)
    expect(component.isVisible()).toBe(true)
  })
})
