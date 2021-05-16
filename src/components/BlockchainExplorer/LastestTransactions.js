import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import dayjs from 'dayjs';

const LatestTransactions = ({ transactions, ...props }) => {
    return (
        <Card {...props}>
            <CardHeader title='Lastest Transactions' />
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
                                    <div
                                        style={{
                                            width: 150,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {transaction.transactionId}
                                    </div>
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
                <Button color='primary' endIcon={<ArrowRightIcon />} size='small' variant='text'>
                    View all
                </Button>
            </Box>
        </Card>
    );
};

export default LatestTransactions;
