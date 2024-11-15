
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";


export const metadata: Metadata = {
    title:"SignIn | ProjecTree ",
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