"use client";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
//import { SIGNIN } from "./signin";
//import GoogleButton from "@/components/GoogleButton";
//import { signIn } from "@/lib/auth";
//import noAuth from "@/components/NoAuth";


const signInSchema = z
  .object({
    
    email: z.string().email("Please Enter a Valid Email Address."),
    password: z.string().min(6, "Password Should Have atleast 6 characters."),
    
    username: z
      .string()
      .min(3, "Username Should Have atleast 3 characters.")
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
        "Username Should Contain Only Alphabets. "
      ),
  })
  
// async function redirectCredentials(){
//   const response = await noAuth();
//   return response;
// }

export default function SigninPage() {
  //  const noAuth = async() =>{
  //   const result = await signIn("noauth")
  //   if(result?.error){
  //     console.log(error)
  //   }else{
  //     router.push('/')
  //   }
  //  }
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setisSubmitting(true)
    console.log(values);

  //   try{
  //     const response = await fetch("api/auth/signIn" ,{
  //     method: "POST",
  //     headers: {
  //       "Content-Type" : "application/json"
  //     },
  //     body: JSON.stringify(values)

  //   })

  //   if(response.status === 404) {
  //     setError("User Account Does Not Exist.");
  //     setisSubmitting(false);
  //     setTimeout(() => {
  //       setError(null);
  //     }, 100000)
  //   }

  //   else if(response.status === 401) {
  //     setError("Wrong Password, Try Again");
  //     setisSubmitting(false);
  //     setTimeout(() => {
  //       setError(null);
  //     }, 100000)
  //   }  
    
  //   else if(response.status === 200){
  //     router.push("/");
  //   }
  // } catch(error){
  //   console.log(error)
  // }


  const { email, password } = values
  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL: "/"
  }, {
    onRequest: () => {
      toast({
        title: "please Wait"
      })
    },
    onSuccess: () => {
      form.reset()
      router.push("/")

    },
    onError: (ctx) => {
      setError(ctx.error.message);
      setisSubmitting(false)
    }
  })
  console.log(data)
  console.log(error)
 
  }
  


  return (
    <><div className="min-h-screen bg-gradient-to-br from-black-100 to-grey-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="bg-gradient-to-br from-stone-900 to-slate-400 text-white p-8 md:w-1/3 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold mb-4">Welcome Back!</h3>
            <p className="mb-6">Login to keep connected with us.</p>
            <Link href="/SignUp">
              <Button className="bg-transparent hover:bg-white hover:text-stone-700 transition-colors border-2 border-white rounded-full px-8 py-2 text-sm font-semibold">
                Sign Up
              </Button>
            </Link>
          </div>
          <div className="p-8 md:w-2/3">
            <h3 className="text-center text-2xl font-bold text-gray-800 mb-4">
              Login Here
            </h3>
            
            <Alert className="hidden">
              <AlertDescription className="text-red-600 text-center">{error}</AlertDescription>
            </Alert>
            <div className="flex justify-center space-x-4 mb-6">
              <form action={async() =>{
                //await GoogleButton();
              }}>
               <Button
                 type="submit"
                 variant="outline"
                 className="w-12 h-12 rounded-full"
               >
                 <FaGoogle className="h-5 w-5 text-gray-600" />
               </Button>
              </form>
              <Button variant="outline" className="w-12 h-12 rounded-full">
                <FaGithub className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
            <p className="text-center text-gray-600 mb-6">Or Register Now</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} className="rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} className="rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Enter Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter Password" {...field} className="rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" className="w-full bg-gradient-to-r from-zinc-900 to-zinc-500 hover:from-current hover:to-transparent hover:text-zinc-400 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
