import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./Monitor.module.css";
import Image from 'next/image'

export default function Monitor() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy existing Chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const data = {
        labels: [
          "Oct 2021",
          "Nov 2021",
          "Dec 2021",
          "Jan 2022",
          "Feb 2022",
          "Mar 2022",
          "Apr 2022",
          "May 2022",
          "Jun 2022",
          "Jul 2022",
          "Aug 2022",
          "Sep 2022",
          "Oct 2022",
          "Nov 2022",
          "Dec 2022",
          "Jan 2023",
          "Feb 2023",
          "Mar 2023",
          "Apr 2023",
          "May 2023",
          "Jun 2023",
          "Jul 2023",
          "Aug 2023",
          "Sep 2023",
          "Oct 2023",
          "Nov 2023",
          "Dec 2023",
        ],
        datasets: [
          {
            label: "BCT",
            data: [
              7, 6.5, 6, 5.5, 5, 4.5, 4, 3.8, 3.6, 3.4, 3.2, 3.1, 3, 2.9, 2.8,
              2.7, 2.6, 2.5, 2.45, 2.4, 2.35, 2.3, 2.25, 2.2, 2.15, 2.1, 2,
            ],
            borderColor: "rgb(50, 205, 50)",
            backgroundColor: "rgba(50, 205, 50, 0.5)",
            yAxisID: "y",
          },
          {
            label: "NCT",
            data: [
              9, 8.8, 8.5, 8, 7.6, 7.3, 7, 6.7, 6.5, 6.3, 6, 5.8, 5.6, 5.4, 5.2,
              5, 4.8, 4.6, 4.5, 4.3, 4.2, 4.1, 4, 3.9, 3.8, 3.7, 3.6,
            ],
            borderColor: "rgb(255, 140, 0)",
            backgroundColor: "rgba(255, 140, 0, 0.5)",
            yAxisID: "y1",
          },
          {
            label: "MC02",
            data: [
              16, 15, 14, 13, 12, 11, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5,
              5, 4.5, 4.2, 4, 3.8, 3.6, 3.4, 3.2, 3, 2.8, 2.7,
            ],
            borderColor: "rgb(30, 144, 255)",
            backgroundColor: "rgba(30, 144, 255, 0.5)",
            yAxisID: "y1",
          },
          {
            label: "UBO",
            data: [
              10, 9.5, 9, 8.8, 8.5, 8.2, 8, 7.8, 7.6, 7.4, 7.2, 7, 6.8, 6.6,
              6.4, 6.2, 6, 5.8, 5.6, 5.4, 5.2, 5, 4.8, 4.6, 4.4, 4.2, 4,
            ],
            borderColor: "rgb(255, 20, 147)",
            backgroundColor: "rgba(255, 20, 147, 0.5)",
            yAxisID: "y1",
          },
          {
            label: "NBO",
            data: [
              12, 11.5, 11, 10.8, 10.5, 10.2, 10, 9.7, 9.5, 9.2, 9, 8.8, 8.5,
              8.2, 8, 7.8, 7.6, 7.4, 7.2, 7, 6.8, 6.6, 6.4, 6.2, 6, 5.8, 5.6,
            ],
            borderColor: "rgb(192, 192, 192)",
            backgroundColor: "rgba(192, 192, 192, 0.5)",
            yAxisID: "y1",
          },
        ],
      };

      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          stacked: false,
          plugins: {
            title: {
              display: true,
              text: "Historical prices (USD)",
            },
            legend: {
              position: "bottom",
            },
          },
          scales: {
            y: {
              type: "linear",
              display: true,
              position: "left",
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
      };

      // Create and store the Chart instance
      chartInstanceRef.current = new Chart(ctx, config);
    }

    // Cleanup function to destroy Chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.monitor}>
      <div className={styles.monitorTop}>
        <div className={styles.monitorPricing}>
          <div className={styles.carbonPrice}>
            <div className={styles.carbonTitle}>Digital carbon pricing</div>
            <div className={styles.logoTitle}>
              <div className={styles.imageIcon}>
                <Image src="/medias/carbon.png" />
              </div>
              <div className={styles.title}>Base Carbon Tonne (BCT)</div>
            </div>
            <div className={styles.dollarAmount}>
              <div className={styles.dollarLeft}>$0.15</div>
              <div className={styles.dollarRight}>$0.16</div>
            </div>
          </div>
          <div className={styles.carbonPrice}>
            <div className={styles.carbonTitle}>Digital carbon pricing</div>
            <div className={styles.logoTitle}>
              <div className={styles.imageIcon}>
                {" "}
                <Image src="/medias/carbon.png" />
              </div>
              <div className={styles.title}>Base Carbon Tonne (BCT)</div>
            </div>
            <div className={styles.dollarAmount}>
              <div className={styles.dollarLeft}>$0.15</div>
              <div className={styles.dollarRight}>$0.16</div>
            </div>
          </div>
          <div className={styles.carbonPercent}>
            <div className={styles.percentValue}>
              <div className={styles.percentValues}>
                <div className={styles.triangle}></div> 3%
              </div>
            </div>
            <div className={styles.carbonPrice}>
              <div className={styles.carbonTitle} id={styles.carbonTitleOff}>
                Digital carbon pricing
              </div>
              <div className={styles.logoTitle}>
                <div className={styles.imageIcon}>
                  <Image src="/medias/nature.png" />
                </div>
                <div className={styles.title}>Nature Carbon Tonne (NCT)</div>
              </div>
              <div className={styles.dollarAmount}>
                <div className={styles.dollarLeft}>$0.52</div>
                <div className={styles.dollarRight}>$0.57</div>
              </div>
            </div>
          </div>
          <div className={styles.carbonPercent}>
            <div className={styles.percentValue}>
              <div className={styles.percentValues}>
                <div className={styles.triangle}></div> 6%
              </div>
            </div>
            <div className={styles.carbonPrice}>
              <div className={styles.carbonTitle} id={styles.carbonTitleOff}>
                Digital carbon pricing
              </div>
              <div className={styles.logoTitle}>
                <div className={styles.imageIcon}>
                  <Image src="/medias/moss.png" />
                </div>
                <div className={styles.title}>Moss Carbon Credit (MC02)</div>
              </div>
              <div className={styles.dollarAmount}>
                <div className={styles.dollarLeft}>$0.27</div>
                <div className={styles.dollarRight}>-</div>
              </div>
            </div>
            <div className={styles.percentValue}>
              <div className={styles.percentValues}>
                <div className={styles.triangle}></div> 10%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.monitorBottom}>
        <div className={styles.monitorDescription}>
          The prices of various digital carbon pool tokens and their selective
          costs charged by briges to redeem or retire a specific underlying
          digital carbon credit token. Note: The chart shows MC02 price data
          from the KLIMA/MC02 pool launched in January 2022.
        </div>
        <div className={styles.graph}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
