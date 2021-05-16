import { Box, Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import socketIOClient from 'socket.io-client';
import LastestBlocks from '../components/BlockchainExplorer/LastestBlocks';
import LatestTransactions from '../components/BlockchainExplorer/LastestTransactions';
import PendingTransactions from '../components/BlockchainExplorer/PendingTransactions';
import TotalBlocks from '../components/BlockchainExplorer/TotalBlocks';
import TotalPendingTransactions from '../components/BlockchainExplorer/TotalPendingTransactions';
import TotalTransactions from '../components/BlockchainExplorer/TotalTransactions';
import { ENDPOINT } from '../config';
import { useAuthContext } from '../context/AuthContext';

const BlockchainExplorer = (props) => {
    const [blocks, setBlocks] = useState([]);
    console.log(
        'OUTPUT ~ file: BlockchainExplorer.js ~ line 17 ~ BlockchainExplorer ~ blocks',
        blocks
    );
    const [transactions, setTransactions] = useState([]);
    const [pendingTransactions, setPendingTransactions] = useState([]);

    const { authData } = useAuthContext();

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on('PendingTransaction', (data) => {
            setPendingTransactions(data);
        });

        socket.on('Trasactions', (data) => {
            setTransactions(data);
        });

        socket.on('Blocks', (data) => {
            setBlocks(data);
        });

        const getBlockchainData = async () => {
            const res = await axios.get(ENDPOINT + '/blockchain');

            console.log(res.data);
            setBlocks(res.data.chain);
            setTransactions(res.data.transactions);
            setPendingTransactions(res.data.pendingTransactions);
        };
        getBlockchainData();

        return () => socket.disconnect();
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
                            <TotalTransactions amount={transactions.length} />
                        </Grid>
                        <Grid item lg={4} sm={6} xl={3} xs={12}>
                            <TotalPendingTransactions amount={pendingTransactions.length} />
                        </Grid>
                        <Grid item lg={4} sm={6} xl={3} xs={12}>
                            <TotalBlocks amount={blocks.length} />
                        </Grid>
                        <Grid item lg={12} md={12} xl={9} xs={12}>
                            <LastestBlocks blocks={blocks} />
                        </Grid>
                        <Grid item lg={12} md={12} xl={9} xs={12}>
                            <PendingTransactions
                                pendingTransactions={pendingTransactions}
                                onMineCLick={handleMineCoinClick}
                            />{' '}
                        </Grid>
                        <Grid item lg={12} md={12} xl={9} xs={12}>
                            <LatestTransactions transactions={transactions} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <ToastContainer />
        </>
    );
};

export default BlockchainExplorer;
