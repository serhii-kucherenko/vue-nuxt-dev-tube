<template>
    <div class="executor-editor" ref="editor" data-height="332" data-font-size="12">
    </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 332
    }
  },
  mounted() {
    class Cake {
      constructor() {
        this.type = "Cheesecake";
      }
    }
    ExecutorEditor.setup();
    this.initStyles();
  },
  watch: {
    height() {
      this.stylishEditor();
    }
  },
  methods: {
    initStyles() {
      this.stylishEditor();
      $(".executor").css({ transition: "all 1s", width: "100%" });
      $(".executor-main").css("height", "100%");
      $(".executor-toolbar").hide();
      $(".executor-version-label").hide();
    },
    stylishEditor() {
      $(".executor").css("height", `${this.height}px`);
      $(".executor-editor").css("height", `${this.height / 1.5}px`);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>