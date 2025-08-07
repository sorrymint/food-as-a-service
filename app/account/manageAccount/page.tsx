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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function ManageAccount() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/account/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            toast("Account deleted successfully.");
        } catch (err) {
            toast(
                <>
                    <strong>Failed to delete account.</strong>
                    <div>Check password or try again.</div>
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
                <CardTitle className="text-3xl font-bold">Manage Account</CardTitle>
                <CardDescription />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="w-full space-y-3">
                        <h1>Delete Account</h1>
                        <p className="text-gray-500 text-sm">
                            You can request to have your account deleted and personal
                            information removed.
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={handleDelete}>
                                    <DialogHeader>
                                        <DialogTitle>Delete Account</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="password-1">Current Password *</Label>
                                            <Input
                                                id="password-1"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <DialogDescription>
                                        Enter your current password to confirm cancellation of your
                                        account.
                                    </DialogDescription>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" type="button">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={loading}>
                                            {loading ? "Deleting..." : "Delete Account"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2" />
        </Card>
    );
}
