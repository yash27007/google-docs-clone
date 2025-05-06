"use client"
import Image from "next/image";
import Link from "next/link";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { DocumentInput } from "./documentInput";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger
} from "@/components/ui/menubar"

import {
    BoldIcon,
    FileIcon,
    FileJsonIcon,
    FilePenIcon,
    FilePlusIcon,
    FileTextIcon,
    GlobeIcon,
    ItalicIcon,
    Printer,
    Redo2Icon,
    RemoveFormattingIcon,
    StrikethroughIcon,
    TextIcon,
    Trash,
    UnderlineIcon,
    Undo2Icon
} from "lucide-react";

import { Avatars } from "./avatars";
import { Inbox } from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RemoveDialog } from "@/components/RemoveDialog";
import { RenameDialog } from "@/components/RenameDialog";
interface NavbarProps {
    data: Doc<"documents">
}
export const Navbar = ({ data }: NavbarProps) => {
    const router = useRouter();
    const { editor } = useEditorStore();

    const mutation = useMutation(api.documents.create);

    const onNewDocument = () => {
        mutation({
            title: "Untitled Document",
            initialContent: ""
        }).then((id) => {
            toast.success("Document Created");
            router.push(`/documents/${id}`)
        })
            .catch(() => toast.error("Something went wrong"));
    }

    const insertTable = ({ rows, cols }: { rows: number, cols: number }) => {
        editor
            ?.chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: false })
            .run()
    }

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    const onSaveJSON = () => {
        if (!editor) return

        const content = editor.getJSON();
        const blob = new Blob([JSON.stringify(content)], {
            type: "application/json",
        });

        onDownload(blob, `${data.title}.json`);

    }

    const onSaveHTML = () => {
        if (!editor) return

        const content = editor.getHTML();
        const blob = new Blob([content], {
            type: "text/html",
        });

        onDownload(blob, `${data.title}.html`);

    }

    const onSaveText = () => {
        if (!editor) return

        const content = editor.getText();
        const blob = new Blob([content], {
            type: "text/plain",
        });

        onDownload(blob, `${data.title}.txt`);

    }


    return (

        <nav className="flex items-center justify-between">
            <div className=" flex gap-2 items-center">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput title={data.title} id={data._id} />
                    <div className="flex flex-col">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            {/* File Menu */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="size-4 mr-2" />
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={onSaveJSON}>
                                                <FileJsonIcon className="size-4 mr-2" />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveHTML}>
                                                <GlobeIcon className="size-4 mr-2" />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className="size-4 mr-2" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveText}>
                                                <FileTextIcon className="size-4 mr-2" />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>

                                    <MenubarItem onClick={onNewDocument}>
                                        <FilePlusIcon className="size-4 mr-2" />
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <RenameDialog documentId={data._id} initialTitle={data.title}>
                                        <MenubarItem
                                            onClick={(e) => e.stopPropagation()}
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <FilePenIcon className="size-4 mr-2" />
                                            Rename
                                        </MenubarItem>
                                    </RenameDialog>
                                    <RemoveDialog documentId={data._id}>
                                        <MenubarItem
                                            onClick={(e) => e.stopPropagation()}
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Trash className="size-4 mr-2" />
                                            Remove
                                        </MenubarItem>
                                    </RemoveDialog>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => window.print()}>
                                        <Printer className="size-4 mr-2" />
                                        Print <MenubarShortcut>Ctrl + P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                            {/* Edit Menu */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon className="size-4 mr-2" />
                                        Undo <MenubarShortcut>Ctrl + Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <Redo2Icon className="size-4 mr-2" />
                                        Redo <MenubarShortcut>Ctrl + Y</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                            {/* Insert Menu */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            Table
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                                                1 x 1
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                                                2 x 2
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                                                3 x 3
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                                                4 x 4
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                            {/* Format Menu */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="size-4 mr-2" />
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className="size-4 mr-2" />
                                                Bold <MenubarShortcut>Ctrl + B</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className="size-4 mr-2" />
                                                Italic <MenubarShortcut>Ctrl + I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className="size-4 mr-2" />
                                                Underline <MenubarShortcut>Ctrl + U</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                                <StrikethroughIcon className="size-4 mr-2" />
                                                <span>Strikethrough &nbsp;&nbsp;</span> <MenubarShortcut>Ctrl + Shift + S</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon className="size-4 mr-2" />
                                        Clear Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 items-center pl-6">
                <Inbox />
                <Avatars />
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>

        </nav>
    );

}