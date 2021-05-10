import { Avatar, Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DnsIcon from '@material-ui/icons/Dns';

const Address = ({ address, ...props }) => (
    <Card sx={{ height: '100%' }} {...props}>
        <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                <Grid item>
                    <Typography color='textSecondary' gutterBottom variant='h4'>
                        ADDRESS
                    </Typography>
                    <Typography
                        color='textPrimary'
                        variant='h6'
                        style={{ wordBreak: 'break-all', width: 270, fontWeight: '600' }}
                    >
                        {address}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: red[600],
                            height: 56,
                            width: 56,
                        }}
                    >
                        <DnsIcon />
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

export default Address;
