import "../styles/app.scss";
import "../styles/profile.scss"; // Import profile styles
import Header from "./header";
import { ContextProvider } from "../components/Clients";
import MainLayout from "../components/MainLayout";

export const metadata = {
  title: "Task Management",
  description: "This is a Task Management made with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <MainLayout>
             {/* Use Profile component */}
            {children}
          </MainLayout>
        </ContextProvider>
      </body>
    </html>
  );
}
