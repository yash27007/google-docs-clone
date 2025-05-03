// Importing the base Extension class from TipTap
import { Extension } from "@tiptap/react";

// Importing the built-in TextStyle extension, which allows us to modify text styles like font size
import "@tiptap/extension-text-style";

// Extending the Commands interface in @tiptap/core to add custom font size commands
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      // Command to set font size
      setFontSize: (size: string) => ReturnType;
      // Command to unset font size (remove it)
      unsetFontSize: () => ReturnType;
    };
  }
}

// Creating a custom TipTap extension named `FontSizeExtension`
export const FontSizeExtension = Extension.create({
  name: "fontSize", // Defining the name of the extension

  // Function to specify options for the extension
  addOptions() {
    return {
      types: ["textStyle"], // Declares that this extension applies styles to text
    };
  },

  // Function to define global attributes that can be used in the editor
  addGlobalAttributes() {
    return [
      {
        // Defines which elements this extension can modify
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null, // No font size is set by default

            // Extracts font-size from an HTML element when loaded into the editor
            parseHTML: (element) => element.style.fontSize,

            // Defines how the font size should be rendered in the HTML output
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {}; // If no font size is set, return an empty object
              }
              return {
                style: `font-size: ${attributes.fontSize}`, // Apply the font size as a CSS style
              };
            },
          },
        },
      },
    ];
  },

  // Function to define custom commands (actions) for this extension
  addCommands() {
    return {
      // Command to set the font size
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize }) // Apply font size to text using the TextStyle extension
            .run();
        },

      // Command to unset (remove) font size
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null }) // Reset font size to null
            .removeEmptyTextStyle() // Remove unnecessary text styles if no other style is applied
            .run();
        },
    };
  },
});
