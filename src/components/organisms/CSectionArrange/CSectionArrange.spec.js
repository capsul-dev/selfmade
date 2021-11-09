/* eslint-disable no-undef */
import Vue from 'vue';
import Vuex from 'vuex';

import { shallowMount } from '@vue/test-utils';
import CSectionArrange from './CSectionArrange.vue'
import store from '@/store';

describe('./CSectionArrange.vue', () => {
  it('renders section arrangement widget', () => {
    const component = shallowMount(CSectionArrange)
    expect(component.isVisible()).toBe(true)
  })
})
