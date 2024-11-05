"use server"

import { signIn } from "@/lib/auth";
//mport Google from "next-auth/providers/google";

const GoogleButton = async () => {
const googleSign = await signIn("google", {
  redirectTo: "/"
});
  return googleSign;
  
};

export default GoogleButton;
