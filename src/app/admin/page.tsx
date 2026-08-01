"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-xl font-bold text-red-500 mb-2">Admin Panel Separated</h1>
        <p className="text-sm text-gray-400">
          The Admin Portal is managed as an independent project repository. Redirecting to store home...
        </p>
      </div>
    </div>
  );
}
