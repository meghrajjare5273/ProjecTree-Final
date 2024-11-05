
import { Metadata } from "next";

export const metadata: Metadata = {
    title:"SignIn | ProjecTree ",
    icons:"/favicon.ico"
}





export default function Layout({children}:Readonly<{ children: React.ReactNode}>) {
    return (

        <main>
            <div className="flex-col items-center justify-evenly">
            {children}
            </div>
        </main>
    );
}