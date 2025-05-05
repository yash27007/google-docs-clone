import { LoaderIcon } from "lucide-react";

interface FullScreenLoaderProps {
    label?: string;
};

export const FullScreenLoader = ({label}:FullScreenLoaderProps) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-2">
            <LoaderIcon className="size-6 text-muted-foreground animate-spin"/>
            {
                label && (
                    <p className="text-sm text-muted-foreground">{label}</p>
                )
            }
        </div>
    )
}