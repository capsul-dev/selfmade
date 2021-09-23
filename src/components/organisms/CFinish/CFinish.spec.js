/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CFinish from './CFinish.vue'

describe('./CFinish.vue', () => {
  it('renders save options', () => {
    const component = shallowMount(CFinish)
    expect(component.isVisible()).toBe(true)
  })
})
