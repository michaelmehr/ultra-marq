import "./globals.css";

export const metadata = {
  title: "ultra-marq",
  description: "Bookmark manager and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 grid place-content-center">
        {children}
      </body>
    </html>
  );
}
