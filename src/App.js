import { ThemeProvider } from '@material-ui/core';
import { useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './components/GlobalStyles';
import routes from './routes';
import theme from './theme';
import AuthContextProvider from './context/AuthContext';

const App = () => {
    const routing = useRoutes(routes);

    return (
        <ThemeProvider theme={theme}>
            <AuthContextProvider>
                <GlobalStyles />
                {routing}
            </AuthContextProvider>
        </ThemeProvider>
    );
};

export default App;
