
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
    title:"SignUp | ProjecTree ",
    icons:"/favicon.ico"
}





export default function Layout({children}:Readonly<{ children: React.ReactNode}>) {
    return (
        <>
            <NextTopLoader color="black" showSpinner={false} />
            {children}
            <Toaster />
        </>
    );
}