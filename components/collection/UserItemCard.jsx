"use client";
import Image from "next/image"
import Carousel from "@components/Carousel"

const   ItemCard = ({userItem}) => {
  return (
    <label
      className={`bg-white shadow-2xl pl-8 pr-8 pt-0 m-8 rounded-lg h-96 flex flex-col items-center justify-center`}
      id="item_card"
    >
      <div className=" flex flex-col justify-center items-center">
        <div className='collection_card  h-3/4 mr-2 shadow-inner p-2'>
              <Carousel slides={userItem.itemImages}/>
        </div>
        <div className="m-4 p-4 bg-white flex flex-col justify-start items-start w-full h-1/4 relative  ">
          <div>
            <label htmlFor="" className="font-bold">Model:</label>
            <p>
              {userItem?.item?.model}
            </p>
          </div>
          <div>
            <label htmlFor="" className="font-bold">Year:</label>
            <p>
              {userItem?.item?.year}
            </p>
          </div>
        </div>
      </div>
    </label>
  );
};
export default ItemCard;
