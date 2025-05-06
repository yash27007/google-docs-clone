"use client";

import { useEffect } from "react";
import { Editor } from "./editor";
import { Toolbar } from "./toolbar";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const doc = usePreloadedQuery(preloadedDocument); 

  // Set the document title when the component mounts or when the document title change
  useEffect(() => {
    if (doc?.title) {
      document.title = doc.title; 
    }
  }, [doc?.title]);

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD]">
          <Navbar data={doc} />
          <Toolbar />
        </div>
        <div className="pt-[116px] print:pt-0">
          <Editor initialContent={doc.initialContent} />
        </div>
      </div>
    </Room>
  );
};
