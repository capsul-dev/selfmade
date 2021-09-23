/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CModal from './modal.vue'

describe('modal.vue', () => {
  it('renders a modal', () => {
    const component = shallowMount(CModal, {
      slots: {
        named: {
          title: 'Test',
          body: 'lorem ipsum dolor sit amet'
        }
      }
    })

    expect(component.isVisible()).toBe(true)
  })
})
