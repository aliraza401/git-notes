import { Router } from "./router/router";

import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import useBreakpoint from "./hooks/useBreakpoints";
import { GistContext } from "./context/GistContext";
import { UserContext } from "./context/UserContext";

function App() {
  const screen = useBreakpoint();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{ ...theme, screen }}>
        <UserContext>
          <GistContext>
            <ReactQueryDevtools initialIsOpen={true} />
            <GlobalStyle />
            <Router />
          </GistContext>
        </UserContext>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
