import { useEffect, useState } from "react";
import Homebanner from "../components/Homebanner";
import Blog from "../components/Blog";
import Bgcover from "../assets/Backgroundcover.svg";
// import SolutionAi from "../components/SolutionAi";
import arrowleft from "../assets/green-tea.png";
import productboxAi from "../assets/productboxAi.png";
// import CustomProduct from "./CustomProduct";
import greenTea from "../assets/greenTea-p.jpg";
import blackTea from "../assets/blackTea-p.jpg";
import oolongTea from "../assets/oolongTea-p.jpg";
import whiteTea from "../assets/whiteTea-p.jpg";


interface DataForApi {
  selection: string;
  level: string;
  Type: string;
  Type2: {
    healthy: string;
    sweetness: string;
    body: string;
  };
  product: string;
}

interface Type2 {
  healthy: string;
  sweetness: string;
  body: string;
}

interface Ratings {
  healthy: number;
  sweetness: number;
  body: number;
}

interface TeaVariety {
  name: string; // ชื่อของชาในแต่ละประเภท
}

interface TeaSubCategory {
  name: string; // ชื่อของกลุ่มย่อย เช่น Refreshing
  varieties: TeaVariety[]; // รายการชาภายใต้กลุ่มย่อย
}

interface TeaCategory {
  name: string; // ชื่อประเภทชา เช่น Green-tea
  subcategories: TeaSubCategory[]; // รายการกลุ่มย่อย
}

interface Tea {
  healthy: number;
  sweetness: number;
  body: number;
  name: string;
}

interface TeaRatings {
  "Green-tea": Tea[];
  "Black-tea": Tea[];
  "Oolong-tea": Tea[];
  "White-tea": Tea[];
  random: {
    "Green-tea": { name: string }[];
    "Black-tea": { name: string }[];
    "Oolong-tea": { name: string }[];
    "White-tea": { name: string }[];
  };
}

