import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }


    // Get the organization id from the user
    const organizationId = (user.organization_id ?? undefined) as string | undefined;

    // Searching a document in an organizaition


    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (query) =>
          query.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    // Searching a document
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (query) =>
          query.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

    // Fetching the documents in an organization
    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organizationId", (query) =>
          query.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }
    // Fetching the personal documents
    return await ctx.db
      .query("documents")
      .withIndex("by_ownerId", (query) => query.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }


    const organizationId = (user.organization_id ?? undefined) as string | undefined

    if (organizationId){
        console.log("Here inside organization id if statement")
        return await ctx.db.insert("documents",{
            title: args.title ?? "Untitled Document",
            ownerId: user.subject,
            initialContent: args.initialContent,
            organizationId: organizationId
        })
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});

// nullish coalescing operator (??) to set a default value if args.title is null or undefined.

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as string | undefined

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not Found");
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId);

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Access Denied");
    }

    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    
    const organizationId = (user.organization_id ?? undefined) as string | undefined

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not Found");
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId);

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Access Denied. Contact the owner");
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});


export const getById = query({
  args:{id: v.id("documents")},
  handler: async(ctx, {id})=>{
    const document =  await ctx.db.get(id);
    if(!document){
      throw new ConvexError("Document is not found");
    }
    return document;
  }
})

export const getByIds = query({
  args:{ids: v.array(v.id("documents"))},
  handler: async(ctx, {ids})=>{
    const documents = [];
    for (const id of ids){
      const document = await ctx.db.get(id);
      if(document){
        documents.push({
          id:document._id,
          name: document.title
        })
      }else{
        documents.push({id, name: "[Removed]"})
      }
    }
    return documents;
  },
})