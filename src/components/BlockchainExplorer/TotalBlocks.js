import { Avatar, Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AssessmentIcon from '@material-ui/icons/Assessment';

const TotalBlocks = ({ amount, ...props }) => (
    <Card sx={{ height: '100%' }} {...props}>
        <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                <Grid item>
                    <Typography color='textSecondary' gutterBottom variant='h4'>
                        BLOCKS
                    </Typography>
                    <Typography color='textPrimary' variant='h2'>
                        {amount}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: green[600],
                            height: 56,
                            width: 56,
                        }}
                    >
                        <AssessmentIcon />
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

export default TotalBlocks;
