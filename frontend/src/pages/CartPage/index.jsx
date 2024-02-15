import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, removeCartItem } from '../../store/thunkFunctions';
import CartTable from './Sections/CartTable';

const CartPage = () => {

  const userData = useSelector(state => state.user?.user.userData);
  const cartDetail = useSelector(state => state.user?.user.cartDetail);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let cartItemIds = [];

    if(userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach(item => {
        cartItemIds.push(item.id);
      });

      const body = {
        cartItemIds,
        userCart: userData.cart
      };

      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    calcTotal(cartDetail);
  }, [cartDetail]);

  const calcTotal = (cartItems) => {
    let total = 0;
    cartItems.map(item => total += item.price*item.quantity);
    setTotal(total);
  };

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>나의 장바구니</h2>
      </div>

      {cartDetail?.length > 0 ?
      <>
        <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem} />

        <div className='mt-10'>
          <p><span className='font-bold'>합계 : </span>{total} 원</p>
          <button className='text-white bg-black hover:bg-gray-500 rounded-md px-4 py-2 mt-5'>결제하기</button>
        </div>
      </>
      :
      <p>장바구니가 비었습니다.</p>
      }
    </section>
  )
}

export default CartPage
