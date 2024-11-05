"use server";

import { signIn } from "@/lib/auth"

const noAuth = async () => {
    const NoAuthSign = await signIn("credentials",{
        redirectTo: "/"
    });

    return NoAuthSign;
};

export default noAuth;