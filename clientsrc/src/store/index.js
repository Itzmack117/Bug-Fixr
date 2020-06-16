import Vue from "vue";
import Vuex, { Store } from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    Notes: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, data) {
      state.bugs = data
    },
    setActiveBug(state, data) {
      state.activeBug = data
    },
    setNotes(state, data) {
      console.log("notes set")
      state.Notes = data
    },
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit }) {
      try {
        let res = await api.get('bugs/')
        console.log("getting bugs...");
        commit("setBugs", res.data)
      } catch (error) { console.error(error) }
    },
    async reportBug({ commit, dispatch }, bugData) {
      try {
        let res = await api.post('bugs/', bugData)
        dispatch('getBugs')
      } catch (error) {
        console.error(error);
      }
    },
    async getBugById({ commit, dispatch }, id) {
      try {
        let res = await api.get('bugs/' + id)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getNotesbyBugId({ commit, dispatch }, bugId) {
      try {
        let res = await api.get('bugs/' + bugId + '/notes')
        commit('setNotes', res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async editBug({ commit, dispatch }, data) {
      try {
        let res = await api.put('bugs/' + data.id, data)
      } catch (error) {
        console.error(error);
      }
    },
    async addNote({ commit, dispatch }, data) {
      try {
        let res = await api.post('notes',)
      }
  }
  }
});
