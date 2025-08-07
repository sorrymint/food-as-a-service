"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);


    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    function validate() {
        const newErrors: { [key: string]: string } = {};

        if (!currentPassword) {
            newErrors.currentPassword = "Current password is required";
        }

        if (!newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (!passwordRegex.test(newPassword)) {
            newErrors.newPassword =
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
        }

        if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/account/changePassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!res.ok) {
                const error = await res.text();
                throw new Error(error || "Failed to change password");
            }

            toast("Password changed successfully.");
            // Clear inputs on success
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setErrors({});
        } catch (error: any) {
            toast(
                <>
                    <strong>Error:</strong> {error.message}
                </>,
                { variant: "destructive" }
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Change Password</CardTitle>
                <CardDescription>
                    Please enter your current password and choose a new one.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-6">
                        <div>
                            <Label htmlFor="currentPassword" className="block mb-1">
                                Current Password
                            </Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                aria-invalid={!!errors.currentPassword}
                                aria-describedby="currentPassword-error"
                            />
                            {errors.currentPassword && (
                                <p
                                    id="currentPassword-error"
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {errors.currentPassword}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="newPassword" className="block mb-1">
                                New Password
                            </Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                aria-invalid={!!errors.newPassword}
                                aria-describedby="newPassword-error"
                            />
                            {errors.newPassword && (
                                <p
                                    id="newPassword-error"
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {errors.newPassword}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword" className="block mb-1">
                                Confirm New Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                aria-invalid={!!errors.confirmPassword}
                                aria-describedby="confirmPassword-error"
                            />
                            {errors.confirmPassword && (
                                <p
                                    id="confirmPassword-error"
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>
                    <CardFooter className="pt-6">
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Changing..." : "Change my password"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
