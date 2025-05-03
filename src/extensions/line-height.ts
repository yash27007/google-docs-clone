
/**
 * ============================
 * TipTap Command Parameters:
 * ============================
 *
 * When you define a custom command in TipTap using the `addCommands()` API,
 * you return a function that receives a context object:
 * 
 *    ({ tr, state, dispatch }) => { ... }
 *
 * Here's what each of these parameters means:
 * 
 * 1. `state` (EditorState):
 *    - Represents the current state of the editor.
 *    - Contains:
 *        - `state.doc` → the document content (ProseMirror Node)
 *        - `state.selection` → the user's current text selection
 *        - Other metadata like schema, stored marks, plugins, etc.
 *    - Use this to read what's currently in the editor.
 * 
 * 2. `tr` (Transaction):
 *    - A Transaction is a record of changes you want to make to the document.
 *    - Transactions are immutable: each call returns a new transaction object.
 *    - You can:
 *        - Modify node attributes (e.g., set line-height)
 *        - Replace or insert text
 *        - Change selections
 *        - Add meta information or decorations
 *    - Transactions DO NOT apply changes by themselves—they must be dispatched.
 *
 * 3. `dispatch` (DispatchFunction):
 *    - A function that takes a transaction and applies it to the editor.
 *    - Without calling `dispatch(tr)`, the editor will not update.
 *    - Typically guarded by a check: `if (dispatch) dispatch(tr);`
 *    - This makes your command work in both dry-run and active modes (e.g., menu preview).
 *
 * ============================
 * Example Flow:
 * ============================
 * 1. Use `state.selection` to find what content is selected.
 * 2. Use `state.doc.nodesBetween(from, to, callback)` to iterate over nodes.
 * 3. Use `tr.setNodeMarkup(pos, null, newAttrs)` to prepare changes.
 * 4. Call `dispatch(tr)` to apply the transaction and update the editor.
 */



import { Extension } from "@tiptap/react";

// 1. Extend TipTap's Commands interface to add our custom commands (for TypeScript support)
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      // Command to set a custom line height
      setLineHeight: (lineHeight: string) => ReturnType;
      // Command to remove the line height (reset to default)
      unsetLineHeight: () => ReturnType;
    };
  }
}

// 2. Define the LineHeightExtension using TipTap's Extension API
export const LineHeightExtension = Extension.create({
  name: 'lineHeight', // Unique name for the extension

  // 3. Provide default options to customize behavior
  addOptions() {
    return {
      types: ["paragraph", "heading"], // Node types that support line-height (e.g., paragraph and heading)
      defaultLineHeight: "normal",     // Default line-height value when unsetting
    };
  },

  // 4. Add a global attribute (lineHeight) to the specified node types
  addGlobalAttributes() {
    return [
      {
        types: this.options.types, // Applies to node types defined in options
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight, // Set a fallback if not explicitly defined

            // Render line-height as inline CSS style when outputting HTML
            renderHTML: attributes => {
              if (!attributes.lineHeight || attributes.lineHeight === this.options.defaultLineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },

            // Parse the line-height back from HTML style when loading pasted/initial HTML
            parseHTML: element => {
              return element.style.lineHeight || this.options.defaultLineHeight;
            },
          },
        },
      },
    ];
  },

  // 5. Define custom commands to set and unset line-height
  addCommands() {
    return {
      // --- Command: Set Line Height ---
      setLineHeight: (lineHeight: string) => ({ tr, state, dispatch }) => {
        const { selection } = state;        // Get the current selection range
        const { from, to } = selection;     // Get start and end positions of selection

        // Traverse all nodes between the selection range
        state.doc.nodesBetween(from, to, (node, pos) => {
          // Apply only to specified types (paragraph, heading)
          if (this.options.types.includes(node.type.name)) {
            // Set the node’s lineHeight attribute
            tr = tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              lineHeight,
            });
          }
        });

        if (dispatch) dispatch(tr); // Apply the transaction if editor is ready
        return true; // Return true to indicate command ran successfully
      },

      // --- Command: Unset Line Height (reset to default) ---
      unsetLineHeight: () => ({ tr, state, dispatch }) => {
        const { selection } = state;        // Get current selection range
        tr = tr.setSelection(selection);    // Ensure transaction uses the latest selection
        const { from, to } = selection;

        // Traverse all nodes between the selection
        state.doc.nodesBetween(from, to, (node, pos) => {
          // Only reset lineHeight on allowed types
          if (this.options.types.includes(node.type.name)) {
            // Reset lineHeight to default value
            tr = tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              lineHeight: this.options.defaultLineHeight,
            });
          }
        });

        if (dispatch) dispatch(tr); // Apply the change to the editor
        return true; // Indicate the command was successful
      },
    };
  },
});
