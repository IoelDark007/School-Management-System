// app/layout.tsx
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <AuthProvider>
            <TooltipProvider>
              <div className="flex h-screen">
                <div className="flex-1 flex flex-col">
                  <main>{children}</main>
                </div>
              </div>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
