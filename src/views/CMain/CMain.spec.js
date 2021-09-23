/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CMain from './main.vue'

describe('main.vue', () => {
  it('renders the main view', () => {
    const component = shallowMount(CMain)
    expect(component.isVisible()).toBe(true)
  })
})
