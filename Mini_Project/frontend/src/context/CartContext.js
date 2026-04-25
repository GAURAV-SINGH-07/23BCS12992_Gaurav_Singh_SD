
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, getCartCount, addToCart as addToCartAPI, updateCartItem as updateCartAPI, removeFromCart as removeFromCartAPI } from '../services/api';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await getCart();
      setCartItems(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }, []);

  const fetchCartCount = useCallback(async () => {
    try {
      const { data } = await getCartCount();
      setCartCount(data.count);
    } catch (err) {
      console.error('Failed to fetch cart count:', err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
    fetchCartCount();
  }, [fetchCart, fetchCartCount]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      await addToCartAPI(productId, quantity);
      await fetchCart();
      await fetchCartCount();
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await updateCartAPI(cartItemId, quantity);
      await fetchCart();
      await fetchCartCount();
    } catch (err) {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await removeFromCartAPI(cartItemId);
      await fetchCart();
      await fetchCartCount();
      toast.info('Item removed from cart');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.product.price) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        fetchCart,
        fetchCartCount,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};