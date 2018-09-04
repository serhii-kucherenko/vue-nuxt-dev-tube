<template>
    <div :class="overlayChanger('container full-width', 'container')" class="video">
        <div class="row">
            <div class="col s12 m12">
                <div class="row center valign-wrapper no-margin">
                    <h5 :class="overlayChanger('fade-out')" id="title" class="col s12 m7 center-align truncate">{{ currentVideo.title }}</h5>
                    <switcher 
                        :value="isWideMode"
                        @input="changeWideStatus" 
                        class="col s12 m2 offset-m3" 
                        labelOn="Wide" 
                        labelOff="Normal" 
                    />
                </div>
            </div>
            <div :class="overlayChanger('w-70')" id="player" class="col no-padding center s12 m7">
                 <player youtubeProgressive :videoId="videoId" />
            </div>
            <div :class="overlayChanger('w-30 grey lighten-2')" id="editor" class="col no-padding center s12 m5">
                <code-editor :height="overlayChanger(568, 333)" />
            </div>
            <div :class="overlayChanger('fade-out')" id="action-btns" class="col s12 m12">
                <div class="row">
                    <a  
                        @click="setSaveVideo" 
                        class="col s12 m6 waves-effect waves-light teal darken-4 btn"
                        :class="savedButtonClass"
                    >
                        <i class="material-icons left">save</i>Save
                    </a>
                    <a 
                        @click="markAsLearned" 
                        class="col s12 m6 waves-effect waves-light orange darken-4 btn"
                        :class="learnedButtonClass"
                    >
                        <i class="material-icons left">{{ learnedIcon }}</i>Learned
                    </a>
                </div>
            </div>
        </div>
        <div :class="overlayChanger('fade-out')" id="notes">
            <h5 class="text-center underline">Save your notes here</h5>
            <quill-editor class="center" @addNote="addNote($event)" />
            <hr>
            <notes-list />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { pathOr, isEmpty } from "ramda";
import Player from "@/components/shared/Player";
import CodeEditor from "@/components/shared/CodeEditor";
import Switcher from "@/components/shared/Switcher";
import QuillEditor from "@/components/shared/QuillEditor";
import NotesList from "@/components/shared/NotesList";
import Spinner from "@/components/shared/Spinner";

export default {
  components: {
    CodeEditor,
    QuillEditor,
    NotesList,
    Player,
    Switcher,
    Spinner
  },
  data() {
    return {
      videoId: ""
    };
  },
  mounted() {
    this.videoId = this.$route.params.id;
    this.initSingleVideoPage(this.videoId);
  },
  destroyed() {
    this.cleanSingleVideoPage();
  },
  computed: {
    ...mapState({
      currentVideo: state => state.currentVideo,
      currentSavedVideo: state => state.currentSavedVideo,
      currentLearnedVideo: state => state.currentLearnedVideo,
      isWideMode: state => state.settings.wideMode
    }),
    ...mapGetters(["isLearned"]),
    getImage() {
      return pathOr("#", ["thumbnails", "high", "url"], this.currentVideo);
    },
    learnedIcon() {
      return isEmpty(this.currentLearnedVideo) ? "done_outline" : "done_all";
    },
    learnedButtonClass() {
      return isEmpty(this.currentLearnedVideo) ? "" : "disable-link";
    },
    savedButtonClass() {
      return isEmpty(this.currentSavedVideo) ? "" : "disable-link";
    }
  },
  methods: {
    ...mapActions([
      "initSingleVideoPage",
      "saveVideo",
      "loadVideoById",
      "markLearned",
      "addNote",
      "cleanSingleVideoPage",
      "changeWideModeStatus"
    ]),
    setSaveVideo() {
      if (isEmpty(this.currentSavedVideo)) this.saveVideo();
    },
    markAsLearned() {
      if (isEmpty(this.currentLearnedVideo)) this.markLearned();
    },
    changeWideStatus(value) {
      this.changeWideModeStatus(value);
    },
    overlayChanger(onOverlay, withoutOverlay = "") {
      return this.isWideMode ? onOverlay : withoutOverlay;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/customClasses.css";

#player {
  margin-bottom: 24px;
}
.container,
#title,
#action-btns,
#notes {
  transition: all 0.8s;
}
#editor,
#player {
  transition: all 0.6s;
}

.full-width {
  &.container {
    width: 100%;
    max-width: 100%;
  }
}
</style>