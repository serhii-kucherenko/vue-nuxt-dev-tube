import firebase, { auth, GoogleProvider } from "@/services/fireinit.js";
import YouTube from "simple-youtube-api";
import configs from "~/configs/config";

const youtube = new YouTube(configs.youtubeApiKey);

const actions = {
  saveVideo({ commit, state }) {
    const userId = firebase.auth().currentUser.uid;
    const video = { [state.currentVideo.id]: state.currentVideo };
    state.loading = true;
    firebase
      .database()
      .ref("/users/" + userId + "/savedVideos")
      .update(video)
      .then(() => {
        state.loading = false;
        commit("setSavedVideo", video);
      })
      .catch(console.log);
  },
  markLearned({ commit, state }) {
    const userId = firebase.auth().currentUser.uid;
    const video = { [state.currentVideo.id]: state.currentVideo };
    state.loading = true;
    firebase
      .database()
      .ref("/users/" + userId + "/learnedVideos")
      .update(video)
      .then(() => {
        state.loading = false;
        console.log(video);
        commit("setLearnedVideo", state.currentVideo);
      })
      .catch(console.log);
  },
  autoSignIn({ commit }, payload) {
    commit("setUser", payload);
  },
  signInWithGoogle({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider);
      resolve();
    });
  },
  signOut({ commit }) {
    auth
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
      .catch(console.log);
  },
  findVideos({ commit }, { query, amount }) {
    commit("setLoadingStatus", true);
    youtube
      .searchVideos(query, amount)
      .then(data => {
        commit("setVideos", data);
        commit("setLoadingStatus", false);
      })
      .catch(console.log);
  },
  loadVideoById({ commit, getters }, videoId) {
    if (getters.getVideosMap[videoId])
      commit("setCurrentVideo", getters.getVideosMap[videoId]);

    youtube
      .getVideoByID(videoId)
      .then(video => commit("setCurrentVideo", video))
      .catch(console.log);
  }
};

export default actions;
