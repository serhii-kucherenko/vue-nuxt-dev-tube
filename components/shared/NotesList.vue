<template>
    <div id="notes">
        <transition-group name="note" mode="in-out">
            <div class="note" v-for="note in notes" :key="note">
                <div v-html="note" class="note-text"></div>
                <a @click="deleteNote(note)"
                  class="add btn-floating btn-large waves-effect waves-light red darken-2"
                >
                  <i class="material-icons">remove</i>
                </a>
            </div>
        </transition-group>
        <transition name="zoom">
          <div v-if="noNotes" class="empty">
            <h4>No notes yet...</h4>
          </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { reverse, isEmpty } from "ramda";

export default {
  computed: {
    ...mapState({
      notes: state => state.currentNotes
    }),
    noNotes() {
      return isEmpty(this.notes);
    }
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

  & .empty {
    height: 100px;
  }
}
</style>