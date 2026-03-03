export const metadata = {
  title: "Breathe",
  description: "A moment for you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; overflow: hidden; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
