// app/account/suspended/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getClient } from "@/sanity/lib/sanity.client";
import { getOverdueBooks } from "@/sanity/lib/sanity.client";
import { readToken } from "@/sanity/lib/sanity.api";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Library } from "lucide-react";
import Link from "next/link";
import { OverdueBook } from "@/sanity/lib/sanity.queries";

export default function SuspensionPage() {
  const { user } = useUser();
  const client = getClient({ token: readToken });
  const [overdueBooks, setOverdueBooks] = useState<OverdueBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOverdueBooks = async () => {
      try {
        setLoading(true);
        const books = await getOverdueBooks(client, user.id);
        setOverdueBooks(books);
        console.log("Overdue Books:", books, user);
      } catch (error) {
        console.error("Failed to fetch overdue books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverdueBooks();
  }, [user]);

  if (!user) {
    return <div>Please sign in</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!overdueBooks?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-2xl font-bold text-green-600">Good Standing</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your account is in good standing with no overdue books.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/account">Return to Account</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="border-red-200 shadow-lg">
          <CardHeader className="bg-red-50 border-b border-red-200">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-10 w-10 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-red-800">
                  Account Suspended
                </h1>
                <p className="text-red-600">
                  Due to overdue book(s), your account has been temporarily
                  suspended.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 py-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Overdue Books</h2>
              <div className="space-y-4">
                {overdueBooks.map((book) => (
                  <div key={book._id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{book.book.title}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Due Date</p>
                        <p>
                          {new Date(book.dueDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Days Overdue</p>
                        <p className="text-red-600 font-medium">
                          {Math.floor(
                            (new Date().getTime() -
                              new Date(book.dueDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Library className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Please visit the school library to return your overdue books
                    and reactivate your account. We appreciate your cooperation.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/home">Return Home</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Contact Library</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
