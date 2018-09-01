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
  setSavedVideo(state, video) {
    state.savedVideos = { ...state.savedVideos, video };
  },
  setLearnedVideo(state, video) {
    state.learnedVideos[video.id] = video;
  },
  addNote(state, note) {
    if (isEmpty(note)) this.$toast.info("Please, write a note");
    else if (state.currentNotes.includes(note))
      this.$toast.info("Already added");
    else {
      state.currentNotes = [note, ...state.currentNotes];
      this.$toast.success("Added");
    }
  },
  deleteNote(state, note) {
    state.currentNotes = state.currentNotes.filter(
      currentNote => currentNote != note
    );
    this.$toast.success("Deleted");
  }
};

export default mutations;
