import Button from "@/components/Button";

const links = [
  { href: "/patients", label: "Patients" },
  { href: "/providers", label: "Providers" },
  { href: "/statuses", label: "Statuses" },
];

export default function Statuses() {
  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-6rem)]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-7xl font-bold mb-4">Statuses</h1>
        <p className="text-2xl">This is the internal system for managing patients, providers, and statuses.</p>
      </div>
      <div className="flex gap-4 my-10">
        {links.map((link) => (
          <Button key={link.href} as="link" href={link.href}>
            {link.label}
          </Button>
        ))}
      </div>
    </section>
  );
}