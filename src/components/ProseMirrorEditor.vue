<template>
  <div></div>
</template>
<script>
import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

export default {
  name: 'ProseMirrorEditor',
  data() {
    return {
      state: {
        "doc": {
          "type": "doc",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "omg abc 123"
                }
              ]
            }
          ]
        },
        "selection": {
          "type": "text",
          "anchor": 5,
          "head": 5
        }
      }
    }
  },
  mounted() {
    let state = EditorState.fromJSON({
      schema,
      plugins: [
        history(),
        keymap({"Mod-z": undo, "Mod-y": redo}),
        keymap(baseKeymap)
      ]
    }, this.state )
    let view = new EditorView(this.$root.$el, {
      state,
      dispatchTransaction(transaction) {
        console.log("Document size went from", transaction.before.content.size,
          "to", transaction.doc.content.size)
        let newState = view.state.apply(transaction)
        view.updateState(newState)
      }
    })
    view.focus()

    this.$once('hook:beforeDestroy', () => view.destroy());
  }
}
</script>
