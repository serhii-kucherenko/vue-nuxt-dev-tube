import { pathOr, isEmpty } from "ramda";
import firebase, { auth, GoogleProvider } from "@/services/fireinit.js";
import YouTube from "simple-youtube-api";
import configs from "~/configs/config";

const youtube = new YouTube(configs.youtubeApiKey);

const actions = {
  //AUTH
  autoSignIn({ commit }, payload) {
    commit("setUser", payload);
  },
  signInWithGoogle() {
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
  // INIT /profile/videos/_id
  async initSingleVideoPage({ commit, dispatch }, videoId) {
    const userId = firebase.auth().currentUser.uid;
    await dispatch("loadVideoById", videoId)
      .then(() => {
        firebase
          .database()
          .ref("/users/" + userId)
          .once("value")
          .then(function(snapshot) {
            const data = snapshot.val();
            if (pathOr(false, ["learnedVideos", videoId], data))
              commit("setCurrentLearnedVideo", {
                [videoId]: data.learnedVideos[videoId]
              });
            if (pathOr(false, ["savedVideos", videoId], data))
              commit("setCurrentSavedVideo", {
                [videoId]: data.savedVideos[videoId]
              });
          })
          .catch(e => {
            console.log(e);
            this.$toast.error("Server Error");
          });
      })
      .catch(console.log);
  },
  cleanSingleVideoPage({ commit }) {
    commit("deleteCurrentVideoData");
  },
  saveVideo({ commit, dispatch, state }) {
    const userId = firebase.auth().currentUser.uid;
    const video = { [state.currentVideo.id]: state.currentVideo };
    dispatch("changeLoadingStatus", true);

    firebase
      .database()
      .ref("/users/" + userId + "/savedVideos")
      .update(video)
      .then(() => {
        this.$toast.success("Saved");
        commit("setCurrentSavedVideo", video);
      })
      .catch(e => {
        console.log(e);
        this.$toast.error("Didn't save. Server error");
      })
      .then(() => {
        dispatch("changeLoadingStatus", false);
      });
  },
  markLearned({ commit, state }) {
    const userId = firebase.auth().currentUser.uid;
    const video = { [state.currentVideo.id]: state.currentVideo };
    dispatch("changeLoadingStatus", true);
    firebase
      .database()
      .ref("/users/" + userId + "/learnedVideos")
      .update(video)
      .then(() => {
        this.$toast.success("Marked");
        commit("setCurrentLearnedVideo", video);
      })
      .catch(e => {
        console.log(e);
        this.$toast.error("Didn't save. Server error");
      })
      .then(() => {
        dispatch("changeLoadingStatus", false);
      });
  },
  findVideos({ commit, dispatch }, { query, amount, times = 4 }) {
    dispatch("changeLoadingStatus", true);
    youtube
      .searchVideos(query, amount)
      .then(data => {
        commit("setVideos", data);
        dispatch("changeLoadingStatus", false);
      })
      .catch(e => {
        if (times === 0) {
          this.$toast.error("Server Error!");
          dispatch("changeLoadingStatus", false);
        } else {
          setTimeout(() => {
            dispatch("findVideos", {
              query,
              amount,
              times: times - 1
            });
          }, 4000);
        }
        console.log(e);
      });
  },
  async loadVideoById({ commit, getters }, videoId) {
    if (getters.getVideosMap[videoId])
      commit("setCurrentVideo", getters.getVideosMap[videoId]);

    youtube
      .getVideoByID(videoId)
      .then(video => {
        commit("setCurrentVideo", video);
      })
      .catch(console.log);
  },
  addNote({ commit, dispatch, state }, note) {
    if (isEmpty(note)) {
      this.$toast.info("Please, write a note");
      return;
    }
    if (state.currentNotes.includes(note)) {
      this.$toast.info("Already added");
      return;
    }

    dispatch("changeLoadingStatus", true);
    const userId = firebase.auth().currentUser.uid;
    const noteData = { title: "note", date: new Date() };
    firebase
      .database()
      .ref("/users/" + userId + "/notes/" + state.currentVideo.id)
      .update(noteData)
      .then(() => {
        this.$toast.success("Note added");
        commit("addNote", note);
      })
      .catch(error => {
        console.log(error);
        this.$toast.error("Server Error");
      })
      .then(() => {
        dispatch("changeLoadingStatus", false);
      });
  },
  deleteNote({ commit }, noteIndex) {
    commit("deleteNote", noteIndex);
  },
  changeLoadingStatus({ commit }, status) {
    commit("setLoadingStatus", status);
  },
  changeWideModeStatus({ commit }, status) {
    commit("setWideModeStatus", status);
  }
};

export default actions;
