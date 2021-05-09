import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

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
        <Layout>
            <button onClick={handleSendCoinClick}>Send coin</button>
            <button onClick={handleMineCoinClick}>Mine coin</button>
        </Layout>
    );
};

export default Dashboard;
