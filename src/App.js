import { ThemeProvider } from '@material-ui/core';
import { useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from 'src/components/GlobalStyles';
import routes from './routes';
import theme from './theme';

const App = () => {
    const routing = useRoutes(routes);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {routing}
        </ThemeProvider>
    );
};

export default App;
