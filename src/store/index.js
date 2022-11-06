import Vue from "vue";
import Vuex from "vuex";
import axios from "@/api/index";
Vue.use(Vuex);

const DEFAULT_QUERY_PARAMS = {
  page: 1,
  count: 6,
  total: 0,
};

export default new Vuex.Store({
  state: {
    users: [],
    productLinkParams: DEFAULT_QUERY_PARAMS,
    incrementCount: 6,
    positions: [],
    positionId: null,
    responseSuccess: false,
    loader: false,
  },

  getters: {
    users(state) {
      return state.users;
    },

    total(state) {
      return state.productLinkParams.total;
    },

    positions(state) {
      return state.positions;
    },

    positionId(state) {
      return state.positionId;
    },

    responseSuccess(state) {
      return state.responseSuccess;
    },

    loader(state) {
      return state.loader;
    },
  },

  mutations: {
    setApiUsers(state, payload) {
      const sortUsers = payload.data.users.sort(
        (a, b) => b.registration_timestamp - a.registration_timestamp
      );
      state.users = sortUsers;
    },

    setCount(state, payload) {
      state.productLinkParams.count = payload;
    },

    setTotal(state, payload) {
      state.productLinkParams.total = payload;
    },

    setPosition(state, payload) {
      state.positionId = payload[0]?.id;
      state.positions = payload;
    },

    setResponseSuccess(state, payload) {
      state.responseSuccess = payload;
    },

    setUpdateState(state, payload) {
      state.users = payload;
    },
  },

  actions: {
    async getApiUsers({ commit, state }) {
      state.loader = true;
      const { page, count } = state.productLinkParams;
      const users = await axios.get(`users?page=${page}&count=${count}`);

      commit("setTotal", users?.data?.total_users);
      commit("setApiUsers", users);
      state.loader = false;
      commit("setCount", count + state.incrementCount);
    },

    async getPosition({ commit }) {
      const position = await axios.get("/positions");
      commit("setPosition", position.data.positions);
    },

    async getSubmit({ commit, dispatch }, payload) {
      const token = await axios.get("/token");

      const formData = new FormData();
      formData.append("name", payload.name.value);
      formData.append("email", payload.email.value);
      formData.append("phone", payload.phone.value);
      formData.append("photo", payload.imageFile);
      formData.append("position_id", payload.positionId);

      axios
        .post("/users", formData, {
          headers: { Token: token.data.token },
        })
        .then((data) => {
          commit("setResponseSuccess", data.data.success),
            dispatch("getUpdateNewState");
        })
        .catch((error) => console.log(error));
    },

    getUpdateNewState({ commit, state, dispatch }) {
      if (state.users.length) {
        commit("setUpdateState", []);
        commit("setCount", 6);
        commit("setTotal", 0);
        dispatch("getApiUsers");
      }
    },
  },
  modules: {},
});
