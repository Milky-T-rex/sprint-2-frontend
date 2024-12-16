import React, { useState, useEffect } from "react";

// Define interface for review data
interface Review {
  name?: string;
  rating?: number;
  comment?: string;
  profileImage?: string;
}

// Define interface for box content
interface BoxContent {
  id: number;
  content: React.ReactNode;
}

const ReviewSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/review")
      .then((response) => response.json())
      .then((data) => setReviews(data.user_reviews));
  }, []);

  const boxes: BoxContent[] = [
    {
      id: 1,
      content: (
        <div className="flex flex-col space-y-6 p-6 bg-gray-100 rounded-xl shadow-lg max-w-xs w-full">
          <div className="flex items-center space-x-6">
            <div className="border-4 border-red-400 rounded-full overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjT6GQmlhJbTxGAZJMqjF6OiK9wdRPskxMg&s"
                className="w-20 h-20 object-cover"
                alt="profile"
              />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <div className="font-bold text-lg text-gray-800">Name</div>
              <div className="flex items-center space-x-2">
                <div className="text-gray-600 text-base font-bold">Rate</div>
                <i className="fas fa-star text-yellow-500 text-sm"></i>
                <i className="fas fa-star text-yellow-500 text-sm"></i>
                <i className="fas fa-star text-yellow-500 text-sm"></i>
                <i className="far fa-star text-gray-400 text-sm"></i>
                <i className="fas fa-star-half-alt text-yellow-500 text-sm"></i>
              </div>
            </div>
          </div>
          <div className="text-gray-800 text-lg">
            "ลองให้ KOPH แนะนำกาแฟให้ ใช้เวลาไม่ถึง 1 นาทีก็ได้กาแฟที่ถูกใจ
            <br />
            ไม่ต้องเสียเวลาไปเดินเลือกซื้อเหมือนเมื่อก่อน"
          </div>
        </div>
      ),
    },
    { id: 2, content: "Box 2" },
    { id: 3, content: "Box 3" },
    { id: 4, content: "Box 4" },
    { id: 5, content: "Box 5" },
    { id: 6, content: "Box 6" },
    { id: 7, content: "Box 7" },
    { id: 8, content: "Box 8" },
  ];

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev >= boxes.length - 2 ? 0 : prev + 2));
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev === 0 ? boxes.length - 2 : prev - 2));
  };

  return (
    <div className="bg-gray-200 w-full">
      <div className="bg-black py-4 text-white text-xl font-semibold text-center">
        Review ลูกค้า
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-8 p-4">
          {/* Previous button */}
          <button
            onClick={prevSlide}
            className="p-2 text-2xl font-bold hover:bg-gray-100 rounded-full"
            aria-label="Previous slide"
          >
            ⟪
          </button>

          {/* Boxes container */}
          <div className="overflow-hidden" style={{ width: "800px" }}>
            <div
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{
                transform: `translateX(-${currentIndex * 50}%)`,
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-6 p-6 bg-[#555D50] rounded-xl shadow-lg max-w-xs w-full"
                >
                  <div className="flex items-center space-x-6">
                    <div className="border-4 border-red-400 rounded-full overflow-hidden">
                      <img
                        src={
                          review.profileImage ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjT6GQmlhJbTxGAZJMqjF6OiK9wdRPskxMg&s"
                        }
                        className="w-20 h-20 object-cover"
                        alt="profile"
                      />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                      <div className="font-bold text-lg text-white">
                        {review.name || "Anonymous"}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-white text-base font-bold">
                          Rate
                        </div>
                        {/* Render stars dynamically based on rating */}
                        {renderStars(review.rating || 3.5)}
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-lg">
                    "{review.comment || "No comment provided"}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={nextSlide}
            className="p-2 text-2xl font-bold hover:bg-gray-100 rounded-full"
            aria-label="Next slide"
          >
            ⟫
          </button>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-4 pb-4">
          {Array.from({ length: Math.ceil(boxes.length / 2) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 2)}
                className={`w-3 h-3 rounded-full ${
                  Math.floor(currentIndex / 2) === index
                    ? "bg-blue-500"
                    : "bg-gray-900"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to render stars based on rating
const renderStars = (rating: number): React.ReactNode => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <i
          key={`full-${i}`}
          className="fas fa-star text-yellow-500 text-sm"
        ></i>
      ))}
      {halfStar > 0 && (
        <i className="fas fa-star-half-alt text-yellow-500 text-sm"></i>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="far fa-star text-gray-400 text-sm"></i>
      ))}
    </>
  );
};

export default ReviewSlider;
