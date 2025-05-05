import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel"

import {
    Table,
    TableBody,
    TableRow,
    TableHeader,
    TableCell,
    TableHead,
} from "@/components/ui/table"
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./documentRow";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;

}

export const DocumentsTable = ({
    documents,
    loadMore,
    status

}: DocumentsTableProps

) => {

    return (
        <div className="max-w-screen mx-auto px-25 py-6 flex flex-col gap-5">
            {
                documents === undefined ? (
                    <div className="flex justify-center items-center h-24">
                        <LoaderIcon className="animate-spin text-muted-foreground size-5" />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="hover: bg-transparent border-none">
                                <TableHead>Name</TableHead>
                                <TableHead>&nbsp;</TableHead>
                                <TableHead className="hidden md:table-cell">Shared</TableHead>
                                <TableHead className="hidden md:table-cell">Created at</TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            documents.length === 0 ? (
                                <TableBody>
                                    <TableRow className="hover:bg-transparent">
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No documents found
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {documents.map((document) => (
                                        <DocumentRow key={document._id} document={document} />
                                    ))}
                                </TableBody>
                            )
                        }
                    </Table>
                )
            }
            <div className="flex items-center justify-center">
                <Button variant="ghost" size="sm" onClick={() => loadMore(5)} disabled={status !== "CanLoadMore"}>
                </Button>
                {status === "CanLoadMore" ? "Load More" : "End of results"}
            </div>
        </div>
    )
}