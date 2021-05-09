import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
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
import { useEffect, useState } from 'react';
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
    title: {
        marginTop: 50,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    inputs: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '0 10px',
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
    },
}));

const CreateWallet = () => {
    const classes = useStyles();
    const [phrase, setPhrase] = useState([]);
    // const [confirmPhrase, setConfirmPhrase] = useState([]);
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const { control, handleSubmit, setValue, getValues } = useForm();

    useEffect(() => {
        const generateMnemoricPhrase = async () => {
            const res = await axios.get(ENDPOINT + '/generateMnemoricPhrase');
            setPhrase(res.data.mnemonic.split(' '));
        };

        generateMnemoricPhrase();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            phrase.forEach((el, i) => {
                if (i === 1 || i === 5 || i === 6 || i === 10 || i === 11) {
                    setValue(`input-${i}`, '');
                    return;
                }
                setValue(`input-${i}`, el);
            });
        });
    }, [open, phrase, setValue]);

    const handleOpen = () => {
        setOpen(true);
    };

    const onSubmit = (data) => {
        let inputs = Object.values(data);
        let isValid = true;

        for (let i = 0; i < inputs.length; i++) {
            if (phrase[i] !== inputs[i]) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            toast.error('Invalid Mnemonic. Please try again !');
            return;
        }
        history.push('/access-wallet');
    };

    const handleClose = () => {
        setOpen(false);
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
                        Get a New Wallet
                    </Typography>
                    <Typography variant='subtitle2'>
                        Already have a wallet?
                        <RouterLink to='/access-wallet'>Access My Wallet</RouterLink>
                    </Typography>
                    <Typography className={classes.title} variant='h5'>
                        Your Mnemonic Phrase
                    </Typography>
                    <form className={classes.form} noValidate>
                        <div className={classes.inputs}>
                            {phrase?.map((el, i) => (
                                <TextField
                                    size='small'
                                    key={i}
                                    variant='filled'
                                    margin='dense'
                                    label={`${i + 1}`}
                                    value={el}
                                ></TextField>
                            ))}
                        </div>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            size='large'
                            className={classes.submit}
                            onClick={handleOpen}
                        >
                            I Wrote Down My Mnemonic Phrase
                        </Button>
                        <Box mt={1}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
            <Dialog
                maxWidth='lg'
                fullWidth={true}
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>Verification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter and fill out the empty boxes below to verify your mnemonic
                        phrase key
                    </DialogContentText>
                    <div className={classes.inputs}>
                        {phrase.length > 0 &&
                            phrase.map((el, i) => (
                                <Controller
                                    as={
                                        <TextField
                                            size='small'
                                            key={i}
                                            variant='filled'
                                            margin='dense'
                                            label={`${i + 1}`}
                                        />
                                    }
                                    key={i}
                                    control={control}
                                    name={`input-${i}`}
                                />
                            ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)} color='primary'>
                        Verify
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Grid>
    );
};

export default CreateWallet;
