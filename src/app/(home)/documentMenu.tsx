import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react"
import { Id } from "../../../convex/_generated/dataModel";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { RemoveDialog } from "@/components/RemoveDialog";
import { RenameDialog } from "@/components/RenameDialog";

interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: string) => void;
}
export const DocumentMenu = ({
    documentId,
    title,
    onNewTab
}: DocumentMenuProps
) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RemoveDialog documentId={documentId}>
                    <DropdownMenuItem
                    onSelect={(e)=>e.preventDefault()}
                    onClick={(e)=>e.stopPropagation()}
                    >
                        <TrashIcon className="size-4 mr-2" />
                        Remove
                    </DropdownMenuItem>
                </RemoveDialog>
                 
                <RenameDialog documentId={documentId} initialTitle={title}>
                    <DropdownMenuItem
                    onSelect={(e)=>e.preventDefault()}
                    onClick={(e)=>e.stopPropagation()}
                    >
                        <FilePenIcon className="size-4 mr-2" />
                        Rename
                    </DropdownMenuItem>
                </RenameDialog>

                <DropdownMenuItem
                    onClick={() => onNewTab(documentId)}>
                    <ExternalLinkIcon className="size-4 mr-2" />
                    Open in a new tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}