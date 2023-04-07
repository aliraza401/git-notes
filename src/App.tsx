import { Router } from "./router";

import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";
import useBreakpoint from "./hooks/useBreakpoints";
import { GistContext } from "./context/GistContext";
import { UserContext } from "./context/UserContext";

function App() {
  const screen = useBreakpoint();

  return (
    <ThemeProvider theme={{ ...theme, screen }}>
      <GistContext>
        <UserContext>
          <GlobalStyle />
          <Router />
        </UserContext>
      </GistContext>
    </ThemeProvider>
  );
}
export default App;
