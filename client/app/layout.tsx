// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext";
import ReactQueryProvider from "./context/ReactQueryProvider";

export const metadata = {
  title: "ICR",
  description: "Store tailored by your desires!",
};

const theme = createTheme({
  colors: {
    "dp-gold": [
      "#B18E71",
      "#A77F5F",
      "#966640",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
    ],
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
