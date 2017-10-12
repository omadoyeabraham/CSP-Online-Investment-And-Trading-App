/**
 * Test suite to test the Login Component
 *
 * @author Omadoye Abraham
 */

 import Vue from 'vue'
 import LoginComponent from '../../../src/components/Login'

 describe('LoginComponent', () => {
   it('has a before destroy hook', () => {
     const Constructor = Vue.extend(LoginComponent)
     const vm = new Constructor().$mount()

     expect(vm.$el.querySelector('.hello h1').textContent)
          .to.equal('YHHHHHHHHHHHH')
     expect(typeof LoginComponent.beforeDestroy).to.equal('function')
   })
 })
