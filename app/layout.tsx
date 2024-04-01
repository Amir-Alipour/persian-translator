import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Hugging Next | translation",
    description: "translation app using next.js and hugging face",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
