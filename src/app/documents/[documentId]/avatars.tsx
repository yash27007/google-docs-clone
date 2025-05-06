import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import { Separator } from "@/components/ui/separator";

const AVATAR_SIZE = 36;

interface AvatarProps {
    src: string;
    name: string
}

export const Avatars = () =>{
    // We are doing this to prevent the room to be still in loading state while the avatars are being fetched. So now the room will be loaded and the avatars can be loaded later also... First the editor is displayed and regardless of the avatars are still loading, we can just start typing...
    return(
        <ClientSideSuspense fallback={null}>
            <AvatarStack/>
        </ClientSideSuspense>
    )
}

const AvatarStack = () => {
    const users = useOthers();
    const currentUser = useSelf();

    if (users.length === 0) return null;

    return (
        <>
            <div className="flex items-center">
                {
                    currentUser && (
                        <div className="relative ml-2">
                            <Avatar src={currentUser.info.avatar} name="You" />
                        </div>
                    )
                }

                <div className="flex">
                    {
                        users.map(({connectionId, info})=>{
                            return (
                                <Avatar key={connectionId} name={info.name} src={info.avatar}/>
                            )
                        })
                    }
                </div>

            </div>
            <Separator orientation="vertical" className="h-6"/>
        </>
    )

}

const Avatar = ({ src, name }: AvatarProps) => {
    return (
        <div
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
        >

            <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity rounded-sm">
                {name}
            </div>
            <img
                alt={name}
                src={src}
                className="size-full rounded-full"
            />

        </div>
    )
}
