import OolongTea from "../assets/Oolong-tea.jpg"

export interface Product {
    id: number;
    name: string;
    weight: string;
    price: number;
    imageUrl: string;
    category: string;
    description: string;
    ingredients: string[];
}

const products: Product[] = [
    { 
        id: 1, 
        name: "Green Tea Blend", 
        weight: "100g", 
        price: 125, 
        imageUrl: "/path/to/green-tea-image.jpg", 
        category: "ชาเขียว",
        description: "ชาเขียวผสมสูตรพิเศษ หอมกลิ่นใบชาแท้ๆ และสมุนไพร",
        ingredients: ["ใบชาเขียว", "ดอกเก๊กฮวย", "ใบเตย"]
    },
    { 
        id: 2, 
        name: "Black Tea Classic", 
        weight: "100g", 
        price: 150, 
        imageUrl: "/path/to/black-tea-image.jpg", 
        category: "ชาดำ",
        description: "ชาดำคลาสสิก รสชาติกลมกล่อม ดื่มง่าย",
        ingredients: ["ใบชาดำ"]
    },
    { 
        id: 3, 
        name: "Oolong Tea Premium", 
        weight: "100g", 
        price: 175, 
        imageUrl: OolongTea, 
        category: "ชาอู่หลง",
        description: "ชาอู่หลงพรีเมียม ผ่านกระบวนการหมักอย่างพิถีพิถัน",
        ingredients: ["ใบชาอู่หลง"]
    },
    { 
        id: 4, 
        name: "White Tea Blossom", 
        weight: "100g", 
        price: 200, 
        imageUrl: "/path/to/white-tea-image.jpg", 
        category: "ชาขาว",
        description: "ชาขาวบลอสซั่ม หอมละมุนจากดอกไม้ธรรมชาติ",
        ingredients: ["ใบชาขาว", "ดอกมะลิ", "ดอกกุหลาบ"]
    },
];

export default products;
