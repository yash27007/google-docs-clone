"use client"

import { Navbar } from "./navbar"
import { TemplatesGallery } from "./templatesGallery"

import { usePaginatedQuery } from "convex/react"
import {api} from "../../../convex/_generated/api"
import { DocumentsTable } from "./documentsTable"
import { useSearchParam } from "@/hooks/use-search-params"

export default function Home(){
  const [search] = useSearchParam()
  const {results, status, loadMore} = usePaginatedQuery(api.documents.get, {search},{initialNumItems:5});

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar/>
      </div>
      <div className="mt-16">
        <TemplatesGallery/>
        <DocumentsTable
        documents={results}
        loadMore={loadMore}
        status={status}
        />
      </div>
    <footer className="flex w-full items-center justify-center mb-2">
      <p className="text-sm text-muted-foreground">Designed and Developed by <a className="hover:underline" href="https://github.com/yash27007" target="_blank">Yashwanth Aravind</a></p>
    </footer>
    </div> 
  )
}