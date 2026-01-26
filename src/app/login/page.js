"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (e) => {
    e.preventDefault(); // 🔹 Prevent form auto-submit

    setCustomError(""); // Clear previous error

    try {
      const res = await signInWithEmailAndPassword(email, password);

      if (!res) {
        setCustomError("Invalid email or password");
        return;
      }

      console.log("Login success:", res);

      sessionStorage.setItem("user", "true");

      setEmail("");
      setPassword("");

      router.push("/");
    } catch (err) {
      console.error(err);
      setCustomError("Something went wrong. Try again.");
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center px-4">
      <Card className="py-10 w-full mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Login to your Admin account</CardTitle>
          <CardDescription>
            Enter your email below to login to your Admin account
          </CardDescription>
          <CardAction>
            <Link href="/sign-up">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="•••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {(customError || error) && (
              <p className="text-red-500 text-center mt-2 text-sm">
                {customError || error.message}
              </p>
            )}

            <CardFooter className="flex-col gap-2 mt-6 px-0">
              <Button
                onClick={handleSignIn}
                type="button" // 🔹 FIXED
                className="w-full"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
