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
import dayjs from 'dayjs';

const LastestBlocks = ({ blocks, ...props }) => {
    return (
        <Card {...props}>
            <CardHeader title='Lastest Blocks' />
            <Divider />

            <List>
                {blocks.length > 0 &&
                    blocks.map((block, i) => (
                        <ListItem divider={i < blocks.length - 1} key={block.index}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        height: 48,
                                        width: 48,
                                    }}
                                >
                                    Bk
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={block.index}
                                secondary={`${dayjs(block.date).format('HH:mm:ss DD/MM')}`}
                            />
                            {/* <Typography>
                                {block.transactions[block.transactions - 1].recipient}
                            </Typography>
                            <Typography>{block.transactions.length + 1}</Typography> */}
                            <Typography>{block.transactions[0].amount} RIN</Typography>
                            {/* <IconButton edge='end' size='small'>
                                <MoreVertIcon />
                            </IconButton> */}
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

export default LastestBlocks;
