import { Link } from "@/i18n/routing";

export default function Footer() {
  return (
    <footer className="bg-foreground py-8 text-background">
      <div className="mx-auto text-center container">
        <p className="mb-4">&copy; 2023 Minimal Store. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
