import React, { useState } from "react";

// According to https://github.com/kidjp85/react-id-swiper/issues/477,
// we shall import below nasty scripts:
import Swiper from "react-id-swiper";
import "swiper/swiper.scss";
import "swiper/components/a11y/a11y.scss";
import "swiper/components/controller/controller.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/effect-cube/effect-cube.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/lazy/lazy.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/thumbs/thumbs.scss";
import "swiper/components/zoom/zoom.scss";

import SwiperCore, {
  Virtual,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Parallax,
  Zoom,
  Lazy,
  Controller,
  A11y,
  History,
  HashNavigation,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  Thumbs,
} from "swiper";

import "./CalendarCarousel.scss";
import swiper_next_icon from "../../images/swiper-next-icon.svg";
import { dayNames, monthNames, msOneDay } from "../../utils";

SwiperCore.use([
  Virtual,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Parallax,
  Zoom,
  Lazy,
  Controller,
  A11y,
  History,
  HashNavigation,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  Thumbs,
]);

interface DateButtonProps {
  date: string;
  month: string;
  day: string;
  onClickHandler?: () => void;
  isSelected: boolean;
}

const DateButton = (props: DateButtonProps) => {
  return (
    <div
      className={`date-button-container swiper-slide ${
        props.isSelected ? "selected" : ""
      }`}
      onClick={props.onClickHandler}
    >
      <div className="date-button-date">{props.date}</div>
      <div className="date-button-month">{props.month}</div>
      <div className="date-button-day">{props.day}</div>
    </div>
  );
};

interface DateProps {
  date: string;
  setFullDate: (d: string) => void;
  setDate: (d: string) => void;
}

const CalendarCarousel = (props: DateProps) => {
  const [slideKey, setSlideKey] = useState("1");
  const swiperParams = {
    slidesPerView: 4,
    spaceBetween: 8,
    activeSlideKey: slideKey,
    centeredSlides: true,
    navigation: {
      nextEl: ".calendar-carousel-swiper-button-next",
      prevEl: ".calendar-carousel-swiper-button-prev",
    },
    renderNextButton: () => (
      <img
        className="swiper-button-next calendar-carousel-swiper-button-next"
        src={swiper_next_icon}
        alt="swiper-next-button-icon"
      />
    ),
    renderPrevButton: () => (
      <img
        className="swiper-button-prev calendar-carousel-swiper-button-prev"
        src={swiper_next_icon}
        alt="swiper-prev-button-icon"
      />
    ),
  };

  const todayTs = new Date().getTime();
  const timeRange = [...new Array(3).keys()].map((i) => todayTs + i * msOneDay);

  const dateButtonClickHandler = (d: string, fd: string, i: number) => {
    props.setDate(d);
    props.setFullDate(fd);
    setSlideKey(i.toString());
  };

  return (
    <div className="calendar-carousel-container">
      <Swiper {...swiperParams}>
        {timeRange.map((ts, ind) => {
          const t = new Date(ts);
          const d = t.getDate().toString();
          const m = (t.getMonth() + 1).toString();
          const yyyy = t.getFullYear().toString();
          const dd = ("0" + d).slice(-2);
          const mm = ("0" + m).slice(-2);
          const fd = `${yyyy}-${mm}-${dd}`;
          return (
            <DateButton
              date={t.getDate().toString()}
              key={ind.toString()}
              month={monthNames[t.getMonth() + 1].slice(0, 3)}
              day={dayNames[t.getDay()].slice(0, 3).toUpperCase()}
              isSelected={props.date === d}
              onClickHandler={() => dateButtonClickHandler(d, fd, ind)}
            />
          );
        })}
      </Swiper>
    </div>
  );
};

export default CalendarCarousel;
