"use client";
import React, { useState } from "react";

const Ranking = () => {
  const Tabs = ["Trending", "Top", "Watchlist"];
  const [currentTab, setCurrentTab] = useState(Tabs[0]);
  return (
    <div className="flex flex-col w-full h-full pt-[100px] px-4 gap-[32px] overflow-y-auto">
      <h1 className="md:text-[48px] md:leading-[48px] text-[28px] leading-7 font-bold ">
        Collection stats
      </h1>
      <div className="flex flex-row gap-2 w-full pb-6 border-b-[2px]">
        {Tabs.map((tab: string, index: number) => (
          <div
            key={index}
            className={`font-semibold text-[20px] px-3 py-2 ${
              tab == currentTab && "bg-black text-white"
            } rounded-xl cursor-pointer`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
