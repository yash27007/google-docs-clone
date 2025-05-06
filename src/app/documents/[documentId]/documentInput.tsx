"use client"

import { BsCloudCheck, BsCloudSlash } from "react-icons/bs"
import { Id } from "../../../../convex/_generated/dataModel";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";
interface DocumentInputProp {
    title: string;
    id: Id<"documents">;
}
export const DocumentInput = ({ title, id }: DocumentInputProp) => {
    const [value, setValue] = useState(title);
    const [isPending, setIsPending] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const status = useStatus();

    const mutate = useMutation(api.documents.updateById);

    const debouncedUpdate = useDebounce((newValue:string)=>{
        if(newValue === title) return;
        setIsPending(true);
        mutate({id, title:newValue})
        .then(()=> {
            toast.success("Document is updated");
            setIsEditing(false);
        })
        .catch(()=>toast.error("Something went wrong"))
        .finally(()=> setIsPending(false));
    });

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsPending(true);
    mutate({id, title:value})
    .then(()=> {
        toast.success("Document is updated");
        setIsEditing(false);
    })
    .catch(()=>toast.error("Something went wrong"))
    .finally(()=> setIsPending(false));
    };

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setIsEditing(true);
        const newValue = e.target.value;
        setValue(newValue);
        debouncedUpdate(newValue);
    }

    const showLoader = isPending || status==="connecting" || status ==="reconnecting";
    const showError = status==="disconnected"

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="relative w-fit max-w[50ch]">
                    <span className="invisible whitespace-pre px-1.5 text-lg">
                        {value || " "}
                    </span>
                    <input
                    ref={inputRef}
                    value={value}
                    onBlur={()=> setIsEditing(false)}
                    onChange={onChange}
                className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"/>
                </form>
            ):(
            <span
            onClick={()=>{
                setIsEditing(true);
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 0);
            }}
             className=" text-lg px-1.5 cursor-pointer truncate">{title}</span>
            )}
            {showError && <BsCloudSlash className="size-4"/>}
            {!showError && !showLoader && <BsCloudCheck className="size-4"/>}
            {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground"/>}
        </div>
    )
}