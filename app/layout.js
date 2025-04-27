import "./globals.css";
import "../styles/globals.scss";
import { Header } from "@/components";

export const metadata = {
  title: "Pixel Quirk: Insights in Every Pixel",
  description:
    "Pixel Quirk brings you hand-picked blog posts via GraphQL & Hygraph CMS. Visitors can comment; I will personally approve and showcase the best feedback.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
