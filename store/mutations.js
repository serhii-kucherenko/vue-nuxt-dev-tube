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
    state.currentNotes.includes(note)
      ? this.$toast.info("Already added")
      : (state.currentNotes = [note, ...state.currentNotes]);
  },
  deleteNote(state, noteIndex) {
    state.currentNotes = state.currentNotes.filter(
      (note, index) => index != noteIndex
    );
  }
};

export default mutations;
