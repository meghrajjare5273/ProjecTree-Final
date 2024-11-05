import prisma from "@/lib/prisma";
import { hash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const res = await request.json();
    console.log(res)

    const {username, password, email} = res;

    const hashedPass = hash("SHA256", password);
   
    
    const isUser = await prisma.user.findFirst({
        where:{
            AND: [{email: email}, {username: username}],
        },
    })

    if(isUser && hashedPass === isUser.password){
        console.log("Login Successful")
        prisma.session.create(res);
        return NextResponse.json(
            {status: 200},
            {statusText: "Login Successful"}
        );
    }else if(isUser && hashedPass != isUser.password){
        console.log("Wrong Password Entered")
        return NextResponse.json(
            {error: "Wrong Password For This account"},
            {status: 401}
        );
    }else if(isUser === null){
        console.log("User Does Not Exist.")
        return NextResponse.json(
            {error: "User Does Not Exist."},
            {status: 404}
        )
    }

    


}