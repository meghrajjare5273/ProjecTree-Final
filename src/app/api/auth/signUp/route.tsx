import  prisma  from "@/lib/prisma";
import { hash } from "crypto";
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"



export async function POST(request: NextRequest){
    
        const res = await request.json()
        console.log(res)

        const {firstName, lastName, username, email, password} = res;

        const exisitingUser = await prisma.user.findFirst({
            where:{
                OR: [{email: email} , {username: username}],
            },
        })
        console.log(exisitingUser)
        
        if(exisitingUser){
            return NextResponse.json(
                {error: "User Alrady Ecisit"},
                {status: 400}
            )
        }
        else{
            const hashedPass = hash("SHA256", password)
            const result = await prisma.user.create({
            data:{
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: hashedPass
            }
        })
        
        return NextResponse.json({result})
    }

   }

    
