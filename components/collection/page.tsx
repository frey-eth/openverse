import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import TrendingCard from "../commons/card/TrendingCard";
import { CollectionProps } from "@/types/global";

type CollectionsProps = {
  title: string;
  collections: CollectionProps[];
};

const Collection = ({ title, collections }: CollectionsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-xl">{title}</h1>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          className="h-[300px] w-full"
          navigation
          scrollbar={{ draggable: true }}
          slidesPerView={1.2}
          autoplay={{ delay: 1000 }}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 3,

              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
          }}
        >
          {collections.map((collection, index) => (
            <SwiperSlide className="max-w-[300px]" key={index}>
              <TrendingCard {...collection} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Collection;
