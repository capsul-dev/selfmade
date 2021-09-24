/* eslint-disable no-undef */
import { default as store } from './index'
const { mutations } = store
const initialState = store.state

describe('business store module', () => {
    it('imports state', () => {
        const state = initialState()
        const newState = Object.assign(state, {})

        newState.isAdmin = true
        newState.clientName= 'John Doe'

        mutations.BUSINESS_IMPORT(state, newState)

        expect(state.isImported).toBe(true)
        expect(state.isAdmin).toBe(true)
        expect(state.clientName).toBe('John Doe')
    })
})
