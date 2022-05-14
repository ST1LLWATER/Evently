import "../styles/globals.css";
import { NotificationsProvider } from "@mantine/notifications";
import ClassMembersDrawer from "../components/ClassMembersDrawer";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Store from "../redux/store";
import { useRouter } from "next/router";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const queryClient = new QueryClient();

  if (router.pathname.startsWith("/") && router.pathname !== "/auth") {
    return (
      <div className="h-screen min-h-screen max-h-screen overflow-hidden flex flex-col">
        <QueryClientProvider client={queryClient}>
          <Provider store={Store}>
            <NotificationsProvider>
              <Nav />
              <ClassMembersDrawer />
              <Component {...pageProps} />
            </NotificationsProvider>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </div>
    );
  }
  return (
    <Provider store={Store}>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </Provider>
  );
}

export default MyApp;
