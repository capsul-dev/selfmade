/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CBusinessInfo from './CBusinessInfo.vue'

describe('./CBusinessInfo.vue', () => {
  it('renders information in operator mode', () => {
    const component = shallowMount(CBusinessInfo)
    expect(component.isVisible()).toBe(true)
  })
})
