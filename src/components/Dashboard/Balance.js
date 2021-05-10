import { Avatar, Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const Balance = ({ amount, ...props }) => (
    <Card sx={{ height: '100%' }} {...props}>
        <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                <Grid item>
                    <Typography color='textSecondary' gutterBottom variant='h4'>
                        BALANCE
                    </Typography>
                    <Typography color='textPrimary' variant='h2'>
                        {amount} RIN
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: orange[600],
                            height: 56,
                            width: 56,
                        }}
                    >
                        <AttachMoneyIcon />
                    </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center',
                }}
            ></Box>
        </CardContent>
    </Card>
);

export default Balance;
