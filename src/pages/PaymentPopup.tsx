import React, { useState, useEffect } from 'react';

interface PopupWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupWindow: React.FC<PopupWindowProps> = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [total30, setTotal30] = useState<number>(0);

  // คำนวณราคาทั้งหมดรวมค่าจัดส่ง
  useEffect(() => {
    const price = 125; // ราคาแต่ละชิ้น
    const shippingFee = 30; // ค่าจัดส่ง
    const subtotal = price * quantity; // คำนวณราคาสินค้า
    const totalWithShipping = subtotal + shippingFee; // คำนวณรวมค่าจัดส่ง

    setTotal(subtotal); // ตั้งค่าราคาสินค้า
    setTotal30(totalWithShipping); // ตั้งค่าราคาทั้งหมดรวมค่าจัดส่ง
  }, [quantity]); // คำนวณใหม่เมื่อ quantity เปลี่ยนแปลง

  // เพิ่มจำนวนสินค้า
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // ลดจำนวนสินค้า (ป้องกันค่าติดลบ)
  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(0, prev - 1)); // ป้องกันการลดต่ำกว่า 0
  };

  if (!isOpen) return null; // ไม่แสดงป็อปอัพหาก isOpen เป็น false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 text-center relative">
        <button 
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">รายการสั่งซื้อ : {quantity} รายการ</h2>
        <section className='flex flex-row border-4 '>
          <div>
            <img src="https://neramitcha.com/wp-content/uploads/2023/09/07-768x768.jpg" alt="Product" className='h-16 w-16'/>
          </div>
          <div className='ml-5'>
            <div >Product Name</div>
            <div className="flex justify-center items-center space-x-4">
              <button onClick={decrementQuantity} className="bg-gray-200 p-2 rounded-full w-8 h-8 flex items-center justify-center ">
                -
              </button>

              <span className="text-lg">{quantity}</span>
              <button 
                onClick={incrementQuantity} 
                className="bg-gray-200 p-2 rounded-full w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-7 ml-6">
            <p className="text-lg font-semibold">฿{total}</p>
          </div>
        </section>
        <section className='border-4 mt-3'>
          <div className='flex flex-row justify-between'>
            <span className='ml-1'>Subtotal</span>
            <span className='mr-1'>฿{total}</span>
          </div>
          <div className='flex flex-row justify-between'>
            <span className='ml-1'>ส่วนลด</span>
            <span className='mr-1'>฿0</span>
          </div>
          <div className='flex flex-row justify-between'>
            <span className='ml-1'>ค่าจัดส่ง</span>
            <span className='mr-1'>฿30</span>
          </div>
          <div className='flex flex-row justify-between'>
            <span className='ml-1'>Total</span>
            <span>{quantity} รายการ</span>
            <span className='mr-1'>฿{total30}</span> {/* แสดงผลราคาทั้งหมดรวมค่าจัดส่ง */}
          </div>
        </section>
        <section className='border-4 mt-3'>
          <div className='flex flex-row justify-between'>
            <span>Coupon <i className="fas fa-gift"></i></span>
            <span>เลือกกรอกโค้ด ⟩</span>
          </div>
          <button className='rounded-xl w-32 h-8 bg-red-500 '>
            ชำระเงิน
          </button>
        </section>
      </div>
    </div>
  );
};

export default PopupWindow;
