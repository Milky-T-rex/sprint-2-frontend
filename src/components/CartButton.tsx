// import React, { useState } from 'react';
// import PopupWindow from '../pages/PaymentPopup';

// const CartButton: React.FC = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const handleOpenPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   return (
//     <div className="flex right-0">
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//         onClick={handleOpenPopup}
//       >
//         <i className="fa fa-shopping-cart"></i>
//       </button>
//       <PopupWindow
//         isOpen={isPopupOpen} 
//         onClose={handleClosePopup} 
//         />
//     </div>
//   );
// };

// export default CartButton;
// src/components/CartButton.tsx
import React, {useState} from 'react';
import ProductCart, {CartItem} from './ProductCart'; // นำเข้า ProductCart

interface CartButtonProps {
    cartItems: CartItem[]; // รับรายการสินค้าจาก props
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // รับฟังก์ชันสำหรับอัพเดต cartItems
}

const CartButton: React.FC<CartButtonProps> = ({cartItems, setCartItems}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="flex right-0">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleOpenPopup}
            >
                <i className="fa fa-shopping-cart"></i>
            </button>
            <ProductCart
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />
        </div>
    );
};

export default CartButton;
