/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CBusinessInfo from './business-info.vue'

describe('business-info.vue', () => {
  it('renders information in operator mode', () => {
    const component = shallowMount(CBusinessInfo)
    expect(component.isVisible()).toBe(true)
  })
})
