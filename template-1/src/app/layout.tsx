"use client"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider} from '@/app/container/ThemeProvider';
import './globals.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
