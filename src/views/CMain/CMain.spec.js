/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CMain from './CMain.vue'

describe('./CMain.vue', () => {
  it('renders the main view', () => {
    const component = shallowMount(CMain)
    expect(component.isVisible()).toBe(true)
  })
})
