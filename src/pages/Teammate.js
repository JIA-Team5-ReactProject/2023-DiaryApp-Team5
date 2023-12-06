import Mate from "../components/Mate.js";
import { useState } from "react";
import kim from "../assets/kim.jpg";
import hyen from "../assets/hyen.jpg";
import hoon from "../assets/hoon.jpg";
import ji from "../assets/ji.jpg";
import min from "../assets/min.jpg";

export default function Teammate() {
  const teammate = [
    {
      id: 5,
      name: "김지훈",
      img: hoon,
      ability: "야만족",
      bio: "미개하고 엄청나다.",
      github: "https://github.com/Jhoon00",
      atk: 1000,
      def: 2000,
    },
    {
      id: 2,
      name: "김 현",
      img: hyen,
      ability: "고스트라이더 / 효과",
      bio: "위 인물이 오토바이를 탔을 때, 일정 확률로 묘지로 간다.",
      github: "https://github.com/Hyn2",
      atk: 2500,
      def: 100,
    },
    {
      id: 3,
      name: "권지훈",
      img: ji,
      ability: "편돌이 / 효과",
      bio: "위 인물이 알바를 했을 때, 최저시급도 못 받는다.",
      github: "https://github.com/jihun1844",
      atk: 1500,
      def: 1500,
    },
    {
      id: 4,
      name: "이민혁",
      img: min,
      ability: "야수족 / 효과",
      bio: "위 인물이 관음을 할 때, 기분이 좋아진다.",
      github: "https://github.com/jeongwonkimo3o",
      atk: 1000,
      def: 3000,
    },
    {
      id: 1,
      name: "김정원",
      img: kim,
      ability: "김씨일가 / 효과",
      bio: "위 인물이 정권을 잡았을 때, 그 누구도 거스를 수 없다.",
      github: "https://github.com/jeongwonkimo3o",
      atk: 3000,
      def: 3000,
    },
  ];

  return (
    <div className="my-16 flex flex-col items-center">
      <div className="my-5">
        <h1 className="text-4xl font-serif">조원</h1>
      </div>
      <div className="flex gap-20 justify-center w-full flex-wrap-reverse flex-row-reverse">
        {teammate.map((teammate) => (
          <Mate
            key={teammate.id}
            name={teammate.name}
            img={teammate.img}
            abiliy={teammate.ability}
            bio={teammate.bio}
            ATK={teammate.atk}
            DEF={teammate.def}
            github={teammate.github}
          />
        ))}
      </div>
    </div>
  );
}
