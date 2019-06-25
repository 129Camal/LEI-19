const state = {
    token: localStorage.getItem('access_token') || null
}

const getters = {
    getToken: state => state.token,
    loggedIn: state => {
        return state.token !== null
    }
}

const actions = {}

const mutations = {
    setToken: (state, token) => state.token = token,
    removeToken: (state) => state.token = null
}

export default {
    state,
    getters,
    actions,
    mutations
} 