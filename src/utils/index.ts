import moment from "moment";
import "moment-timezone";
import { UserProps } from "../auth/auth";
import { QuoteProps } from "../components/Card/RequestCard";

export const dummyData = [
  {
    name: "눈",
    id: "eyes",
    subCategories: [
      { name: "쌍커풀", id: "double_eyelid", textId: "eyes.doubleEyelid" },
      { name: "트임", id: "slit_surgery", textId: "eyes.slitSurgery" },
      {
        name: "안검하수",
        id: "eye_shape_correction",
        textId: "eyes.eyeShapeCorrection",
      },
    ],
    textId: "eyes",
  },
  {
    name: "코",
    id: "nose",
    subCategories: [
      { name: "높은코", id: "rhinoplasty", textId: "nose.rhinoplasty" },
      {
        name: "콧볼축소",
        id: "alar_base_reduction",
        textId: "nose.alarBaseReduction",
      },
      { name: "코재수술", id: "nose_re_surgery", textId: "nose.noseReSurgery" },
    ],
    textId: "nose",
  },
  {
    name: "안면윤곽",
    id: "facial_contouring",
    subCategories: [
      {
        name: "사각턱축소",
        id: "square_jaw_reduction",
        textId: "facialContouring.squareJawReduction",
      },
      {
        name: "양악수술",
        id: "orthognathic_surgery",
        textId: "facialContouring.orthognathicSurgery",
      },
      {
        name: "윤곽수술",
        id: "outline_surgery",
        textId: "facialContouring.outlineSurgery",
      },
    ],
    textId: "facialContouring",
  },
  {
    name: "가슴",
    id: "breast",
    subCategories: [
      {
        name: "가슴확대술",
        id: "breast_enlargement_surgery",
        textId: "breast.breastEnlargementSurgery",
      },
      {
        name: "처진가슴 교정술",
        id: "breast_lift",
        textId: "breast.breastLift",
      },
      {
        name: "가슴 재수술",
        id: "breast_re_surgery",
        textId: "breast.breastReSurgery",
      },
    ],
    textId: "breast",
  },
  {
    name: "지방흡입",
    id: "liposuction",
    subCategories: [
      { name: "팔뚝", id: "arm", textId: "liposuction.arm" },
      { name: "복부", id: "abdomen", textId: "liposuction.abdomen" },
      {
        name: "허벅지/엉덩이",
        id: "thigh_hip",
        textId: "liposuction.thighHip",
      },
    ],
    textId: "liposuction",
  },
  {
    name: "지방이식",
    id: "fat_grafting",
    subCategories: [
      { name: "이마", id: "forehead", textId: "fatGrafting.forehead" },
      { name: "볼", id: "cheek", textId: "fatGrafting.cheek" },
      {
        name: "눈밑지방 재배치",
        id: "trans_conjunctiva",
        textId: "fatGrafting.transConjunctiva",
      },
    ],
    textId: "fatGrafting",
  },
  {
    name: "피부",
    id: "skin",
    subCategories: [
      { name: "잡티", id: "blemish", textId: "skin.blemish" },
      { name: "미백관리", id: "whitening_care", textId: "skin.whiteningCare" },
      {
        name: "써마지/울쎼라",
        id: "thermage_ulcera",
        textId: "skin.thermageUlcera",
      },
    ],
    textId: "skin",
  },
  {
    name: "쁘띠",
    id: "petit",
    subCategories: [
      { name: "보톡스", id: "botox", textId: "petit.botox" },
      { name: "필러", id: "filler", textId: "petit.filler" },
      { name: "리프팅", id: "lifting", textId: "petit.lifting" },
    ],
    textId: "petit",
  },
  {
    name: "입",
    id: "mouth",
    subCategories: [
      { name: "입술", id: "lip", textId: "mouth.lip" },
      { name: "입꼬리", id: "lip_tail", textId: "mouth.lipTail" },
      { name: "인중", id: "philtrum", textId: "mouth.philtrum" },
    ],
    textId: "mouth",
  },
  {
    name: "치아/시력",
    id: "tooth_eyesight",
    subCategories: [
      {
        name: "치아교정",
        id: "orthodontics",
        textId: "toothEyesight.orthodontics",
      },
      {
        name: "시력교정",
        id: "vision_correction",
        textId: "toothEyesight.visionCorrection",
      },
    ],
    textId: "toothEyesight",
  },
];

export const phoneLocaleList = [
  { icon: "🇨🇳", value: "+86" },
  { icon: "🇰🇷", value: "+82" },
];

export const parseQuery = (queryString: string) => {
  var query: { [id: string]: any } = {};
  var pairs = (
    queryString[0] === "?" ? queryString.substr(1) : queryString
  ).split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
};

export const isUserSignedIn = (user: UserProps) =>
  Object.keys(user).length !== 0;

export const PENDING = "PENDING";
export const RESPONDED = "RESPONDED";
export const MATCHED = "MATCHED";
export const REJECTED = "REJECTED";

export const getKstDate = (ts: number) => {
  const m = moment(ts);
  const date = m.tz("Asia/Seoul").format("MM/DD");
  return date;
};

export const getKstTime = (ts: number) => {
  const m = moment(ts);
  const time = m.tz("Asia/Seoul").format("HH:mm");
  return time;
};

export const getKstDatetime = (ts: number) => {
  const date = getKstDate(ts);
  const time = getKstTime(ts);
  return `${time} (KST), ${date}`;
};

export const getInterestedProcsFromQuote = (quote: QuoteProps[]) =>
  quote.map((item) => item.categoryId);

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const msOneDay = 1000 * 60 * 60 * 24;
export const msOneHour = 1000 * 60 * 60;

export const getCstFullDatetimeString = (ts: number) => {
  const m = moment(ts);
  const date = m.tz("Asia/Shanghai").format("HH:mm, dddd, MMM Do");
  return date;
};
