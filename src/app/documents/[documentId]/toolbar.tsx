"use client"
import { useState } from "react";
import {
    AlignCenter,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    ImageIcon,
    ItalicIcon,
    Link2Icon,
    ListCollapseIcon,
    ListIcon,
    ListOrderedIcon,
    ListTodoIcon,
    LucideIcon,
    MessageSquarePlusIcon,
    MinusIcon,
    PlusIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    SearchIcon,
    SpellCheckIcon,
    Strikethrough,
    Underline,
    Undo2Icon,
    UploadIcon
}
    from "lucide-react";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FontFamilyButton } from "./fontFamily";
import { HeadingLevelButton } from "./hedingLevel";
import { HightlightColorButton, TextColorButton } from "./textColor";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon
};

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [imageUrl, setImageUrl] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    };

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }
        input.click();
    };


    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    >
                        <ImageIcon className="size-4" />

                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-4 mr-2" />
                        Paste image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert image URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Insert image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleImageUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}


const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState(editor?.getAttributes("link").href || "");
    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    };

    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <Link2Icon className="size-4" />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex item-center gap-x-2">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const AlignButton = () => {

    const { editor } = useEditorStore();

    const alignments = [
        {
            label: "Algin Left",
            value: "left",
            icon: AlignLeftIcon
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon,
        },
        {
            label: "Algin Center",
            value: "center",
            icon: AlignCenter

        },
        {
            label: "Justify",
            value: "justify",
            icon: AlignJustifyIcon
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <AlignLeftIcon className="size-4" />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {alignments.map(({ label, value, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        className={
                            cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
                            )
                        }
                    >
                        {/* We have renamed icon to Icon so that the jsx can be rendered. It is dynamically assigned. I can give this any name like icon:Symbol and it will still work... Its basic object destructuring */}
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );

}


export const LineHeightButton = () => {

    const { editor } = useEditorStore();

    const lineHeights = [
        { label: "Default", value: "normal" },
        { label: "Single", value: "1" },
        { label: "1.15", value: "1.15" },
        { label: "1.5", value: "1.5" },
        { label: "Double", value: "2" }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <ListCollapseIcon className="size-4" />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lineHeights.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                        className={
                            cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
                            )
                        }
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );

}

export const ListButton = () => {

    const { editor } = useEditorStore();

    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onclick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onclick: () => editor?.chain().focus().toggleOrderedList().run(),
        },

    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm"
                >
                    <ListIcon className="size-4" />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lists.map(({ label, icon: Icon, onclick, isActive }) => (
                    <button
                        key={label}
                        onClick={onclick}
                        className={
                            cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                isActive() && "bg-neutral-200/80"
                            )
                        }
                    >
                        {/* We have renamed icon to Icon so that the jsx can be rendered. It is dynamically assigned. I can give this any name like icon:Symbol and it will still work... Its basic object destructuring */}
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );

}

const FontSizeButton = () => {
    const { editor } = useEditorStore();

    // If the text has a font size like 20px we just extract the 20 and render it or else it falls back to 16
    const currentFontSize = editor?.getAttributes("textStyle").fontSize
        ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
        : "16"

    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue);
        // if the user moves away from the input, we assume that he updated the font size
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue)
            editor?.commands.focus(); // we focus back on the editor
        }
    }

    const increment = () => {

        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    }

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        updateFontSize(newSize.toString());
    }


    return (
        <div className="flex items-center gap-x-0.5">
            <button
                onClick={decrement}
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                <MinusIcon className="size-4" />
            </button>
            {isEditing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="h-7 w-10 border border-neutral-400 text-sm text-center rounded-sm bg-transparent focus:outline-none focus:ring-0" />
            ) : (
                <button
                    onClick={() => {
                        setFontSize(currentFontSize);
                        setIsEditing(true);
                    }}
                    className="h-7 w-10 border border-neutral-400 text-sm text-center rounded-sm hover:bg-neutral-200/80"
                >
                    {currentFontSize}
                </button>
            )}

            <button
                onClick={increment}
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                <PlusIcon className="size-4" />
            </button>

        </div>);
}

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />
        </button>
    )

}




export const Toolbar = () => {

    const { editor } = useEditorStore();

    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run()
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),

                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }
                }
            ],

            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run()
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run()
                },

                {
                    label: "Underline",
                    icon: Underline,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run()
                },
                {
                    label: "Strikethrough",
                    icon: Strikethrough,
                    isActive: editor?.isActive("strike"),
                    onClick: () => editor?.chain().focus().toggleStrike().run()
                }
            ],

            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                    isActive: editor?.isActive("liveblocksCommentMark")
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList")
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run()
                }
            ]
        ]


    return (
        <div className="bg-[#F1F4F9] px-2.5 py-1 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}

            <Separator orientation="vertical" className="h-10 bg-neutral-300" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-10 bg-neutral-300" />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-10 bg-neutral-300" />
            <FontSizeButton />
            <Separator orientation="vertical" className="h-10 bg-neutral-300" />
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <TextColorButton />
            <HightlightColorButton />
            <Separator orientation="vertical" className="h-10 bg-neutral-300" />
            <LinkButton />
            <ImageButton />
            <AlignButton />
            <LineHeightButton/>
            <ListButton />
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}

        </div>
    )
}