/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CCheckbox from './CCheckbox.vue'

describe('./CCheckbox.vue', () => {
  it('renders a checkbox', () => {
    const component = shallowMount(CCheckbox, {
      propsData: {
        checked: true,
      }
    })

    expect(component.element.querySelector('input').checked).toBe(true)
  })
})
