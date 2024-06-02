import HeaderCard from "@/components/commons/card/HeaderCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { NFTItemProps } from "@/types/global";

const Highlight = () => {
  const highlightItems: NFTItemProps[] = [
    {
      title: "Atom Solution",
      image: "/images/atom.png",
      price: 0.1,
    },
    {
      title: "The Second Ever",
      image: "/images/demo2.jpg",
      price: 0.2,
    },
    {
      title: "The Third Ever",
      image: "/images/frey.jpg",
      price: 0.3,
    },
    {
      title: "The Third Ever",
      image: "/images/peace.jpg",
      price: 0.3,
    },
    {
      title: "The First Ever",
      image: "/images/demo1.jpg",
      price: 0.1,
    },
    {
      title: "The Second Ever",
      image: "/images/demo2.jpg",
      price: 0.2,
    },
    {
      title: "The Third Ever",
      image: "/images/frey.jpg",
      price: 0.3,
    },
    {
      title: "The Third Ever",
      image: "/images/peace.jpg",
      price: 0.3,
    },
  ];
  return (
    <div className="overflow-hidden px-4">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        className="h-[320px] w-full"
        navigation
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        autoplay={{ delay: 2500 }}
        spaceBetween={30}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 3,

            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {highlightItems.map((item: NFTItemProps, index: number) => (
          <SwiperSlide key={index} className=" max-w)-sm">
            <HeaderCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Highlight;
