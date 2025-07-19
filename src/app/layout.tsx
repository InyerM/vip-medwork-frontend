// Core
import Header from "@/components/Header";

// Global
import "@/styles/globals.css";

export const metadata = {
  title: "VIP Medwork",
  description: "Patient & provider management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
