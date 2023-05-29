"use client";

import Chart, { ChartDataType } from "@/components/Chart";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Home() {
  type DustData = {
    //필요한 데이터들을 타입으로 정의
    pm10Value: string;
    pm25Value: string;
    dataTime: string;
    stationName: string;
  };
  const { data, isLoading } = useSWR<any>( //데이터를 가져옵니다.
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty", // SWR에서 이 문자열을 key값으로 cache를 생성합니다.
    async () => {
      const url = "/fetch"; //cors를 위해 로컬 url로 fetch하지만 next.config.js에 정의된 실제 url로 변환되어 요청됩니다.
      var queryParams = //필요한 파라미터들을 정의합니다.
        "?" +
        encodeURIComponent("serviceKey") +
        "=" +
        "Ev2XKJ6mZ%2FXC2%2FShb2n7nDfo3W%2FygcDXbZgGy%2BKFJULMrE5NFPtv22T14expqVLWzYHhDuxnj%2F1eSgYPS1papA%3D%3D"; //api키
      queryParams +=
        "&" +
        encodeURIComponent("returnType") +
        "=" +
        encodeURIComponent("json"); //json형태로 수신
      // queryParams +=
      //   "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100");
      // queryParams +=
      //   "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
      queryParams +=
        "&" + encodeURIComponent("sidoName") + "=" + encodeURIComponent("서울");
      queryParams +=
        "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.0");

      return fetch(url + queryParams).then((res) => res.json()); //fetch라인
    }
  );

  const [chartData, setchartData] = useState<ChartDataType>([]); //그래프 컴포넌트로 보내질 값을 저장할 state

  useEffect(() => {
    if (!isLoading) {
      //데이터를 가져오면
      console.log(data.response.body.items);
      const dustData: DustData[] = data.response.body.items;
      const pm10data = dustData.map((el) => ({
        x: el.stationName,
        y: parseInt(el.pm10Value),
      }));
      const pm25data = dustData.map((el) => ({
        x: el.stationName,
        y: parseInt(el.pm25Value),
      }));
      setchartData([
        { id: "pm2.5", data: pm25data }, //pm2.5, pm10 각각 2개의 객체로 정리하여 저장합니다.
        { id: "pm10", data: pm10data },
      ]);
    }
  }, [isLoading]);

  // useEffect(() => {
  //   console.log(chartData);
  // }, [chartData]);

  return (
    <>
      <header className="flex justify-center items-end font-bold text-lg h-[10%] text-slate-700">
        룩에어: 실시간 미세먼지 뷰어
      </header>
      <main className="w-full flex-1 flex justify-center items-center">
        <div className="flex w-[100vw] overflow-hidden h-full py-10">
          {/* <div className="w-[100vw] shrink-0 flex justify-center items-center">
            <div className="border w-[700px] h-full flex flex-col p-20 justify-center">
              <input
                type="text"
                className="border-b focus-within:outline-none h-12 text-[2rem] px-3 mb-10"
                placeholder="test"
              />
              <input
                type="password"
                className="border-b focus-within:outline-none h-12 text-[2rem] px-3 mb-32"
                placeholder="test"
              />
              <div className="border bg-yellow-300 p-3 font-bold flex justify-center items-center text-stone-700 hover:bg-yellow-400 hover:cursor-pointer">
                로그인
              </div>
            </div>
          </div> */}
          <div className="w-[100vw] shrink-0 flex justify-center items-center">
            <div className="border h-[530px] w-[1000px] flex justify-center items-center">
              {isLoading ? ( //데이터를 가져올때까지 spinner를 보여줍니다.
                <svg
                  width="72"
                  height="72"
                  stroke="#000"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <circle
                      cx="12"
                      cy="12"
                      r="9.5"
                      fill="none"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke="#99eeff"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        dur="1.5s"
                        calcMode="spline"
                        values="0 150;42 150;42 150;42 150"
                        keyTimes="0;0.475;0.95;1"
                        keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-dashoffset"
                        dur="1.5s"
                        calcMode="spline"
                        values="0;-16;-59;-59"
                        keyTimes="0;0.475;0.95;1"
                        keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      dur="2s"
                      values="0 12 12;360 12 12"
                      repeatCount="indefinite"
                    />
                  </g>
                </svg>
              ) : (
                <Chart dust={chartData} />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
