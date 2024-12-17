import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogContext } from "../pages/BlogPage"; 

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // สำหรับการนำทาง
  const { cards: articles } = useContext(BlogContext); // ดึงข้อมูล cards จาก Context
  const article = articles[parseInt(id || '0')];

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl mt-14 font-semibold text-center text-gray-900">ไม่พบบทความ</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-full bg-black  text-white w-28 h-10 hover:bg-red-700 transition-color duration-500 self-center"
        >
          กลับ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg ">
      <h1 className="text-4xl mt-14  font-semibold text-center text-gray-900">{article.title}</h1>  
      <img src={article.img} alt={article.title} className="mt-6 w-full h-64 object-cover rounded-lg" />
      <p className="mt-4 text-lg text-gray-700">{article.content}</p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mt-3 rounded-full bg-black  text-white w-28 h-10 hover:bg-red-700 transition-color duration-500 self-center"
      >
        กลับ
      </button>
    </div>
  );
};

export default Article;
