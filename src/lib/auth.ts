import NextAuth, { User } from "next-auth";
import prisma from "./prisma";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
//import { string } from "zod";
//import { compare } from "bcrypt";
//import { hash } from "crypto";

const adapter = PrismaAdapter(prisma);

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: adapter,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const {email, username, password } = credentials as {email: string, username: string, password: string};
//                const hashedPass = hash("SHA256", password)
                const res = await prisma.user.findFirst({
                    where: {
                        username: username,
                        email: email,
                        password: password,
                    }
                })
                if(res){
                    return {
                        ...res,
                        accounts: [],
                        sessions: [],
                        emaqilVerified: res.emailVerified ? res.emailVerified.toISOString() : null
                    } as unknown as User;
                }

                return null;
            },
        })
    ]  
})
