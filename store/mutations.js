import { isEmpty } from "ramda";

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setLoadingStatus(state, status) {
    state.loading = status;
  },
  setVideos(state, videos) {
    state.videos = videos;
  },
  setCurrentVideo(state, video) {
    state.currentVideo = video;
  },
  setCurrentSavedVideo(state, video) {
    state.currentSavedVideo = video;
  },
  setCurrentLearnedVideo(state, video) {
    state.currentLearnedVideo = video;
  },
  setSavedVideo(state, video) {
    state.savedVideos = { ...state.savedVideos, video };
  },
  setLearnedVideo(state, video) {
    state.learnedVideos[video.id] = video;
  },
  addNote(state, note) {
    state.currentNotes = [note, ...state.currentNotes];
  },
  deleteNote(state, note) {
    state.currentNotes = state.currentNotes.filter(
      currentNote => currentNote != note
    );
    this.$toast.success("Deleted");
  },
  deleteCurrentVideoData(state) {
    state.currentVideo = {};
    state.currentLearnedVideo = {};
    state.currentSavedVideo = {};
    state.currentNotes = [];
  }
};

export default mutations;
