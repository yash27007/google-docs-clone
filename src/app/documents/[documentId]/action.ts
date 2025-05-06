// This is a server action file

"use server"

import {auth, clerkClient} from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export async function getDocuments(ids:Id<"documents">[]){
    return await convex.query(api.documents.getByIds, {ids})
}

export async function getUsers() {
    const { sessionClaims } = await auth();
    const clerk = await clerkClient();
  
    const orgId = (sessionClaims?.o as { id: string; rol: string; slg: string })?.id;
  
    let users;
  
    if (orgId) {
      // Fetch users in the same organization
      const response = await clerk.users.getUserList({
        organizationId: [orgId],
      });
  
      users = response.data;
    } else {
      // Fetch only the current user (not part of an org)
      const userId = sessionClaims?.sub as string;
      if (!userId) throw new Error("User not authenticated");
  
      const user = await clerk.users.getUser(userId);
      users = [user];
    }
  
    return users.map((user) => ({
      id: user.id,
      name:
        user.fullName ??
        user.primaryEmailAddress?.emailAddress ??
        "Anonymous",
      avatar: user.imageUrl,
    }));
  }
  