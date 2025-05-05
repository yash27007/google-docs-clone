import Link from "next/link";
import Image from "next/image";
import { UserButton} from "@clerk/nextjs"
import { SearchInput } from "./searchInput";
export const Navbar = () =>{
    return (
        <nav className="flex items-center justify-between h-full w-full">
            <div className="flex gap-3 items-center shrink-0 pr-6">
                <Link href="/">
                <Image src="/logo.svg" alt="Logo" width={40} height={40}/>
                </Link>
                <h3 className="text-xl font-medium">Pages</h3>
            </div>
            <SearchInput/>
            <UserButton/>
        </nav>
    )
}