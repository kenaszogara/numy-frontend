import ReactDOM from "react-dom";
import React from "react";
import { getPage } from "vite-plugin-ssr/client";
import { PageWrapper } from "./PageWrapper";
import * as echarts from "echarts";
import { transform } from "echarts-stat";

hydrate();

async function hydrate() {
  // We do Server Routing, but we can also do Client Routing by using `useClientRouter()`
  // instead of `getPage()`, see https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage();
  const { Page, pageProps } = pageContext;
  ReactDOM.hydrate(
    <PageWrapper pageContext={pageContext}>
      <Page {...pageProps} generateChart={generateChart} />
    </PageWrapper>,
    document.getElementById("page-view")
  );
}

const generateChart = (id, dataset, title) => {
  echarts.registerTransform(transform.regression);
  // document.getElementById(id).innerHTML = "";
  document.getElementById(id).style.width = "600px";
  document.getElementById(id).style.height = "400px";
  const chart = echarts.init(document.getElementById(id));

  // Specify the configuration items and data for the chart
  const option = {
    dataset,
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "scatter",
        type: "scatter",
      },
      {
        name: "line",
        type: "line",
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: "circle",
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 },
      },
    ],
  };

  option && chart.setOption(option);
  return chart;
};
