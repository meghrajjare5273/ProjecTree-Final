// import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:"Home|ProjecTree ",
    icons:"/favicon.ico"
}





export default function Layout({children}:Readonly<{ children: React.ReactNode}>) {
    return (
        <body>
            {children}
        </body>
    );
}
