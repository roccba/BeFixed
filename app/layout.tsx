import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import Script from "next/script"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BeFixed - Profesionales a un chat de distancia",
  description:
    "BeFixed es una plataforma que conecta a clientes con técnicos especializados (electricidad, plomería, gas, cerrajería, etc.) en tiempo real, similar a Uber/Didi.",
  manifest: "/manifest.json",
  themeColor: "#23C48E",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BeFixed",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('Service Worker registration successful with scope: ', registration.scope);
                  },
                  function(err) {
                    console.log('Service Worker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>
        <Script id="pwa-install-detection" strategy="afterInteractive">
          {`
            // Guardar el evento beforeinstallprompt para usarlo más tarde
            window.deferredPrompt = null;
            window.addEventListener('beforeinstallprompt', (e) => {
              // Prevenir que Chrome muestre el prompt automáticamente
              e.preventDefault();
              // Guardar el evento para usarlo más tarde
              window.deferredPrompt = e;
              console.log('La app puede ser instalada, guardando evento');
            });

            // Detectar cuando la PWA ha sido instalada
            window.addEventListener('appinstalled', (evt) => {
              console.log('BeFixed ha sido instalada correctamente');
              window.deferredPrompt = null;
            });
          `}
        </Script>
      </body>
    </html>
  )
}


import './globals.css'