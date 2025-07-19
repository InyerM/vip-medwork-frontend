// Core
import { ReactNode } from "react";
import Head from "next/head";

// Components
import Header from "@/components/Header";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function MainLayout({
  children,
  title = "VIP Medwork",
}: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </div>
    </>
  );
}
