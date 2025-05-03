import Link from "next/link"
export default function Home(){
  return (
    <div className="flex min-h-screen items-center justify-center">
      Click <Link href="documents/123"><span className="text-blue-500 underline">&nbsp;here&nbsp;</span> to go to the document id 123</Link>
    </div>
  )
}