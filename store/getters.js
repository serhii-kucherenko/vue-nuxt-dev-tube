import { pathOr } from "ramda";
import defaultAvatar from "~/assets/images/defaultUserAvatar.png";

const getters = {
  getUserName: state => {
    return pathOr("", ["displayName"], state.user);
  },
  getUserAvatar: state => {
    return pathOr(defaultAvatar, ["photoURL"], state.user);
  },
  getVideosMap: state => {
    return state.videos.reduce((acc, video) => {
      acc[video.id] = video;
      return acc;
    }, {});
  },
  isLearned: (state, getters) => videoId => {
    console.log("stre", getters.learnedVideos);
    return pathOr(false, [this.videoId], getters.learnedVideos);
  }
};

export default getters;
