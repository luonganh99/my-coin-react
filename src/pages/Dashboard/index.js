import { useEffect, useState } from 'react';
import Layout from '../../components/DashboardLayout';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import {
    Box,
    Container,
    Grid
  } from '@material-ui/core';
import Budget from '../../components/Budget';

const ENDPOINT = 'http://localhost:4000';

const Dashboard = () => {
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('PT', (data) => {
            console.log(data);
        });

        return () => socket.disconnect();
    }, []);

    const handleSendCoinClick = async () => {
        const res = await axios.post(ENDPOINT + '/transaction/broadcast', {
            amount: 50,
            sender: '02609934acf7eac102487d046b8e94cfd10d8aaf013c6263e3e664131568afaf27',
            recipient: '03c9fbe312af86a63695f7e184149751672f9c667a2b4b141339301fb56f11cbc2',
        });

        console.log(res.data);
    };

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
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                    container
                    spacing={3}
                    >
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            {/* <button onClick={handleSendCoinClick}>Send coin</button> */}
                            <Budget />
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <button onClick={handleMineCoinClick}>Mine coin</button>
                        </Grid>
                    </Grid>
                </Container>
        </Box>
        </>
    );
};

export default Dashboard;
