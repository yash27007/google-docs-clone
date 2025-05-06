/**
 * Let me explain why the authEndpoint is written as an async function rather than just a string URL:

Authentication Context: The authEndpoint needs to provide authentication credentials for Liveblocks, and it needs to be specific to the current room/document.

Dynamic Room Information: Notice how the code includes params.documentId - this means each room needs its own authentication context. The function allows sending the room ID to the server:

Security: Instead of exposing authentication directly in the frontend, this approach:
Makes a POST request to your own backend endpoint
Allows your server to validate the request
Can include additional security measures
Keeps sensitive authentication logic on the server
If it was just:

You wouldn't be able to:

Send the room information
Get a proper authentication token for the specific room
Handle the authentication flow securely
This pattern is common in real-time collaboration tools where you need room-specific authentication tokens while keeping the authentication logic secure on the server side.


 */

"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

import { FullScreenLoader } from "@/components/FullScreenLoader";
import { getDocuments, getUsers } from "./action";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <LiveblocksProvider
      throttle={16}
      // Explaination for this code is written above
      authEndpoint={async ()=>{
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endpoint,{
          method:"POST",
          body: JSON.stringify({room})
        });

        return await response.json();
      }}
      resolveUsers={async ({ userIds }) => {
        return userIds.map((userId) => {
          const user = users.find((u) => u.id === userId);
          if (user) {
            const nameToNumber = user.name
              .split("")
              .reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const hue = Math.abs(nameToNumber) % 360;
            const color = `hsl(${hue}, 80%, 60%)`;
      
            return {
              name: user.name,
              avatar: user.avatar,
              color,
            };
          }
      
          return undefined;
        });
      }}
      resolveMentionSuggestions={async ({ text }) => {
        // Filter users based on the input text
        const filteredUsers = text
          ? users.filter((user) =>
              user.name.toLowerCase().includes(text.toLowerCase())
            )
          : users;

        // Return an array of matching user IDs
        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({roomIds}) =>{
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document)=>(
          {
            id: document.id,
            name: document.name
          }
        ))
      }}
    >
      <RoomProvider id={params.documentId as string} initialStorage={{leftMargin:LEFT_MARGIN_DEFAULT, rightMargin:RIGHT_MARGIN_DEFAULT}}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room Loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
