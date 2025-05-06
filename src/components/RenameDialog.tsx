"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import {toast} from "sonner"
import { Id } from "../../convex/_generated/dataModel"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

interface RenameDialogProps {
    documentId : Id<"documents">
    initialTitle:string;
    children: React.ReactNode;
}

export const RenameDialog = ({documentId, children, initialTitle}:RenameDialogProps) =>{
    const update = useMutation(api.documents.updateById)
    const [isUpdating, setIsUpdating] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [open, setIsOpen] = useState(false);

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setIsUpdating(true);
        update({id:documentId, title: title.trim() || "Untitled"})
        .then(()=>toast.success("Document updated"))
        .catch(()=>toast.error("Something went wrong"))
        .finally(()=>{
            setIsUpdating(false);
            setIsOpen(false);
        })
    }
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e)=> e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Rename Document
                        </DialogTitle>
                        <DialogDescription>
                            Enter a new name for this document
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder="Document Name"
                        onClick={(e)=>e.stopPropagation()}
                         />
                    </div>
                    <DialogFooter>
                        <Button
                        disabled={isUpdating}
                        variant="ghost"
                        onClick={(e)=>{
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                         >
                            Cancel
                        </Button>
                        <Button
                        type="submit"
                        disabled={isUpdating}
                        onClick={(e)=>{
                            e.stopPropagation();
                        }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}