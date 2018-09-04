const state = {
  settings: {
    wideMode: false
  },
  user: null,
  loading: false,
  videos: [],
  currentVideo: {
    title: "",
    description: ""
  },
  currentLearnedVideo: {},
  currentSavedVideo: {},
  currentNotes: {},
  savedVideos: {},
  learnedVideos: {}
};

export default state;
