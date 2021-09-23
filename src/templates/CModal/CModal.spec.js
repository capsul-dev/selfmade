/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CModal from './CModal.vue'

describe('./CModal.vue', () => {
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
