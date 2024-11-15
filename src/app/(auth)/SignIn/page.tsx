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

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password should have at least 6 characters."),
});

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsSubmitting(true);
    const { email, password } = values;
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        form.reset();
        router.push("/");
        toast({
          title: "Success",
          description: "You have successfully signed in.",
        });
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="bg-gradient-to-br from-stone-900 to-slate-400 text-white p-8 md:w-1/3 flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
            <p className="mb-6">Login to keep connected with us.</p>
            <Link href="/SignUp" passHref>
              <Button
                variant="outline"
                className="hover:bg-white hover:text-stone-700 transition-colors border-2 border-white rounded-full px-8 py-2 text-sm font-semibold"
              >
                Sign Up
              </Button>
            </Link>
          </div>
          <div className="p-8 md:w-2/3">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
              Login Here
            </h1>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center space-x-4 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-12 h-12 rounded-full"
                onClick={async () => {
                  await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/",
                  });
                }}
              >
                <FaGoogle className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Sign in with Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  /* Implement GitHub sign-in */
                }}
              >
                <FaGithub className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Sign in with GitHub</span>
              </Button>
            </div>
            <p className="text-center text-gray-600 mb-6">
              Or use your email to sign in
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                          className="rounded-md"
                        />
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
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-zinc-900 to-zinc-500 hover:from-zinc-800 hover:to-zinc-400 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
