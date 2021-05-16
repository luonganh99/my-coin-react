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

const PendingTransactions = ({ pendingTransactions, onMineCLick, ...props }) => {
    return (
        <Card {...props}>
            <CardHeader title='Pending Transactions' />
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
                            <TableCell>Mine</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingTransactions.map((transaction) => (
                            <TableRow hover key={transaction.transactionId}>
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
                                            width: 280,
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
                                            width: 280,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {transaction.recipient}
                                    </div>
                                </TableCell>
                                <TableCell>{transaction.amount} RIN</TableCell>
                                <TableCell>
                                    {/* <Button type='button' onCLick={onMineCLick}>
                                        Mine
                                    </Button> */}
                                    <button onClick={onMineCLick}>Mine</button>
                                </TableCell>
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

export default PendingTransactions;
