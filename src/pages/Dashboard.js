import { Box, Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Address from '../components/Dashboard/Address';
import Balance from '../components/Dashboard/Balance';
import SendCoin from '../components/Dashboard/SendCoin';
import TotalHistoryTransactions from '../components/Dashboard/TotalHistoryTransactions';
import HistoryTransactions from '../components/HistoryTransactions';
import { ENDPOINT } from '../config';
import { useAuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { authData } = useAuthContext();
    const [balance, setBalance] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        const getAddressData = async () => {
            const res = await axios.get(ENDPOINT + '/address/' + authData.publicKey);

            setBalance(res.data.addressData.addressBalance);
            setTransactions(res.data.addressData.addressTransactions);
        };
        getAddressData();
    }, []);

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3,
                }}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} sm={6} xl={3} xs={12}>
                            <Address address={authData.publicKey} />
                        </Grid>
                        <Grid item lg={4} sm={6} xl={3} xs={12}>
                            <Balance amount={balance} />
                        </Grid>
                        <Grid item lg={4} sm={6} xl={3} xs={12}>
                            <TotalHistoryTransactions amount={transactions.length} />
                        </Grid>
                        <Grid item lg={12} md={12} xl={9} xs={12}>
                            <SendCoin />
                        </Grid>
                        <Grid item lg={12} md={12} xl={9} xs={12}>
                            <HistoryTransactions transactions={transactions} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Dashboard;
