/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CStep from './CStep.vue'

describe('./CStep.vue', () => {
  it('renders a step container', () => {
    const component = shallowMount(CStep, {
      slots: {
        named: {
          title: 'Test',
          description: 'Lorem ipsum dolor sit amet'
        }
      }
    })

    expect(component.isVisible()).toBe(true)
  })
})
