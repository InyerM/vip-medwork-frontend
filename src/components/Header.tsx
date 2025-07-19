import Link from "next/link";

const links = [
  { href: "/patients", label: "Patients" },
  { href: "/providers", label: "Providers" },
];

export default function Header() {
  return (
    <header className="shadow px-4 py-6 sticky top-0 z-10">
      <nav className="max-w-2xl mx-auto flex gap-4 items-center justify-between">
        <Link href="/" className="font-semibold text-lg text-primary hover:text-primary-dark transition-all duration-200">
          VIP Medwork
        </Link>
        <div className="flex gap-7">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground-hover transition-all duration-200">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
