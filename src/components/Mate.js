export default function Mate({ name, img, bio, github, ATK, DEF, abiliy }) {
  return (
    <div className="basis-1/5 min-w-[305px] flex justify-center items-center  ring-8 ring-[#252436BF] bg-[#B8693E] shadow-lg md:w-1/2 lg:w-1/4">
      <div className="bg-[url('https://i.imgur.com/DNVGE5B.png')] w-full bg-repeat">
        <div className="mx-5 mt-2 flex justify-between items-center shadow-md border-2 px-2 pt-1 rounded-[2px] border-opacity-50  border-t-teal-50 border-l-teal-50  border-b-[#000000] border-r-[#000000]">
          <span className="font-Merriweather font-bold text-lg">{name}</span>
          <span>
            <img
              src="https://static.wikia.nocookie.net/yugioh/images/a/a1/EARTH.svg"
              height="30"
              width="30"
              alt="att"
            />
          </span>
        </div>
        <div className="mx-7 my-1 flex justify-end items-center">
          <span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Starball_Red.svg"
              height="20"
              width="20"
              alt="star"
            />
          </span>
        </div>
        <div className="mx-auto rounded-[1px] ring-4 my-1 h-[260px] w-[260px] shadow-lg shadow-black ring-offset-0 ring-[#808080] ">
          <img className="h-full w-full" src={img} alt="main_image" />
        </div>
        <div className="mx-7 my-1 flex justify-end items-center">
          <span className="text-xs font-bold font-Merriweather my-1">
            <a href={github}>GITHUB</a>
          </span>
        </div>
        <div className="mx-2">
          <div className="bg-[url('https://i.imgur.com/neIKEeX.png')] bg-repeat">
            <div className="bg-slate-200 mx-1 my-2 px-1 ring-4 ring-[#FFC85F] font-Merriweather">
              <h1 className="font-bold">[{abiliy}]</h1>
              <p className="text-[12px] mb-3">{bio}</p>
              <hr className="h-1 bg-black" />
              <div className="flex gap-2 justify-end items-center mt-7">
                <span>ATK/{ATK}</span>
                <span>DEF/{DEF}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2 flex justify-between items-center">
          <span className="text-[9px]">000000</span>
          <span className="text-[9px]">©1996 KAZUKI TAKAHASHI</span>
        </div>
      </div>
    </div>
  );
  // from https://tailwindcomponents.com/component/yugioh-card
}
