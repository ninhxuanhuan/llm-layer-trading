import { Bar } from "./types";
import Axios from "axios";
import {
  throttleAdapterEnhancer,
  retryAdapterEnhancer,
} from "axios-extensions";

const AXIOS_TIMEOUT = 10000;
const AXIOS_THROTTLE_THRESHOLD = 2000;
const axios = Axios.create({
  timeout: AXIOS_TIMEOUT,
  retryTimes: 3,
  // cache will be enabled by default in 2 seconds
  adapter: retryAdapterEnhancer(
    throttleAdapterEnhancer(Axios.defaults.adapter!, {
      threshold: AXIOS_THROTTLE_THRESHOLD,
    })
  ),
  baseURL: "http://18.219.50.243:3005",
});

const convertData = (data) => {
  const result = data.map((item) => {
    return {
      volume: 7705817802,
      time: new Date(item[0]).getTime()/1000,
      open: parseInt(item[1]) / 1000000000,
      high: parseInt(item[2]) / 1000000000,
      low: parseInt(item[3]) / 1000000000,
      close: parseInt(item[4]) / 1000000000,
    };
  });
  return result;
};

interface IParams {
  tokenId: string,
  duringPeriod?: number,
  resolution?: string
}

export const getTokenChartPrice = async ({
  tokenId,
  duringPeriod = 30,
  resolution = "240",
}: IParams): Promise<Bar[]> => {
  const hours =  parseInt(resolution) / 60 ;
  let chartTime = "";
  if (hours == 24) chartTime = "1 day";
  else chartTime = parseInt(resolution) / 60 + " hours";
  try {
    const res = await axios.get("/gecko/ohlc", {
      params: {
        id: tokenId,
        duringPeriod,
        chartTime,
      },
    });
    return convertData(res.data.chartDatas);
  } catch (e) {
    console.error("GetTokenChartPrice", e);
    return [];
  }
};
//http://18.219.50.243:3005/gecko/ohlc?id=tether-pulsechain&duringPeriod=4&chartTime=4%20hours
