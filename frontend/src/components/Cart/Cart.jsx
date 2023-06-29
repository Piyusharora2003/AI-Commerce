import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';

import CartItem from './CartItem.jsx';
import EmptyCart from './EmptyCart.jsx';
import PriceSidebar from './PriceSidebar.jsx';
import SaveForLaterItem from './SaveForLaterItem.jsx';

const Cart = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { saveForLaterItems } = useSelector((state) => state.saveForLater);

    const placeOrderHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <>
            <MetaData title="Shopping Cart | AI-Commerce" />
            <main className="w-full mt-6">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <div className="flex flex-col shadow bg-white">
                            <span className="font-medium font-sans	 text-lg px-2 sm:px-8 py-4 border-b">My Cart ({cartItems.length})</span>
                            {
                            cartItems && cartItems.length === 0 && (
                                <EmptyCart />
                            )}

                            {
                            cartItems && cartItems.map((item) => (
                                <CartItem {...item} inCart={true} />
                            )
                            )}

                            <div className="flex justify-end">
                                <button 
                                    onClick={placeOrderHandler} 
                                    disabled={cartItems.length < 1 ? true : false} 
                                    className={`${cartItems.length < 1 ? "bg-primary-grey cursor-not-allowed" : "bg-primary-orange"} w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white  shadow hover:shadow-lg rounded-md`}>
                                        PLACE ORDER
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 shadow bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">Saved For Later ({saveForLaterItems.length})</span>
                            {
                                saveForLaterItems &&
                                saveForLaterItems.map((item) => (
                                    <SaveForLaterItem {...item} />
                                ))
                            }
                        </div>
                    </div>
                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Cart;
