import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-medium text-muted-foreground mb-4">
          Store Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The store you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors inline-block"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
