import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { post } from '../../utils/paytmForm';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import WebcamImage from "./WebcamImage.jsx";




const Payment = () => {
    const navigate  = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { error } = useSelector((state) => state.newOrder);

    const { user } = useSelector((state) => state.user);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const [IsVerified,SetIsVerified] = useState(false);     // Stores if verified or not 
    const[verifying,setVerifying] = useState(false);        // Stores if verification begins or not
    const [ImageData, SetImageData] = useState(null);       // Stores the image data

    
    const dispatch = useDispatch();
    const [payDisable, setPayDisable] = useState(false);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
    };
    
    function initializeVerification(){
        // Opens the verification process and camera connection             
        setVerifying(true);
    }
    
        async function VerifyImage(){
            if(!user || !ImageData){
                console.log("Please Login");
                navigate("/login");
            }
            // console.log("results :");
            // console.log((payDisable));
            // console.log(IsVerified);
            // alert("Verify Your identification");
            
            try{
                const res = await axios.post('/api/v1/py/testapi',{
                    userImage: user.avatar.url,
                    currentImage:ImageData
                })
                console.log(res.data.verified);
                if(res.data.verified) SetIsVerified(true);
                else{
                    alert("Verification Failed");
                    SetIsVerified(false);
                }
            }
            catch(err){
                console.log("Error in verifying your identification");
                console.log("error: " + err);
            }
        }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("submit handler called");
        setPayDisable(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                '/api/v1/payment/process',
                paymentData,
                config,
            );

            let info = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: data.paytmParams
            }

            post(info);
        } catch (error) {
            // paymentBtn.current.disabled = false;
            setPayDisable(false);
            enqueueSnackbar(error, { variant: "error" });
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);


    return (
        <>
            <MetaData title=" Payment Gateway " />
            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1 w-full">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white" >
                                <form onSubmit={(e) => submitHandler(e)} autoComplete="off"  className="flex flex-col justify-start gap-2 w-max mx-8 my-4 overflow-hidden">
                                    <FormControl className='w-full' >
                                        <RadioGroup
                                            aria-labelledby="payment-radio-group"
                                            defaultValue="paytm"
                                            name="payment-radio-button"
                                        >
                                            <FormControlLabel
                                                value="paytm"
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4 w-full">
                                                        <img draggable="false" className="h-6 w-6 object-contain" src="https://rukminim1.flixcart.com/www/96/96/promos/01/09/2020/a07396d4-0543-4b19-8406-b9fcbf5fd735.png" alt="Paytm Logo" />
                                                        <span>Paytm</span>
                                                    </div>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    

                                    {
                                        !IsVerified &&
                                        <div className={`font-bold w-max border-2 border-sky-800 px-3 ms-6 cursor-pointer rounded-sm  py-1 capitalize text-slate-800`}
                                        style={{ 'backgroundColor' :IsVerified ? 'rgb(74 222 128)': 'rgb(244 63 94)'}}
                                        onClick={initializeVerification} >
                                            Verify Your Identity
                                        </div>
                                    }
                                    {/* OPENS AFTER INITIALIZING PROCESS */}
                                <div className='w-100'>

                                    {
                                        !IsVerified
                                        &&verifying &&
                                        <WebcamImage img={ImageData} setImg={SetImageData} verifyImage = {VerifyImage}/>
                                    }
                            
                                    </div>
                                    <input type="submit" value={`Pay ₹${totalPrice.toLocaleString()}`} disabled={(payDisable ? true : false) || !IsVerified} className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-primary-orange cursor-pointer"}  my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} />
                                </form>

                            </div>
                        </Stepper>
                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;