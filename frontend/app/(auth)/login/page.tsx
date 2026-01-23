"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { School } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid credentials");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    {/* <div className="bg-slate-900 p-2 rounded-lg text-white shadow-lg shadow-slate-200">
                        <School size={24} />
                    </div>
                    <CardTitle>
                        <span className="font-bold text-xl tracking-tight text-slate-800 block leading-none">EduManager</span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1 block">Management System</span>
                    </CardTitle> */}
                    <CardTitle className="text-2xl items-center text-center flex gap-3">
                        <div className="bg-slate-900 p-2 rounded-lg text-white shadow-lg shadow-slate-200">
                            <School size={24} />
                        </div>
                        <div>
                            <span className="font-bold text-xl tracking-tight text-slate-800 block leading-none">EduManager</span>
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1 block">Management System</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" type="text" placeholder="Enter your username" required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter your password" required />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
