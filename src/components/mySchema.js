import {Schema} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from 'prosemirror-schema-list';

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const divNode = {
  content: 'inline*',
  group: 'block',
  parseDOM: [ { tag: 'div' } ],
  toDOM() { return [ 'div', 0 ]; }
};

const breakNode = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [
    {
      tag: 'br',
      getAttrs( brElm ) {
        // NOTE: if it is from RTE span with only <br/> then dont render at all
        if ( brElm.parentElement.tagName === 'SPAN' && brElm.parentElement.children.length === 1 ) {
          return false;
        }
        return null;
      }
    }
  ],
  toDOM() { return [ 'br' ]; }
};

const nodes = schema.spec.nodes
  .remove( 'image' )
  .update( 'paragraph', divNode, 'div' )
  .update( 'hard_break', breakNode );

export const mySchema = new Schema({
  nodes: addListNodes( nodes, 'div block*', 'block' ),
  marks: {
    em : schema.spec.marks.get( 'em' ),
    strong : schema.spec.marks.get( 'strong' ),
    color : {
      attrs : {
        style : ''
      },
      toDOM( node ) { return [ 'span', { style : node.attrs.style }, 0 ]; },
      parseDOM : [
        {
          style : 'color',
          getAttrs( value ) {
            if ( value ) {
              return { style : `color:${ value };` };
            }

            return false;
          }
        }
      ]
    },
    underline : {
      toDOM() { return [ 'span', { style : 'text-decoration: underline' }, 0 ]; },
      parseDOM : [
        { tag : 'u' },
        { style : 'text-decoration=underline' }
      ]
    }
  }
});
