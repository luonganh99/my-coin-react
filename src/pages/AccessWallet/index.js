import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ENDPOINT } from '../../config';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://material-ui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    inputs: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '0 10px',
    },
    title: {
        marginTop: 50,
    },
}));

const AccessWallet = () => {
    const classes = useStyles();
    const { register, handleSubmit, control } = useForm();
    const history = useHistory();

    const renderInputs = () => {
        const inputs = [];
        for (let i = 0; i < 12; i++) {
            inputs.push(
                <Controller
                    as={
                        <TextField
                            size='small'
                            variant='filled'
                            margin='dense'
                            label={`${i + 1}`}
                        />
                    }
                    key={i}
                    control={control}
                    name={`input-${i}`}
                    defaultValue=''
                />
            );
        }
        return inputs;
    };

    const onSubmit = async (data) => {
        const inputs = Object.values(data);

        const res = await axios.post(ENDPOINT + '/validateMnemoricPhrase', {
            mnemoric: inputs.join(' '),
        });

        if (!res.data.note) {
            toast.error('Invalid mnemoric. Please try again !');
            return;
        }

        history.push('/dashboard');
    };

    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <MonetizationOnIcon />
                    </Avatar>
                    <Typography component='h1' variant='h4'>
                        Access My Wallet
                    </Typography>
                    <Typography variant='body2'>
                        Do not have a wallet?{' '}
                        <RouterLink to='/create-wallet'>Create A New Wallet</RouterLink>
                    </Typography>
                    <Typography className={classes.title} variant='h5'>
                        Please type in your mnemonic phrase
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div className={classes.inputs}>{renderInputs()}</div>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                        >
                            Access Wallet
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
            <ToastContainer />
        </Grid>
    );
};

export default AccessWallet;
