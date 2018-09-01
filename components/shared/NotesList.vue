<template>
    <div id="notes">
        <transition-group name="size" mode="in-out">
            <div class="note" v-for="(note, index) in notes" :key="note">
                <div v-html="note" class="note-text"></div>
                <a @click="deleteNote(index)"
                  class="add btn-floating btn-large waves-effect waves-light red darken-2"
                >
                  <i class="material-icons">remove</i>
                </a>
            </div>
        </transition-group>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { reverse } from "ramda";

export default {
  computed: {
    ...mapState({
      notes: state => reverse(state.currentNotes)
    })
  },
  methods: {
    ...mapActions(["deleteNote"])
  }
};
</script>

<style lang="scss" scoped>
#notes {
  margin-top: 30px;

  & .note {
    background: navajowhite;
    margin-bottom: 20px;
    padding: 6px 22px;
    position: relative;
    border: 1px solid #ccc;

    & .ql-syntax {
      background: #23241f !important;
      color: #fff !important;
    }

    & a {
      position: absolute;
      top: 0;
      right: 0;
      margin: 12px;
      height: 40px;
      width: 40px;

      & i {
        line-height: 40px;
      }
    }
  }
}
</style>