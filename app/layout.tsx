import { getServerSession } from "next-auth";
import { ClientProvider } from "../components/ClientProvider";
import { Login } from "../components/Login";
import SessionProvider from "../components/SessionProvider";
import { SideBar } from "../components/SideBar";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "../styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="h-screen max-w-xs overflow-y-auto bg-[#202123] md:min-w-[20rem]">
                <SideBar />
              </div>
              <ClientProvider />

              <div className="flex-1 bg-[#343541]">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
