import {
    Box,
    Button,
    Card,
    CardHeader,
    Container,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ENDPOINT } from '../config';
import { useAuthContext } from '../context/AuthContext';

const HistoryTransation = (props) => {
    const [transactions, setTransactions] = useState([]);

    const { authData } = useAuthContext();

    useEffect(() => {
        const getAddressData = async () => {
            const res = await axios.get(ENDPOINT + '/address/' + authData.publicKey);

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
                    <Card {...props}>
                        <CardHeader title='History Transactions' />
                        <Divider />
                        <Box sx={{ minWidth: 800 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Txn ID</TableCell>
                                        <TableCell>Age</TableCell>
                                        <TableCell>From</TableCell>
                                        <TableCell>To</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((transaction, id) => (
                                        <TableRow hover key={id}>
                                            <TableCell width={200}>
                                                {transaction.transactionId}
                                            </TableCell>
                                            <TableCell>
                                                {dayjs(transaction.date).format('HH:mm:ss DD/MM')}
                                            </TableCell>
                                            <TableCell width={360}>
                                                <div
                                                    style={{
                                                        width: 300,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {transaction.sender}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    style={{
                                                        width: 300,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {transaction.recipient}
                                                </div>
                                            </TableCell>
                                            <TableCell>{transaction.amount} RIN</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2,
                            }}
                        >
                            <Button
                                color='primary'
                                endIcon={<ArrowRightIcon />}
                                size='small'
                                variant='text'
                            >
                                View all
                            </Button>
                        </Box>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default HistoryTransation;
