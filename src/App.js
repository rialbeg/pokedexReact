import { AppRoutes } from 'pages/routes'
import { ThemeProvider } from 'contexts/theme-context';
import { GlobalStyle } from 'components/GlobalStyle/GlobalStyle';


function App() {
 
  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  );
}


export default App;
