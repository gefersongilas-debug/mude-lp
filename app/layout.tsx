import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Museu Flamengo + Tour da Gávea",
  description:
    "Viva a história do Flamengo por dentro: Museu Flamengo e Tour guiado pela sede da Gávea.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
