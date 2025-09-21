// app/layout.js
import "./globals.css";

export const metadata = {
  title: "E-Book STJ Model",
  description: "ข้อมูลเกี่ยวกับวัณโรคและ STJ Model",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  );
}