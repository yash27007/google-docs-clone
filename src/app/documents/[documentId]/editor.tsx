'use client'

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
// import Image from '@tiptap/extension-image'
import ImageResize from "tiptap-extension-resize-image"
import Underline from "@tiptap/extension-underline"
import FontFamily from "@tiptap/extension-font-family"
import TextStyle from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import { useEditorStore } from "@/store/use-editor-store"
import TextAlign from "@tiptap/extension-text-align"
import { FontSizeExtension } from "@/extensions/font-size"
import { LineHeightExtension } from "@/extensions/line-height"
import { Ruler } from "./ruler"
import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";
import { Threads } from "./threads"
//Things which are not there in the starter kit needs to be installed. Check the docs to know which all are installed in the starter kit

import { useStorage } from "@liveblocks/react"
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins"

interface EditorProps{
    initialContent?:string|undefined
}
export const Editor = ({initialContent}:EditorProps) => {

    const leftMargin = useStorage((root)=> root.leftMargin)?? LEFT_MARGIN_DEFAULT;
    const rightMargin = useStorage((root)=> root.rightMargin)?? RIGHT_MARGIN_DEFAULT;

    const { setEditor } = useEditorStore();
    const liveblocks = useLiveblocksExtension({
        field: "content",
        initialContent,
        comments: true,
        mentions: true,
        ai: false,
        offlineSupport_experimental: true,
        enablePermanentUserData: true,
      });
    

    const editor = useEditor({
        immediatelyRender:false, // to resolve the SSR error
        // once the editor is created, we have access to the editor throught the app. We are doing this to implement the undo-redo functions
        onCreate({ editor }) {
            setEditor(editor);
        },

        // if I unmount my editor, clean my global state
        onDestroy() {
            setEditor(null);
        },

        // updating the global state of the editor if any of the following events occur.
        onUpdate({ editor }) {
            setEditor(editor)
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor)
        },

        onFocus({ editor }) {
            setEditor(editor)
        },

        onTransaction({ editor }) {
            setEditor(editor)
        },

        onBlur({ editor }) {
            setEditor(editor)
        },

        onContentError({ editor }) {
            setEditor(editor)
        },


        editorProps: {
            attributes: {
                style: `padding-left:${leftMargin}px; padding-right:${rightMargin}px`,
                class: "focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text border"
            },
        },
        extensions: [
            liveblocks,
            StarterKit.configure({
                history:false
            }),
            FontSizeExtension,
            LineHeightExtension,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            Underline,
            FontFamily,
            TextStyle,
            ImageResize,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Table,
            TableCell,
            TableHeader,
            TableRow,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                        // use default validation
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false
                        }

                        // disallowed protocols
                        const disallowedProtocols = ['ftp', 'file', 'mailto']
                        const protocol = parsedUrl.protocol.replace(':', '')

                        if (disallowedProtocols.includes(protocol)) {
                            return false
                        }

                        // only allow protocols specified in ctx.protocols
                        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                        if (!allowedProtocols.includes(protocol)) {
                            return false
                        }

                        // disallowed domains
                        const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                        const domain = parsedUrl.hostname

                        if (disallowedDomains.includes(domain)) {
                            return false
                        }

                        // all checks have passed
                        return true
                    } catch {
                        return false
                    }
                },
                shouldAutoLink: url => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                        // only auto-link if the domain is not in the disallowed list
                        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                        const domain = parsedUrl.hostname

                        return !disallowedDomains.includes(domain)
                    } catch {
                        return false
                    }
                },

            }),
        ]
    })
    return (
        <div className=" size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible pt-1">
            <Ruler/>
            <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
                <EditorContent editor={editor} />
                <Threads editor={editor} />
                <FloatingToolbar editor={editor} />
            </div>
        </div>
    )
}