import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';

const LastestTransactions = ({ transactions, ...props }) => {
    return (
        <Card {...props}>
            <CardHeader title='Lastest Transactions' />
            <Divider />

            <List>
                {transactions.length > 0 &&
                    transactions.map((transaction, i) => (
                        <ListItem
                            divider={i < transactions.length - 1}
                            key={transaction.transactionId}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        height: 48,
                                        width: 48,
                                    }}
                                >
                                    Tx
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={transaction.transactionId} />

                            <Typography>From: {transaction.sender}</Typography>
                            <Typography>To: {transaction.recipient}</Typography>

                            <Typography>{transaction.amount} RIN</Typography>
                        </ListItem>
                    ))}
            </List>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2,
                }}
            >
                <Button color='primary' size='small' variant='text'>
                    See all
                </Button>
            </Box>
        </Card>
    );
};

export default LastestTransactions;
