/* eslint-disable no-undef */
import { default as store } from './index'
const { mutations } = store
const initialState = store.state

describe('modal store module', () => {
  it('spawns and then closes a modal', () => {
    const state = initialState()
    const modal = {
      title: 'Test title',
      body: 'Lorem ipsum dolor sit amet',
    }

    mutations.OVERLAY_SPAWN(state, modal)

    expect(state.isVisible).toBe(true)
    expect(state.title).toBe(modal.title)
    expect(state.body).toBe(modal.body)

    mutations.OVERLAY_CLOSE(state)
    expect(state.isVisible).toBe(false)
  })
})
