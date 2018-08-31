<template>
    <div class="note red darken-3">
        <a class="add btn-floating btn-large waves-effect waves-light amber darken-4"><i class="material-icons">add</i></a>
        <textarea placeholder="Write note..." />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.note {
    color: white;
    position: relative;
    box-shadow: 0 5px 38px rgba(0,0,0,0.3), 2px 5px 12px rgba(0,0,0,0.3);
    padding: 20px;
    font-size: 14px;

    & a {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 20px;
    }

    & textarea {
        background: transparent;
        border: 0px;
        resize: none;
        width: 100%;
        outline: 0px !important;
        font-family: 'Roboto', sans-serif;
        letter-spacing: 1px;
        font-size: 18px;
        color: #fff;
        word-wrap: break-word;
        transition: 0.05s;
        height: 120px;

        &::-webkit-input-placeholder {
            color: #fff;
        }
    }
}
</style>