const Home = () => {
  const [modalSelection, setModalSelection] = useState(false);
  const [modalLevel, setModalLevel] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [modalRatings, setModalRatings] = useState(false);
  const [modalProduct, setModalProduct] = useState(false);
  const [tempRatings, setTempRatings] = useState<Ratings>({
    healthy: 0,
    sweetness: 0,
    body: 0,
  });

  const [customProduct, setCustomProduct] = useState({
    img: arrowleft,
    teaName: "Green-tea",
  });

  const [dataForApi, setDataForApi] = useState<DataForApi>({
    selection: "",
    level: "",
    Type: "",
    Type2: {
      healthy: "",
      sweetness: "",
      body: "",
    },
    product: "",
  });

  const teaData: TeaCategory[] = [
    {
      name: "Green-tea",
      subcategories: [
        {
          name: "Refreshing",
          varieties: [
            { name: "Ginger Green" },
            { name: "Peach Green" },
            { name: "Tropical Green" },
          ],
        },
        {
          name: "Clean and Sweet",
          varieties: [{ name: "Honey Green" }, { name: "Berry Green" }],
        },
        {
          name: "Balanced",
          varieties: [
            { name: "Autumn Smooth" },
            { name: "Jasmine Green" },
            { name: "Tropical Green" },
          ],
        },
        {
          name: "Relax",
          varieties: [{ name: "Matcha Mint" }],
        },
      ],
    },
    {
      name: "Black-tea",
      subcategories: [
        {
          name: "Refreshing",
          varieties: [
            { name: "Royal Black" },
            { name: "Tropical Black" },
            { name: "Earl Grey Fusion" },
          ],
        },
        {
          name: "Clean and Sweet",
          varieties: [{ name: "Caramel Delight" }, { name: "Spiced Chai" }],
        },
        {
          name: "Balanced",
          varieties: [{ name: "Cocoa Black" }, { name: "Lemon Black" }],
        },
        {
          name: "Relax",
          varieties: [{ name: "Ginger Spice" }],
        },
      ],
    },
    {
      name: "Oolong-tea",
      subcategories: [
        {
          name: "Refreshing",
          varieties: [{ name: "Citrus Oolong" }],
        },
        {
          name: "Clean and Sweet",
          varieties: [{ name: "Almond Oolong" }],
        },
        {
          name: "Balanced",
          varieties: [
            { name: "Oolong Harmony" },
            { name: "Peach Oolong" },
            { name: "Spiced Oolong" },
            { name: "Ginger Oolong" },
          ],
        },
        {
          name: "Relax",
          varieties: [
            { name: "Jasmine Oolong" },
            { name: "Floral Oolong" },
            { name: "Mint Oolong" },
            { name: "Almond Oolong" },
          ],
        },
      ],
    },
    {
      name: "White-tea",
      subcategories: [
        {
          name: "Refreshing",
          varieties: [
            { name: "Ginger Green" },
            { name: "Peach Green" },
            { name: "Tropical Green" },
          ],
        },
        {
          name: "Clean and Sweet",
          varieties: [{ name: "Honey Green" }, { name: "Berry Green" }],
        },
        {
          name: "Balanced",
          varieties: [
            { name: "Autumn Smooth" },
            { name: "Jasmine Green" },
            { name: "Tropical Green" },
          ],
        },
        {
          name: "Relax",
          varieties: [{ name: "Matcha Mint" }, { name: "Honey Green" }],
        },
      ],
    },
  ];

  const teaRating = {
    "Green-tea": [
      { healthy: 2, sweetness: 3, body: 1, name: "Peach Green" },
      { healthy: 2, sweetness: 1, body: 1, name: "Honey Green" },
      { healthy: 2, sweetness: 2, body: 2, name: "Tropical Green" },
      { healthy: 2, sweetness: 2, body: 3, name: "Autumn Smooth" },
      { healthy: 3, sweetness: 1, body: 1, name: "Ginger Green" },
      { healthy: 3, sweetness: 2, body: 2, name: "Jasmine Green" },
      { healthy: 3, sweetness: 3, body: 2, name: "Berry Green" },
    ],
    "Black-tea": [
      { healthy: 1, sweetness: 1, body: 2, name: "Ginger Spice" },
      { healthy: 1, sweetness: 3, body: 2, name: "Caramel Delight" },
      { healthy: 2, sweetness: 3, body: 1, name: "Tropical Black" },
      { healthy: 3, sweetness: 1, body: 2, name: "Earl Grey Fusion" },
      { healthy: 3, sweetness: 2, body: 1, name: "Cocoa Black" },
      { healthy: 3, sweetness: 3, body: 3, name: "Royal Black" },
    ],
    "Oolong-tea": [
      { healthy: 1, sweetness: 2, body: 3, name: "Citrus Oolong" },
      { healthy: 1, sweetness: 3, body: 3, name: "Almond Oolong" },
      { healthy: 2, sweetness: 2, body: 1, name: "Spiced Oolong" },
    ],
    "White-tea": [
      { healthy: 1, sweetness: 1, body: 1, name: "Mint White" },
      { healthy: 1, sweetness: 1, body: 3, name: "Tropical White" },
      { healthy: 1, sweetness: 2, body: 1, name: "Berry Delight" },
      { healthy: 1, sweetness: 2, body: 2, name: "Jasmine Blossom" },
      { healthy: 1, sweetness: 3, body: 1, name: "Moonlight White" },
      { healthy: 2, sweetness: 1, body: 2, name: "Peach White" },
      { healthy: 2, sweetness: 1, body: 3, name: "Lavender Whisper" },
      { healthy: 2, sweetness: 3, body: 2, name: "Vanilla Cream" },
      { healthy: 2, sweetness: 3, body: 3, name: "Coconut Breeze" },
      { healthy: 3, sweetness: 1, body: 3, name: "Lavender Whisper" },
      { healthy: 3, sweetness: 2, body: 3, name: "Citrus White" },
    ],
    random: {
      "Green-tea": [
        { name: "Peach Green" },
        { name: "Honey Green" },
        { name: "Tropical Green" },
        { name: "Autumn Smooth" },
        { name: "Ginger Green" },
        { name: "Matcha Mint" },
        { name: "Jasmine Green" },
        { name: "Berry Green" },
      ],
      "Black-tea": [
        { name: "Ginger Spice" },
        { name: "Caramel Delight" },
        { name: "Spiced Chai" },
        { name: "Lemon Black" },
        { name: "Tropical Black" },
        { name: "Earl Grey Fusion" },
        { name: "Cocoa Black" },
        { name: "Royal Black" },
      ],
      "Oolong-tea": [
        { name: "Citrus Oolong" },
        { name: "Almond Oolong" },
        { name: "Peach Oolong" },
        { name: "Jasmine Oolong" },
        { name: "Spiced Oolong" },
        { name: "Mint Oolong" },
        { name: "Almond Oolong" },
        { name: "Oolong Harmony" },
        { name: "Floral Oolong" },
        { name: "Ginger Oolong" },
      ],
      "White-tea": [
        { name: "Mint White" },
        { name: "Tropical White" },
        { name: "Berry Delight" },
        { name: "Jasmine Blossom" },
        { name: "Moonlight White" },
        { name: "Peach White" },
        { name: "Lavender Whisper" },
        { name: "Vanilla Cream" },
        { name: "Coconut Breeze" },
        { name: "Citrus White" },
        { name: "Coconut Breeze" },
      ],
    },
  };

  const getImageBySelection = (selection: string) => {
    switch (selection) {
      case "Green-tea":
        return greenTea;
      case "Black-tea":
        return blackTea;
      case "Oolong-tea":
        return oolongTea;
      case "White-tea":
        return whiteTea;
      default:
        return "";
    }
  };

  function getRandomTea(dataForApi: DataForApi, teaData: TeaCategory[]) {
    // ค้นหาข้อมูลชาใน teaData ตาม selection
    const selectedTea = teaData.find((tea) => {
      return dataForApi.selection
        .toLowerCase()
        .includes(tea.name.toLowerCase().split("-")[0]); // ตรวจสอบชื่อเช่น Green, Black, Oolong
    });

    if (!selectedTea) {
      return "No matching tea category found.";
    }

    // ค้นหา subcategory ที่ตรงกับ Type
    const selectedSubcategory = selectedTea.subcategories.find(
      (subcategory) => subcategory.name === dataForApi.Type
    );

    if (!selectedSubcategory || !selectedSubcategory.varieties.length) {
      return "No matching tea type found.";
    }

    // สุ่มชาใน varieties
    const randomIndex = Math.floor(
      Math.random() * selectedSubcategory.varieties.length
    );
    const randomTea = selectedSubcategory.varieties[randomIndex];

    return randomTea.name;
  }

  // ฟังก์ชันเพื่อหาชาที่ตรงตามเงื่อนไข
  const getTeaBySelection = (
    selection: string,
    type2: Type2,
    teaRating: TeaRatings
  ): string | undefined => {
    const teaList = teaRating[selection as keyof TeaRatings];

    if (teaList && Array.isArray(teaList)) {
      // ค้นหาชาที่ตรงกับค่า healthy, sweetness, body
      const matchedTea = teaList.find(
        (tea): tea is Tea =>
          typeof tea !== "string" &&
          tea.healthy === Number(type2.healthy) &&
          tea.sweetness === Number(type2.sweetness) &&
          tea.body === Number(type2.body)
      );

      if (matchedTea) {
        return matchedTea.name;
      } else {
        // ถ้าไม่พบข้อมูลที่ตรงกันให้สุ่มจาก random
        const randomCategory = Object.keys(
          teaRating.random
        ) as (keyof typeof teaRating.random)[];
        const randomCategoryIndex = Math.floor(
          Math.random() * randomCategory.length
        );
        const randomTeaCategory = randomCategory[randomCategoryIndex];
        const randomTeaList = teaRating.random[randomTeaCategory];

        if (Array.isArray(randomTeaList) && randomTeaList.length > 0) {
          const randomIndex = Math.floor(Math.random() * randomTeaList.length);
          const randomTea = randomTeaList[randomIndex];

          if (
            randomTea &&
            typeof randomTea === "object" &&
            "name" in randomTea
          ) {
            return randomTea.name; // คืนค่า name ของชา
          }
        }
      }
    }

    return undefined; // คืนค่า undefined ถ้าไม่พบชา
  };

  useEffect(() => {
    if (dataForApi?.product) {
      console.log("=========== input customProduct", dataForApi);
    }
  }, [dataForApi, dataForApi?.product]); // ตรวจสอบว่ามีค่าก่อนทำงาน

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
      id: "Refreshing",
      icon: "🍋",
      title: "Refreshing & Acidity",
      description:
        "ความเข้มข้นของชาเบลนด์ ให้ความสดชื่น และกำลังหาสิ่งที่ใช่สำหรับฉัน",
    },
    {
      id: "Clean",
      icon: "🍯",
      title: "Clean & Sweet",
      description: "ชาเบลนด์รสชาติสะอาด หวานละมุนบางๆ",
    },
    {
      id: "Balanced",
      icon: "⚖️",
      title: "Balanced",
      description: "ชาเบลนด์รสชาติกำลังดี ทั้งเปรี้ยว หวาน เข้ม ในแก้วเดียว",
    },
    {
      id: "Relax",
      icon: "🍵",
      title: "Relax",
      description: "ชาเบลนด์ที่มีกลิ่น หอม ผ่อนคลาย",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // ฟังก์ชันเพื่อหาชาที่ตรงตามเงื่อนไข
  function findTea(
    healthy: number,
    sweetness: number,
    body: number,
    teaRating: TeaRatings
  ): string | undefined {
    // ตรวจสอบชาในแต่ละประเภท
    for (const category in teaRating) {
      if (category !== "random") {
        // ตรวจสอบประเภทของ teaList โดยใช้ keyof TeaRatings
        const teaList = teaRating[category as keyof TeaRatings];

        if (Array.isArray(teaList)) {
          // ตรวจสอบว่า tea เป็น Tea หรือไม่
          for (const tea of teaList) {
            if (
              isTea(tea) &&
              tea.healthy === healthy &&
              tea.sweetness === sweetness &&
              tea.body === body
            ) {
              return tea.name; // คืนค่า name ของชา ถ้าเงื่อนไขตรง
            }
          }
        }
      }
    }

    // ถ้าไม่พบชาในเงื่อนไขที่ตรง ให้สุ่มชา
    const randomCategory = [
      "Green-tea",
      "Black-tea",
      "Oolong-tea",
      "White-tea",
    ];
    const randomCategoryIndex = Math.floor(
      Math.random() * randomCategory.length
    );
    const randomTeaCategory = randomCategory[randomCategoryIndex];
    const randomTeaList = teaRating[randomTeaCategory as keyof TeaRatings];

    if (Array.isArray(randomTeaList) && randomTeaList.length > 0) {
      const randomTeaIndex = Math.floor(Math.random() * randomTeaList.length);

      // คืนค่าเป็นชื่อของชา (tea.name) ซึ่งเป็น string
      const randomTea = randomTeaList[randomTeaIndex];
      if (isTea(randomTea)) {
        return randomTea.name;
      }
    }

    return undefined; // ถ้าไม่มีชาใน randomTeaList หรือไม่สามารถสุ่มชาได้ ให้คืน undefined
  }

  // Type guard เพื่อให้ TypeScript รู้ว่า tea เป็น Tea
  function isTea(tea: Tea | string): tea is Tea {
    return (tea as Tea).healthy !== undefined;
  }

  //แก้ไข 'findTea' is defined but never used. =================================================================================
  //แก้ไข'findTea' is declared but its value is never read. ====================================================================
  const result = findTea(5, 2, 4, teaRating);
  console.log("Selected tea:", result);

  return (
    <>
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
                      selection: "Green-tea", // อัปเดตค่า selection
                    }));
                  }}
                >
                  <img
                    src="./src/assets/Green-tea-powder.jpg"
                    alt="Green-tea"
                    className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                  />
                  <p className="text-center font-medium">Green-tea</p>
                </div>
                <div
                  className="bg-white p-12 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
                  onClick={() => {
                    setModalSelection(false);
                    setModalLevel(true);
                    setDataForApi((prevState) => ({
                      ...prevState,
                      selection: "Black-tea", // อัปเดตค่า selection
                    }));
                  }}
                >
                  <img
                    src="./src/assets/Black-tea.jpg"
                    alt="Black-tea"
                    className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                  />
                  <p className="text-center font-medium">Black-tea</p>
                </div>
                <div
                  className="bg-white p-12 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
                  onClick={() => {
                    setModalSelection(false);
                    setModalLevel(true);
                    setDataForApi((prevState) => ({
                      ...prevState,
                      selection: "Oolong-tea", // อัปเดตค่า selection
                    }));
                  }}
                >
                  <img
                    src="./src/assets/Oolong-tea.jpg"
                    alt="ชาอู่หลง"
                    className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                  />
                  <p className="text-center font-medium">Oolong-tea</p>
                </div>
                <div
                  className="bg-white p-12 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
                  onClick={() => {
                    setModalSelection(false);
                    setModalLevel(true);
                    setDataForApi((prevState) => ({
                      ...prevState,
                      selection: "White-tea", // อัปเดตค่า selection
                    }));
                  }}
                >
                  <img
                    src="./src/assets/White-tea.jpg"
                    alt="ชาขาว"
                    className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                  />
                  <p className="text-center font-medium">White-tea</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">Finished product</h2>
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
                      alt="Instant blended tea"
                      className="w-[185px] h-[96.39px] object-cover rounded mb-2"
                    />
                    <p className="text-center font-medium">
                      Instant blended tea
                    </p>
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
                      setModalProduct(true);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        Type: "Refreshing", // อัปเดตค่า Type
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{experSelecct[0].icon}</span>
                      <h3 className="font-semibold">{experSelecct[0].title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecct[0].description}
                    </p>
                  </div>
                  <div
                    key={experSelecct[1].id}
                    onClick={() => {
                      setModalType(false);
                      setModalProduct(true);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        Type: "Clean & Sweet", // อัปเดตค่า Type
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{experSelecct[1].icon}</span>
                      <h3 className="font-semibold">{experSelecct[1].title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecct[1].description}
                    </p>
                  </div>
                  <div
                    key={experSelecct[2].id}
                    onClick={() => {
                      setDataForApi((prevState) => ({
                        ...prevState,
                        Type: "Balanced", // อัปเดตค่า Type
                      }));

                      const randomTea = getRandomTea(dataForApi, teaData);
                      console.log("123123123123123", randomTea);
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{experSelecct[2].icon}</span>
                      <h3 className="font-semibold">{experSelecct[2].title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {experSelecct[2].description}
                    </p>
                  </div>
                  <div
                    key={experSelecct[3].id}
                    onClick={() => {
                      setModalType(false);
                      setModalProduct(true);
                      setDataForApi((prevState) => ({
                        ...prevState,
                        Type: "Relax", // อัปเดตค่า Type
                      }));
                    }}
                    className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{experSelecct[3].icon}</span>
                      <h3 className="font-semibold">{experSelecct[3].title}</h3>
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
                  {
                    label: "สุขภาพ",
                    category: "healthy",
                    translation: "Healthy",
                  },
                  {
                    label: "ความหวาน",
                    category: "sweetness",
                    translation: "Sweetness",
                  },
                  { label: "ความเข้ม", category: "body", translation: "Body" },
                ].map(({ label, category, translation }) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <div className="text-left w-36">
                      <p className="text-lg font-medium">{label}</p>
                      <p className="text-sm text-gray-500">{translation}</p>
                    </div>
                    <div className="flex space-x-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <button
                          key={index}
                          className={`w-12 h-12 text-3xl flex justify-center items-center rounded-full ${tempRatings[category as keyof Ratings] > index
                              ? "bg-yellow-400 text-white"
                              : "bg-gray-200 text-gray-400"
                            } hover:bg-yellow-500 hover:scale-105 transition-transform duration-200`}
                          onClick={() => {
                            setTempRatings((prevRatings) => ({
                              ...prevRatings,
                              [category]: index + 1, // ให้ดาวเริ่มจาก 1
                            }));
                          }}
                        >
                          ✰
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-8">
                <button
                  onClick={() => {
                    handleRating("healthy", tempRatings.healthy);
                    handleRating("sweetness", tempRatings.sweetness);
                    handleRating("body", tempRatings.body);

                    const selectedTea = getTeaBySelection(
                      dataForApi.selection,
                      dataForApi.Type2,
                      teaRating
                    );

                    setDataForApi((prevState) => ({
                      ...prevState,
                      product: selectedTea || "", // เก็บผลลัพธ์ใน product
                    }));

                    setCustomProduct({
                      img: getImageBySelection(dataForApi.selection),
                      teaName: selectedTea || "",
                    });

                    setModalRatings(false);
                    setModalProduct(true);
                  }}
                  className="px-6 py-3 bg-gray-800 text-white rounded-md text-lg font-semibold hover:bg-gray-700 hover:scale-105 transition-transform duration-200"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modalProduct*/}
      {modalProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => {
            setModalProduct(false); // ปิด modal
            window.location.reload(); // รีโหลดหน้าเว็บ
          }}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-xl max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกภายใน modal
          >
            <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
              ชาเบลนด์ ที่มี taste note เฉพาะคุณ
            </h1>
            <p className="text-center text-lg text-gray-600 mb-6">
              1 กล่อง บรรจุวัตถุดิบชาเบลนด์ 40 g.
            </p>

            <div className="flex justify-around items-center mb-8">
              {/* กล่องสินค้า */}
              <div className="text-center">
                <img src={productboxAi} alt="Product Box" className="w-64 h-auto mb-4" />
                <p className="text-red-700 font-medium">👍 95% พึงพอใจกาแฟที่เราแนะนำ</p>
              </div>

              {/* ชาที่เลือก */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
                {customProduct?.img && (
                  <img
                    src={customProduct.img}
                    alt="Selected Tea"
                    className="w-40 h-40 object-cover mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-800">
                  {customProduct?.teaName || "ไม่พบข้อมูลชา"}
                </h3>
              </div>
            </div>

            <div className="flex justify-between items-center text-center text-gray-600">
              {/* ข้อความอธิบาย */}
              <p className="text-sm max-w-sm">
                ใช้ระบบวิเคราะห์ที่ทันสมัยและแม่นยำเพื่อให้ตรงใจคุณ
              </p>

              {/* ปุ่มและข้อมูลการจัดส่ง */}
              <div className="text-center">
                <p className="text-green-600 font-medium mb-2">จัดส่งฟรี! ทุกออเดอร์</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
                  เพิ่มไปยังตะกร้า $300.00
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  🤟 พร้อมจัดส่งกล่องใหม่ฟรี!! หากไม่พึงพอใจ
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Home;