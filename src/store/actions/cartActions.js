export const increaseQuantity = (product, quantity, selectedColor, selectedSize, selectedColorSize) => ({
    type: 'cart/increaseQuantity',
    payload: { product, quantity, selectedColor, selectedSize, selectedColorSize }
});

export const decreaseQuantity = (product, quantity, selectedColor, selectedSize, selectedColorSize) => ({
    type: 'cart/decreaseQuantity',
    payload: { product, quantity, selectedColor, selectedSize, selectedColorSize }
});
export const updateColorSizeStock = (product, selectedColor, selectedSize, quantity) => ({
    type: 'colorSize/updateStock',
    payload: { product, selectedColor, selectedSize, quantity }
});
export const deleteItem = (product, selectedColor, selectedSize) => ({
    type: 'cart/delete',
    payload: { product, selectedColor, selectedSize }
});

export const clearCart = () => ({
    type: 'cart/clear'
});
