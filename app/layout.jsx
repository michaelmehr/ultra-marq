import NavHeader from "./components/navbar";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "ultra-marq",
  description: "Bookmark manager and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <NavHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
