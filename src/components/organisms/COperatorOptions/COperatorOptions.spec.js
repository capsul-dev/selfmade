/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import COperatorOptions from './COperatorOptions.vue'

describe('./COperatorOptions.vue', () => {
  it('renders save options', () => {
    const component = shallowMount(COperatorOptions)
    expect(component.isVisible()).toBe(true)
  })
})
