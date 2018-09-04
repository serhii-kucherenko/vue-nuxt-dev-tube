import { pickBy } from "ramda";

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setLoadingStatus(state, status) {
    state.loading = status;
  },
  setWideModeStatus(state, status) {
    state.settings.wideMode = status;
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
  setCurrentNotes(state, notes) {
    state.currentNotes = notes;
  },
  addNote(state, note) {
    state.currentNotes = {
      [note.id]: note,
      ...state.currentNotes
    };
  },
  deleteNote(state, noteId) {
    const isNoteId = (val, key) => key !== noteId;
    state.currentNotes = pickBy(isNoteId, state.currentNotes);
  },
  deleteCurrentVideoData(state) {
    state.currentVideo = {};
    state.currentLearnedVideo = {};
    state.currentSavedVideo = {};
    state.currentNotes = {};
  }
};

export default mutations;
