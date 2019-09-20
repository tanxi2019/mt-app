import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit ({
      commit
    }, { req, app }) {
      const {
        // eslint-disable-next-line no-unused-vars
        status,
        data: {
          // eslint-disable-next-line no-unused-vars
          province,
          // eslint-disable-next-line no-unused-vars
          city
        }
      } = await app.$axios.get('/geo/getPosition')
      // eslint-disable-next-line no-console
      // console.log(province, city)
      commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })
      const { status: status2, data: { menu } } = await app.$axios.get('geo/menu')
      commit('home/setMenu', status2 === 200 ? menu : [])
      // const { status: status3, data: { result } } = await app.$axios.get('/search/hotPlace', {
      //   params: {
      //     city: app.store.state.geo.position.city.replace('市', '')
      //   }
      // })
      // commit('home/setHotPlace', status3 === 200 ? result : [])
    }
  }
})

export default store
