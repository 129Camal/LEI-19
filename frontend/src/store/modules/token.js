const state = {
    token: null
}

const getters = {
    getToken: state => state.token
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