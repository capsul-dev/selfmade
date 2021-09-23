/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CSectionList from './section-list.vue'

describe('section-list.vue', () => {
  it('renders save options', () => {
    const component = shallowMount(CSectionList)
    expect(component.isVisible()).toBe(true)
  })
})
