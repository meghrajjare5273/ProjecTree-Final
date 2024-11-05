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

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First Name Should Have Atleast 2 Characters.")
      .max(50, "First Name cannot exceed 50 characters.")
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
        "First Name Should Contain Only Alphabets."
      ),
    lastName: z
      .string()
      .min(2, "Last Name Should Have Atleast 2 Characters.")
      .max(50, "Last Name cannot exceed 50 characters.")
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
        "Last Should Contain Only Alphabets."
      ),
    email: z.string().email("Please Enter a Valid Email Address."),
    password: z.string().min(6, "Password Should Have atleast 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Password Should Have atleast 6 characters."),
    username: z
      .string()
      .min(3, "Username Should Have atleast 3 characters.")
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
        "Username Should Contain Only Alphabets. "
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match.",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setisSubmitting(true)
    console.log(values);

    try{
      const response = await fetch("api/auth/signUp" ,{
      method: "POST",
      headers: {
        "Content-Type" : "applicaation/json"
      },
      body: JSON.stringify(values)

    })

    if(response.status === 400){
      setError("User Already Exists");
      setisSubmitting(false);
      setTimeout(() => {
        setError(null);
      }, 100000)
    }else if(response.status === 200){
      router.push("/SignIn");
    }
  } catch(error){
    console.log(error)
  }
}

  return (
    <><div className="min-h-screen bg-gradient-to-br from-black-100 to-grey-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="bg-gradient-to-br from-stone-900 to-slate-400 text-white p-8 md:w-1/3 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold mb-4">Welcome Back!</h3>
            <p className="mb-6">Login to keep connected with us.</p>
            <Link href="/SignIn">
              <Button className="bg-transparent hover:bg-white hover:text-stone-700 transition-colors border-2 border-white rounded-full px-8 py-2 text-sm font-semibold">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="p-8 md:w-2/3">
            <h3 className="text-center text-2xl font-bold text-gray-800 mb-4">
              Register Here
            </h3>
            <h2 className="text-center text-2xl font-bold ring-destructive">{error}</h2>
            <div className="flex justify-center space-x-4 mb-6">
              <Button variant="outline" className="w-12 h-12 rounded-full">
                <FaGoogle className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="outline" className="w-12 h-12 rounded-full">
                <FaGithub className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
            <p className="text-center text-gray-600 mb-6">Or Register Now</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} className="rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} className="rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm Password" {...field} className="rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105" disabled={isSubmitting}>
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
