import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../../config';
import { useAuthContext } from '../../context/AuthContext';

const SendCoin = (props) => {
    const { register, handleSubmit, control, setValue } = useForm();
    const { authData } = useAuthContext();

    const onSubmit = async (data) => {
        console.log(data);
        const res = await axios.post(ENDPOINT + '/transaction/broadcast', {
            amount: data.amount,
            sender: authData.publicKey,
            recipient: data.toAddress,
        });

        if (res.data.note !== 'Transaction complete!') {
            toast.error('Error!');
            return;
        }

        setValue('amount', '');
        setValue('toAddress', '');
        toast.success('Transaction complete!');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card {...props}>
                <CardHeader title='Send Coin' />
                <Divider />
                <CardContent>
                    <Box
                        sx={{
                            height: 200,
                            position: 'relative',
                        }}
                    >
                        <Controller
                            as={
                                <TextField
                                    label='Amount'
                                    fullWidth
                                    margin='normal'
                                    variant='filled'
                                    ref={register}
                                    type='number'
                                />
                            }
                            control={control}
                            name='amount'
                            defaultValue='50'
                        />
                        <Controller
                            as={
                                <TextField
                                    label='To Address'
                                    fullWidth
                                    margin='normal'
                                    variant='filled'
                                    ref={register}
                                />
                            }
                            control={control}
                            name='toAddress'
                            defaultValue='03c9fbe312af86a63695f7e184149751672f9c667a2b4b141339301fb56f11cbc2'
                        />
                    </Box>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Button
                        color='primary'
                        endIcon={<SendIcon />}
                        size='small'
                        variant='text'
                        type='submit'
                    >
                        Send
                    </Button>
                </Box>
            </Card>
        </form>
    );
};

export default SendCoin;
