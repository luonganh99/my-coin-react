import { Box, Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import socketIOClient from 'socket.io-client';
import Address from '../components/Dashboard/Address';
import Balance from '../components/Dashboard/Balance';
import LastestBlocks from '../components/Dashboard/LastestBlocks';
import LastestTransactions from '../components/Dashboard/LastestTransactions';
import PendingTransactions from '../components/Dashboard/PendingTransactions';
import SendCoin from '../components/Dashboard/SendCoin';
import TotalTransactions from '../components/Dashboard/TotalTransactions';
import { useAuthContext } from '../context/AuthContext';

const ENDPOINT = 'http://localhost:4000';

const Dashboard = () => {
    const { authData } = useAuthContext();
    const [balance, setBalance] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [pendingTransactions, setPendingTransactions] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('PT', (data) => {
            setPendingTransactions(data);
        });
        socket.on('T', (data) => {
            setTransactions(data);
        });
        socket.on('B', (data) => {
            setBlocks(data);
        });

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        const getAddressData = async () => {
            const res = await axios.get(ENDPOINT + '/address/' + authData.publicKey);

            setBalance(res.data.addressData.addressBalance);
        };
        getAddressData();
    }, []);

    useEffect(() => {
        const getBlockchainData = async () => {
            const res = await axios.get(ENDPOINT + '/blockchain');

            console.log(res.data);
            setBlocks(res.data.chain);
            setTransactions(res.data.transactions);
            // setPendingTransactions(res.data.pendingTransactions);
        };
        getBlockchainData();
    }, []);

    const handleMineCoinClick = async () => {
        const res = await axios.post(ENDPOINT + '/mine', {
            clientHdKey: authData.hdKey,
        });

        if (res.data.note) {
            toast.success(
                `New block has index of ${res.data.block.index} is mined and broadcaset successfuly!`
            );
        }
    };

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
                        {/* <Grid item lg={4} sm={6} xl={3} xs={12}>
                            <TotalTransactions amount={transactions.length} />
                        </Grid> */}
                        <Grid item lg={6} md={12} xl={9} xs={12}>
                            <SendCoin />
                        </Grid>
                        <Grid item lg={6}>
                            <LastestBlocks blocks={blocks} />
                        </Grid>
                        <Grid item lg={12} md={12} xl={9} xs={12}>
                            <PendingTransactions
                                pendingTransactions={pendingTransactions}
                                onMineCLick={handleMineCoinClick}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} xl={9} xs={12}>
                            <LastestTransactions transactions={transactions} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <ToastContainer />
        </>
    );
};

export default Dashboard;
