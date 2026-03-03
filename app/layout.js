export const metadata = {
  title: "Breathe",
  description: "Take a moment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}} />
        </>}
        <style>{`
          *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; overflow: hidden; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
