import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Box, Button } from "@mui/material";
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'
// Define the types for the images and cards


interface Card {
  id: number;
  title: string;
  content: string;
  img: string;
}

const cards: Card[] = [
  { id:0,title: "ศิลปะและความพิถีพิถันในกระบวนการผลิตชา", content: 'กระบวนการผลิตชาเป็นศิลปะที่เต็มไปด้วยรายละเอียดและความพิถีพิถัน ตั้งแต่การเลือกใบชาที่เหมาะสมจากแหล่งปลูกที่มีสภาพภูมิอากาศเฉพาะตัว ไปจนถึงขั้นตอนการแปรรูปที่กำหนดรสชาติและกลิ่นหอมของชา ใบชาสดที่เก็บในเวลาเช้าตรู่จะผ่านกระบวนการอบ นวด และหมักเพื่อให้ได้ชาประเภทต่าง ๆ เช่น ชาดำที่ผ่านการหมักเต็มที่ ชาเขียวที่ไม่ผ่านการหมัก หรือชาอู่หลงที่มีการหมักเพียงบางส่วน เทคนิคและขั้นตอนที่แตกต่างเหล่านี้ไม่เพียงแต่สร้างเอกลักษณ์ให้กับชาแต่ละชนิด แต่ยังสะท้อนถึงภูมิปัญญาและวัฒนธรรมของผู้ผลิตชาในแต่ละภูมิภาค',img:blog1 },
  { id:1,title: "เสน่ห์ของชา: เครื่องดื่มที่เชื่อมโยงวัฒนธรรมและจิตวิญญาณ",  content: 'ชาถือเป็นเครื่องดื่มที่มีความสำคัญทางวัฒนธรรมในหลายประเทศทั่วโลก ตั้งแต่ญี่ปุ่น จีน อินเดีย ไปจนถึงอังกฤษ แต่ละแห่งมีวิธีการดื่มชาที่เป็นเอกลักษณ์และสะท้อนถึงจิตวิญญาณของผู้คนในท้องถิ่น พิธีชงชาในญี่ปุ่นแสดงถึงการเคารพธรรมชาติและการอยู่กับปัจจุบัน ในขณะที่ชาภาคบ่ายของอังกฤษเป็นสัญลักษณ์ของความสง่างามและความผ่อนคลาย ความหลากหลายนี้ทำให้ชาไม่เพียงเป็นเครื่องดื่ม แต่ยังเป็นสะพานที่เชื่อมโยงผู้คนจากวัฒนธรรมต่าง ๆ เข้าด้วยกัน' ,img: blog2 },
  { id:2,title: "ชาและสุขภาพ: พลังจากธรรมชาติที่เติมเต็มชีวิต",   content: 'ชาเป็นหนึ่งในเครื่องดื่มที่มีคุณค่าทางโภชนาการมากที่สุดในโลก โดยเฉพาะชาเขียวที่เต็มไปด้วยสารต้านอนุมูลอิสระ เช่น คาเทชิน ซึ่งช่วยเสริมสร้างภูมิคุ้มกันและลดความเสี่ยงของโรคเรื้อรังหลายชนิด นอกจากนี้ ชาดำและชาอู่หลงยังมีคุณสมบัติช่วยเพิ่มการเผาผลาญพลังงานและลดความเครียด การดื่มชาเป็นประจำไม่เพียงแต่ช่วยบำรุงสุขภาพร่างกาย แต่ยังสร้างสมดุลให้กับจิตใจผ่านช่วงเวลาที่เราหยุดพักเพื่อดื่มด่ำกับกลิ่นและรสชาติของมัน' ,img: blog3},
];

// สร้าง array ของ images โดยใช้ map
const images: string[] = cards.map(card => card.img);

// Create a context for sharing data
export const BlogContext = createContext({
  images, // ใช้ array ของ images ที่สร้างขึ้น
  cards,
});

const BlogPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();
  const { images, cards } = useContext(BlogContext);

  const handleReadMore = (id: number) => {
    navigate(`/article/${id}`); // ไปที่หน้าบทความพร้อมกับ ID
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Autoplay every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <Box>
        {/* Carousel */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.5s ease-in-out',
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((src, index) => (
              <Box
                key={index}
                component="img"
                src={src}
                alt={`Slide ${index + 1}`}
                sx={{
                  width: '100%',
                  flexShrink: 0,
                }}
                onClick={() => handleReadMore(index)}
              />
            ))}
          </Box>

          <Button
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 10,
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          >
            ◀
          </Button>

          <Button
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 10,
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          >
            ▶
          </Button>

          <Box
            sx={{
              position: 'absolute',
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: currentIndex === index ? 'primary.main' : 'grey.500',
                  transition: 'background-color 0.3s',
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Card Section */}
        <Box className="flex flex-col items-center md:flex-row justify-center gap-5 mt-10 shadow-md">
          {cards.map((card, index) => (
            <div key={index} className="w-full sm:w-[380px] md:w-[300px] lg:w-[320px] xl:w-[350px] flex flex-col rounded-3xl bg-black text-white border-2 min-h-[400px] max-h-[400px]">
              <img
                src={card.img}
                className="w-full h-48 object-cover rounded-t-3xl border-2 border-b-black"
                alt={`Card ${index + 1}`}
              />
              <div className="p-3 flex-grow flex flex-col justify-between">
                <div className="p-3 py-8">{card.title}</div>
                <button
                  onClick={() => handleReadMore(index)} // กดแล้วเปลี่ยนหน้า
                  className="px-4 py-2 rounded-full bg-white text-black w-28 h-10 hover:bg-red-600 transition-colors"
                >
                  อ่านต่อ
                </button>
              </div>
            </div>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default BlogPage;