import glass from "../assets/glass.png";
import greenTea from "../assets/green-tea.png";
import tea from "../assets/tea.png";
import phone from "../assets/phone.png";

const Homebanner = () => {
  return (
    <div className="h-full w-full flex flex-col px-[45px] py-[25px] gap-2.5 md:flex-row  text-xl space-y-2.5 md:space-y-0 md:space-x-2.5 ">
      {/* Left Section */}
      <div className="w-full h-full flex flex-col gap-2.5 md:w-2/3  space-y-2.5 ">
        <div className="grid grid-cols-2 gap-5 h-full">
          {/* Box 1 */}
          <div className="h-full bg-[#556B2F]   p-4 pr-0 pb-0 flex flex-col justify-between shadow-md hover:scale-110 transition duration-300 ">
            <p className="text-white font-semibold">ชิมชาใน ขนาดทดลอง 40 ก.</p>
            <img
              src={greenTea}
              className="h-[230px] ml-auto"
              alt="Sample tea 40g"
            />
          </div>
          {/* Box 2 */}
          <div className=" h-full bg-[#A9A454]   p-4 pr-0 pb-0 flex flex-col justify-between shadow-md hover:scale-110 transition duration-300">
            <p className="text-white font-semibold">
              คัดสรรชาใหม่ๆ ให้คุณชิมไม่มีเบื่อ
            </p>
            <img
              src={glass}
              className=" ml-auto mt-auto"
              alt="Curated tea selection"
            />
          </div>
        </div>
        {/* Bottom Row */}
        <div className=" h-full bg-[#12390e] flex-1  p-4 pb-0 flex flex-col justify-between shadow-md hover:scale-110 transition duration-300">
          <p className="text-white font-semibold">4 โรงอบในกล่องเดียว</p>
          <img src={tea} className="ml-auto mt-auto" alt="4 tea packages" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col  w-full h-auto md:w-1/3  bg-[#05450a] pl-4 pt-4  justify-between shadow-md  hover:scale-110 transition duration-300">
        <p className="text-white font-semibold">
          แนะนำชาให้ คุณโดยเฉพาะ ใน 1 นาที
        </p>
        <img
          src={phone}
          className=" ml-auto mt-auto"
          alt="Personalized tea recommendation"
        />
      </div>
    </div>
  );
};

export default Homebanner;
