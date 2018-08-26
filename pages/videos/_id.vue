<template>
    <div :class="classContainer" class="video">
        <div class="row">
            <div class="col s12 m12">
                <div class="row center valign-wrapper">
                    <h4 class="col s12 m7 center-align truncate">{{ currentVideo.title }}</h4>
                    <switcher v-model="isWideMode" class="col s12 m2 offset-m3" labelOn="Wide" labelOff="Normal" />
                </div>
            </div>
            <div id="player" class="col no-padding center s12 m7">
                 <player youtubeProgressive :videoId="videoId" />
            </div>
            <div id="editor" class="col no-padding center s12 m5">
                <code-editor :height="isWideMode ? 472 : 332 " />
            </div>
            <div class="col s12 m12">
                <div class="row">
                    <a 
                        @click="saveVideo()" 
                        class="col s12 m6 waves-effect waves-light teal darken-4 btn"
                        :class="savedButtonClass"
                    >
                        <i class="material-icons left">save</i>Save
                    </a>
                    <a 
                        @click="markAsLearned()" 
                        class="col s12 m6 waves-effect waves-light orange darken-4 btn"
                        :class="learnedButtonClass"
                    >
                        <i class="material-icons left">{{ learnedIcon }}</i>Mark Learned
                    </a>
                </div>
            </div>
        </div>
        <div class="row center" id="notes">
            <h3>Notes Will be here soon...</h3>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { pathOr } from "ramda";
import Player from "@/components/shared/Player";
import CodeEditor from "@/components/shared/CodeEditor";
import Switcher from "@/components/shared/Switcher";

export default {
  components: {
    Player,
    CodeEditor,
    Switcher
  },
  data() {
    return {
      videoId: "",
      isWideMode: false
    };
  },
  mounted() {
    this.videoId = this.$route.params.id;
    this.loadVideoById(this.videoId);
  },
  computed: {
    ...mapState(["currentVideo", "learnedVideos"]),
    getImage() {
      return pathOr("#", ["thumbnails", "high", "url"], this.currentVideo);
    },
    isLearned() {
      return this.learnedVideos[this.videoId];
    },
    learnedIcon() {
      return this.isLearned ? "done_all" : "done_outline";
    },
    learnedButtonClass() {
      return this.isLearned ? "disable-link" : "";
    },
    savedButtonClass() {
      return this.isLearned ? "disable-link" : "";
    },
    classContainer() {
      return this.isWideMode ? "container full-width" : "container";
    }
  },
  methods: {
    ...mapActions(["loadVideoById", "saveVideo", "markLearned"]),
    markAsLearned() {
      if (this.isLearned) return;

      this.markLearned();
    }
  }
};
</script>

<style lang="scss" scoped>
#player {
  margin-bottom: 24px;
}
.container {
  transition: all 1s;
}

.full-width {
  &.container {
    width: 100%;
    max-width: 100%;
  }
}
</style>