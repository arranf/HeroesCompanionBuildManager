import axios from 'axios'

const state = {
  heroes: []
}

const mutations = {
  SET_HEROES (state, heroes) {
    state.heroes = heroes
  }
}

const getters = {
  getHeroes (state) {
    return state.heroes
  },
  getTalentsByHero: (state) => (hero) => {
    if (!hero) {
      return []
    }
    return state.heroes.find(a => a.HeroId === hero.HeroId).talents
  },
  getTalentsByHeroIdAndLevel: (state) => (heroId, level) => {
    if (!heroId) {
      return []
    }
    let hero = state.heroes.find(a => a.HeroId === heroId)
    return hero.Talents.filter(t => t.Level === level)
  }
}

const actions = {
  fetchHeroes ({ commit }) {
    axios.get('https://data.heroescompanion.com/v1/heroes')
      .then(response => {
        if (response.data) {
          commit('SET_HEROES', response.data)
        } else {
          throw Error('Request for heroes failed')
        }
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
