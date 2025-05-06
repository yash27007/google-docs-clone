// "use client"

// import { Button } from "@/components/ui/button";
// import { AlertTriangleIcon } from "lucide-react";
// import Link from "next/link";

// const ErrorPage = ({
//     error,
//     reset
// }:{
//     error: Error & {digest ?:string};
//     reset: () => void
// }) =>{
//     return(
//         <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
//             <div className="text-center space-y-4">
//                 <div className="flex justify-center">
//                     <div className="bg-rose-100 p-3 rounded-full">
//                         <AlertTriangleIcon className="size-10 text-rose-600"/>
//                     </div>
//                     <div className="space-y-2">
//                         <h2 className="text-xl font-semibold text-gray-900">Something went wrong....</h2>
//                         <p className="text-gray-500">
//                             {error.message}
//                         </p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-x-3">
//                     <Button
//                     onClick={reset}
//                     className="font-medium px-6"
//                     >
//                         Try Again
//                     </Button>
//                     <Button asChild
//                     variant="ghost"
//                     className="font-medium"
//                     >
//                         <Link href="/">
//                         Go Back
//                         </Link>
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )

// }

// export default ErrorPage;

"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-rose-100 p-3 rounded-full">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Something went wrong...
            </h2>
            <p className="text-gray-500">{error.message}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-3">
          <Button onClick={reset} className="font-medium px-6">
            Try Again
          </Button>
          <Button asChild variant="ghost" className="font-medium">
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
