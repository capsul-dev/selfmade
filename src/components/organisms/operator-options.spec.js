/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import COperatorOptions from './operator-options.vue'

describe('operator-options.vue', () => {
  it('renders save options', () => {
    const component = shallowMount(COperatorOptions)
    expect(component.isVisible()).toBe(true)
  })
})
