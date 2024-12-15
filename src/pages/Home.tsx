import { useEffect, useState } from "react";
import Homebanner from "../components/Homebanner";
import Blog from "../components/Blog";
import Bgcover from "../assets/Backgroundcover.svg";
import Footer from "../components/Footer";

interface DataForApi {
  selection: string;
  level: string;
  Type: string;
  Type2: {
    healthy: string;
    sweetness: string;
    body: string;
  };
}

interface Ratings {
  healthy: number;
  sweetness: number;
  body: number;
}

const Home = () => {
  const [modalSelection, setModalSelection] = useState(false);
  const [modalLevel, setModalLevel] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [modalRatings, setModalRatings] = useState(false);
  // const [modalIntermediate, setModalIntermediate] = useState(false);
  const [dataForApi, setDataForApi] = useState<DataForApi>({
    selection: "",
    level: "",
    Type: "",
    Type2: {
      healthy: "",
      sweetness: "",
      body: "",
    },
  });

  useEffect(() => {
    console.log("aaa", dataForApi);
  }, [dataForApi]);

  const experSelecctness = [
    {
      id: "beginner",
      icon: "👉",
      title: "มือใหม่",
      description: "ฉันพึ่งเริ่มดื่มชาไม่นาน และกำลังหาสิ่งที่ใช่สำหรับฉัน",
    },
    {
      id: "intermediate",
      icon: "✌️",
      title: "มือสมัครเล่น",
      description: "ฉันเคยดื่มมาบ้าง และมีกลิ่นที่ชอบ",
    },
    {
      id: "advanced",
      icon: "👍",
      title: "มือดี",
      description: "ฉันเริ่มดื่มชามาสักพักแล้ว และมีรส , กลิ่น ประจำอยู่แล้ว",
    },
    {
      id: "expert",
      icon: "🤘",
      title: "มือโปร",
      description: "ฉันดื่มชา และเบลนด์ชาเป็นประจำ",
    },
  ];

  const experSelecct = [
    {
      id: 'Refreshing',
      icon: '🍋',
      title: 'Refreshing & Acidity',
      description: 'ความเข้มข้นของชาเบลนด์ ให้ความสดชื่น และกำลังหาสิ่งที่ใช่สำหรับฉัน',
    },
    {
      id: 'Clean',
      icon: '🍯',
      title: 'Clean & Sweet',
      description: 'ชาเบลนด์รสชาติสะอาด หวานละมุนบางๆ',
    },
    {
      id: 'Balanced',
      icon: '⚖️',
      title: 'Balanced',
      description: 'ชาเบลนด์รสชาติกำลังดี ทั้งเปรี้ยว หวาน เข้ม ในแก้วเดียว',
    },
    {
      id: 'Relax',
      icon: '🍵',
      title: 'Relax',
      description: 'ชาเบลนด์ที่มีกลิ่น หอม ผ่อนคลาย',
    },
  ];

  const [ratings, setRatings] = useState<Ratings>({
    healthy: 0,
    sweetness: 0,
    body: 0,
  });

  const handleRating = (category: keyof typeof ratings, value: number) => {
    // อัปเดตคะแนนใน state ratings
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: value,
    }));

    // อัปเดตค่าใน dataForApi.Type2 สำหรับ healthy
    if (category === "healthy") {
      setDataForApi((prevData) => ({
        ...prevData,
        Type2: {
          ...prevData.Type2,
          healthy: value.toString(), // แปลงเป็น string เพื่อความเข้ากัน
        },
      }));
    }

    if (category === "sweetness") {
      setDataForApi((prevData) => ({
        ...prevData,
        Type2: {
          ...prevData.Type2,
          sweetness: value.toString(), // แปลงเป็น string เพื่อความเข้ากัน
        },
      }));
    }

    if (category === "body") {
      setDataForApi((prevData) => ({
        ...prevData,
        Type2: {
          ...prevData.Type2,
          body: value.toString(), // แปลงเป็น string เพื่อความเข้ากัน
        },
      }));
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center pl-20 bg-fixed bg-cover bg-center min-h-screen min-w-screen">
        <img
          src={Bgcover}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          alt="background image cover"
        />
        <div className="me-8 flex flex-col text-left sm:justify-center">
          <h1 className="text-xl w-37 font-semibold text-white">
            อยากรู้ไหมว่าคุณเหมาะกับชาแบบไหน ?
          </h1>
          <br />
          <button
            onClick={() => setModalSelection(true)}
            className="px-4 py-2 rounded-full bg-red-500 text-white w-28 h-10"
          >
            เริ่มเลย
          </button>
        </div>
      </div>
      <Homebanner />
      <Blog />

      {/* modalSelection */}
      {modalSelection && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => {
            setModalSelection(false); // ปิด modal
            window.location.reload(); // รีโหลดหน้าเว็บ
          }}
        >
          <div
            // className="bg-gray-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full relative"
            className="bg-gray-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full relative h-[95vh] overflow-auto"

            onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกภายใน modal
          >
            <h1 className="text-center text-2xl font-bold mb-6">
              โปรดเลือกสินค้าที่คุณต้องการ
            </h1>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">โปรดระบุใบชา</h2>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="bg-white p-12 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
                  onClick={() => {
                    setModalSelection(false);
                    setModalLevel(true);
                    setDataForApi((prevState) => ({
                      ...prevState,
                      selection: "ชาเขียว", // อัปเดตค่า selection
                    }));
                  }}
                >
                  <img
                    src="./src/assets/Green-tea-powder.jpg"
                    alt="ชาเขียว"
                    className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                  />
                  <p className="text-center font-medium">ชาเขียว</p>
                </div>
                <div
                  className="bg-white p-12 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
                  onClick={() => {
                    setModalSelection(false);
                    setModalLevel(true);
                    setDataForApi((prevState) => ({
                      ...prevState,
                      selection: "ชาดำ", // อัปเดตค่า selection
                    }));
                  }}
                >
                  <img
                    src="./src/assets/Black-tea.jpg"
                    alt="ชาดำ"
                    className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                  />
                  <p className="text-center font-medium">ชาดำ</p>
                </div>
                <div
                  className="bg-white p-12 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
                  onClick={() => {
                    setModalSelection(false);
                    setModalLevel(true);
                    setDataForApi((prevState) => ({
                      ...prevState,
                      selection: "ชาอู่หลง", // อัปเดตค่า selection
                    }));
                  }}
                >
                  <img
                    src="./src/assets/Oolong-tea.jpg"
                    alt="ชาอู่หลง"
                    className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                  />
                  <p className="text-center font-medium">ชาอู่หลง</p>
                </div>
                <div
                  className="bg-white p-12 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
                  onClick={() => {
                    setModalSelection(false);
                    setModalLevel(true);
                    setDataForApi((prevState) => ({
                      ...prevState,
                      selection: "ชาขาว", // อัปเดตค่า selection
                    }));
                  }}
                >
                  <img
                    src="./src/assets/White-tea.jpg"
                    alt="ชาขาว"
                    className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                  />
                  <p className="text-center font-medium">ชาขาว</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">ผลิตภัณฑ์สำเร็จรูป</h2>
              <div className="grid grid-cols-2 gap-4">
                <a href="/products">
                  <div
                    className="bg-white p-12 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
                    onClick={() => {
                      setModalSelection(false);
                    }}
                  >
                    <img
                      src="./src/assets/finishedProduct.webp"
                      alt="ชาเบลนด์สำเร็จรูปแบบชง"
                      className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                    />
                    <p className="text-center font-medium">ชาเบลนด์สำเร็จรูปแบบชง</p>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* modalLevel */}
      {modalLevel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => {
            setModalLevel(false); // ปิด modal
            window.location.reload(); // รีโหลดหน้าเว็บ
          }}
        >
          <div
            className="bg-gray-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกภายใน modal
          >
            <div className="bg-gray-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full">
              <h1 className="text-center text-2xl font-bold mb-6">
                คุณมีประสบการณ์ในระดับไหน?
              </h1>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">ระดับประสบการณ์</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    key={experSelecctness[0].id}
                    onClick={() => {
                      setModalLevel(false);
                      setModalType(true);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        level: "beginner", // อัปเดตค่า level
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {experSelecctness[0].icon}
                      </span>
                      <h3 className="font-semibold">
                        {experSelecctness[0].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecctness[0].description}
                    </p>
                  </div>
                  <div
                    key={experSelecctness[1].id}
                    onClick={() => {
                      setModalLevel(false);
                      setModalType(true);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        level: "intermediate", // อัปเดตค่า level
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {experSelecctness[1].icon}
                      </span>
                      <h3 className="font-semibold">
                        {experSelecctness[1].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecctness[1].description}
                    </p>
                  </div>
                  <div
                    key={experSelecctness[2].id}
                    onClick={() => {
                      setModalLevel(false);
                      setModalRatings(true);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        level: "advanced", // อัปเดตค่า level
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {experSelecctness[2].icon}
                      </span>
                      <h3 className="font-semibold">
                        {experSelecctness[2].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecctness[2].description}
                    </p>
                  </div>
                  <div
                    key={experSelecctness[3].id}
                    onClick={() => {
                      setModalLevel(false);
                      setModalRatings(true);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        level: "expert", // อัปเดตค่า level
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {experSelecctness[3].icon}
                      </span>
                      <h3 className="font-semibold">
                        {experSelecctness[3].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecctness[3].description}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* modalType */}
      {modalType && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => {
            setModalType(false); // ปิด modal
            window.location.reload(); // รีโหลดหน้าเว็บ
          }}
        >
          <div
            className="bg-gray-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกภายใน modal
          >
            <div className="bg-gray-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full">
              <h1 className="text-center text-2xl font-bold mb-6">
                เริ่มง่ายๆ กับ ลักษณะชาที่คุณชอบ
              </h1>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">ลักษณะชา</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    key={experSelecct[0].id}
                    onClick={() => {
                      setModalType(false);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        Type: "Refreshing", // อัปเดตค่า Type
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {experSelecct[0].icon}
                      </span>
                      <h3 className="font-semibold">
                        {experSelecct[0].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecct[0].description}
                    </p>
                  </div>
                  <div
                    key={experSelecct[1].id}
                    onClick={() => {
                      setModalType(false);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        Type: "Clean", // อัปเดตค่า Type
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {experSelecct[1].icon}
                      </span>
                      <h3 className="font-semibold">
                        {experSelecct[1].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecct[1].description}
                    </p>
                  </div>
                  <div
                    key={experSelecct[2].id}
                    onClick={() => {
                      setModalType(false);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        Type: "Balanced", // อัปเดตค่า Type
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {experSelecct[2].icon}
                      </span>
                      <h3 className="font-semibold">
                        {experSelecct[2].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecct[2].description}
                    </p>
                  </div>
                  <div
                    key={experSelecct[3].id}
                    onClick={() => {
                      setModalType(false);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        Type: "Relax", // อัปเดตค่า Type
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {experSelecct[3].icon}
                      </span>
                      <h3 className="font-semibold">
                        {experSelecct[3].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecct[3].description}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* modalRatings */}
      {modalRatings && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => {
            setModalRatings(false); // ปิด modal
            window.location.reload(); // รีโหลดหน้าเว็บ
          }}
        >
          <div
            className="bg-gray-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกภายใน modal
          >
            <div className="bg-gray-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full">
              <h1 className="text-center text-2xl font-bold mb-10">
                เริ่มง่ายๆ กับ ลักษณะชาเบลนด์ที่คุณชอบ
              </h1>

              <div className="grid grid-cols-1 gap-8 mb-12">
                {[
                  { label: "สุขภาพ", category: "healthy", translation: "Healthy" },
                  { label: "ความหวาน", category: "sweetness", translation: "Sweetness" },
                  { label: "ความเข้ม", category: "body", translation: "Body" },
                ].map(({ label, category, translation }) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="text-left w-36">
                      <p className="text-lg font-medium">{label}</p>
                      <p className="text-sm text-gray-500">{translation}</p>
                    </div>
                    <div className="flex space-x-4">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          className={`w-12 h-12 text-3xl flex justify-center items-center rounded-full ${ratings[category as keyof Ratings] >= value
                            ? "bg-yellow-400 text-white"
                            : "bg-gray-200 text-gray-400"
                            } hover:bg-yellow-500 hover:scale-105 transition-transform duration-200`}
                          onClick={() => handleRating(category as keyof Ratings, value)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-8">
                <button className="px-6 py-3 bg-gray-800 text-white rounded-md text-lg font-semibold hover:bg-gray-700 hover:scale-105 transition-transform duration-200">
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
};

export default Home;