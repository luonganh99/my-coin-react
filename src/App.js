import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AccessWallet from './pages/AccessWallet';
import CreateWallet from './pages/CreateWallet';
import Dashboard from './pages/Dashboard';

const App = () => {
    // const [response, setResponse] = useState('');

    // useEffect(() => {
    //     const generateMnemoricPhrase = async () => {
    //         const res = await axios.get(ENDPOINT + '/generateMnemoricPhrase');
    //         console.log(res.data);
    //     };

    //     generateMnemoricPhrase();
    // }, []);

    return (
        <Router>
            <Switch>
                <Redirect exact from='/' to='/create-wallet' />
                <Route path='/dashboard'>
                    <Dashboard />
                </Route>
                <Route path='/create-wallet'>
                    <CreateWallet />
                </Route>
                <Route path='/access-wallet'>
                    <AccessWallet />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
