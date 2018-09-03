<template>
  <section id="quill-editor">
        <quill-editor :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
        <a :disabled="loading"  @click="addNote"
            class="add btn-floating btn-large waves-effect waves-light amber darken-4"
        >
            <i class="material-icons">add</i>
        </a>
  </section>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { mapState } from "vuex";

import { quillEditor } from "vue-quill-editor";
import hljs from "highlight.js";

hljs.configure({
  languages: ["javascript", "php"]
});

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["code-block"],
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        },
        placeholder: "Note anything...",
        theme: "snow"
      }
    };
  },
  computed: {
    ...mapState(["loading"])
  },
  methods: {
    onEditorChange(e) {
      this.content = e.html;
    },
    addNote() {
      this.$emit("addNote", this.content);
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/rainbow.min.css");

#quill-editor {
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  height: 240px;
  background: #fff;

  & a {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 12px;
  }

  & .quill-editor {
    height: 200px;
    border: none;
  }

  .quill-code {
    border: none;
    height: auto;
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
}
</style>