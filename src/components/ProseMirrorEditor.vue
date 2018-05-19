<template>
  <div></div>
</template>
<script>
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

import {mySchema} from "./mySchema"

export default {
  name: 'ProseMirrorEditor',
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      editorState: null,
      editorView: null,
      editMode: true
    }
  },
  computed: {
    state() {
      return this.item.pmState;
    }
  },
  methods: {
  },
  mounted() {
    this.editorState = EditorState.fromJSON({
      schema : mySchema,
      plugins: [
        history(),
        keymap({"Mod-z": undo, "Mod-y": redo}),
        keymap(baseKeymap)
      ]
    }, this.state )

    this.editorView = new EditorView(this.$el, {
      state: this.editorState,
      dispatchTransaction: transaction => {
        console.log("Document size went from", transaction.before.content.size,
          "to", transaction.doc.content.size)
        let newState = this.editorView.state.apply(transaction)
        this.editorView.updateState(newState)
      },
      editable: state => {
        console.log(state)
        return this.editMode;
      }
    })

    this.$once('hook:beforeDestroy', () => this.editorView.destroy());
  }
}
</script>
