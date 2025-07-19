import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-6">This page does not exist</p>
      <Link
        href="/"
        className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
}