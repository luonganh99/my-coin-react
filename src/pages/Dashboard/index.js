import { useEffect, useState } from 'react';
import Layout from '../../components/DashboardLayout';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { Box, Container, Grid } from '@material-ui/core';
import Balance from '../../components/Dashboard/Balance';
import Address from '../../components/Dashboard/Address';
import { useAuthContext } from '../../context/AuthContext';
import SendCoin from '../../components/Dashboard/SendCoin';
import LastestBlocks from '../../components/Dashboard/LastestBlocks';
import LastestTransactions from '../../components/Dashboard/LastestTransactions';

const ENDPOINT = 'http://localhost:4000';

const Dashboard = () => {
    const { authData } = useAuthContext();

    const [balance, setBalance] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [transactions, setTransactions] = useState([]);

    console.log('auth ', authData);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('PT', (data) => {
            console.log(data);
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

            setBlocks(res.data.chain);
            setTransactions(res.data.transactions);
        };
        getBlockchainData();
    }, []);

    const handleMineCoinClick = async () => {
        const res = await axios.post(ENDPOINT + '/mine', {
            clientHdKey: {
                xpriv:
                    'xprv9s21ZrQH143K4DwVXH4V7WEDyK783MKAKs2QfqHFfE5E6s5K6ggDcdV8hqkHBHUVeg3D6wudQU2DgY2i85zi6VnvkQ8ygtw364vn1E8NtZe',
                xpub:
                    'xpub661MyMwAqRbcGi1xdJbVUeAxXLwcSp31h5x1UDgsDZcCyfQTeDzUARocZ7HU2RqJ4e2vjQ2SRvjUFCBnqcTogA8tmpoqyKXaCFQ9m6x117H',
            },
        });

        console.log(res.data);
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
                        <Grid item lg={8} md={12} xl={9} xs={12}>
                            <SendCoin />
                        </Grid>
                        <Grid item lg={6} md={12} xl={9} xs={12}>
                            <LastestBlocks blocks={blocks} />
                        </Grid>
                        <Grid item lg={6} md={12} xl={9} xs={12}>
                            <LastestTransactions transactions={transactions} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Dashboard;
