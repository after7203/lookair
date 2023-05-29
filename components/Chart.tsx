import { ResponsiveLine } from "@nivo/line"; //그래프 라이브러리

export type ChartDataType = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

type PropsType = {
  dust: ChartDataType;
  useMesh?: boolean;
};

const Chart = ({ dust, useMesh = true }: PropsType) => {
  return (
    <ResponsiveLine
      data={dust} //전달받은 데이터를 대입합니다.
      margin={{ top: 50, right: 150, bottom: 50, left: 60 }} //마진
      xScale={{ type: "point" }}
      // yScale={{
      //   type: "linear",
      //   min: "auto",
      //   max: "auto",
      //   stacked: true,
      //   reverse: false,
      // }}
      yFormat=" >-.3" //소숫점 표현
      // axisTop={null}
      // axisRight={null}
      // axisBottom={{
      //   orient: "bottom",
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: "transportation",
      //   legendOffset: 36,
      //   legendPosition: "middle",
      // }}
      // axisLeft={{
      //   orient: "left",
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: "count",
      //   legendOffset: -40,
      //   legendPosition: "middle",
      // }}
      pointSize={10} //포인트 크기
      pointColor={{ from: "color", modifiers: [] }} //포인트 색깔
      pointBorderWidth={2} //포인트 테두리 굵기
      pointBorderColor={{ from: "serieColor" }} //포인트 테두리 색깔
      pointLabelYOffset={-12} //포인트라벨 오프셋
      enableCrosshair={false} //hover 크로스헤어 효과
      useMesh={useMesh} //커서 hover 메쉬효과
      legends={[
        //범례
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Chart;
