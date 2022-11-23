import "../styles/globals.css";
import Header from "./Header";

// Install Poppins font:
import { Poppins } from "@next/font/google";

// Select font weights:
const customFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={customFont.className}>
      <head />
      <body className="w-screen h-screen p-8 bg-no-repeat bg-custom-radial-gradient">
        <Header />
        {children}
      </body>
    </html>
  );
}
