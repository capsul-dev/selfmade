import { default as store } from './index'
const { mutations } = store
const initialState = store.state

describe('layout store module', () => {
  it('imports state', () => {
    const state = initialState()
    const newState = [{ name: 'Test' }]

    mutations.LAYOUT_IMPORT(state, newState)
    expect(state.sections[0]?.name).toBe('Test')
    })
  })
