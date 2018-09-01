import { pathOr } from "ramda";
import firebase, { auth, GoogleProvider } from "@/services/fireinit.js";
import YouTube from "simple-youtube-api";
import configs from "~/configs/config";

const youtube = new YouTube(configs.youtubeApiKey);

const actions = {
  // INIT /profile/videos/_id
  initSingleVideoPage({ commit, dispatch, state }, videoId) {
    const userId = firebase.auth().currentUser.uid;
    state.loading = true;
    dispatch("loadVideoById", this.videoId);
    firebase
      .database()
      .ref("/users/" + userId)
      .once("value")
      .then(function(snapshot) {
        const data = snapshot.val();
        console.log(
          pathOr(false, ["learnedVideos", videoId], data),
          data.learnedVideos[videoId]
        );
        if (pathOr(false, ["learnedVideos", videoId], data))
          commit("setLearnedVideo", data.learnedVideos[videoId]);
        if (pathOr(false, ["savedVideos", videoId], data))
          commit("setSavedVideo", data.savedVideos[videoId]);

        state.loading = false;
      });
  },
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
        this.$toast.success("Saved");
        commit("setCurrentSavedVideo", video);
      })
      .catch(e => {
        console.log(e);
        this.$toast.error("Didn't save. Server error");
      });
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
        this.$toast.success("Marked");
        commit("setCurrentLearnedVideo", video);
      })
      .catch(e => {
        console.log(e);
        this.$toast.error("Didn't save. Server error");
      });
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
  },
  addNote({ commit }, note) {
    commit("addNote", note);
  },
  deleteNote({ commit }, noteIndex) {
    commit("deleteNote", noteIndex);
  }
};

export default actions;
