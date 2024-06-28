import { AuthProvider } from "./context/Auth";
import { Tajawal } from "next/font/google";
import "./globals.css";

import NavBar from "./components/shared/Navbar.js";
import { getSession } from "./utils/actions.js";

const tajwal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin", "arabic"],
});

export const metadata = {
  title: "Jobfinder-Algeria",
  description: "Platform for searching a job in Algeria",
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar user={session?.user} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
