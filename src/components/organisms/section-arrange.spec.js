/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CSectionArrange from './section-arrange.vue'

describe('section-arrange.vue', () => {
  it('renders save options', () => {
    const component = shallowMount(CSectionArrange)
    expect(component.isVisible()).toBe(true)
  })
})
