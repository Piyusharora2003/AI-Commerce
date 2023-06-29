import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function CartIcon() {
    const { cartItems } = useSelector(state => state.cart);

    return (
    <div className="flow-root lg:ml-6">
        <Link to="./cart" className="flex items-center ps- text-white font-medium gap-2 relative">
            <ShoppingCartIcon
                className="h-6 w-6 flex-shrink-0 text-gray-800 group-hover:text-black "
                aria-hidden="true"
            />
            {
                cartItems.length > 0 &&
                <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                    {cartItems.length}
                </div>
            }   
            <span className="sr-only">items in cart, view bag</span>
        </Link>
    </div>
      )
}

export default CartIcon