import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AppProvider } from "@/context/Sidebar.context";

export default function RootRoutes({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <div className="h-screen flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-mainColor">
            <div className="container mx-auto px-4 py-3">{children}</div>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
