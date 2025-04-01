import "@/assets/css/pages/StatisticsPage.css";
import { useState, useEffect } from "react";
import type { Order } from "@/types";
import { parseOrders } from "@/utils";
import { Chart } from "chart.js/auto";

function StatisticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartMonth, setChartMonth] = useState("January");
  const [chartBar, setChartBar] = useState("men");
  const [barColor, setBarColor] = useState("rgba(54, 162, 235,");
  const apiURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : window.location.origin;

  useEffect(() => {
    fetch(`${apiURL}/orders/getAll`)
      .then((res) => res.json())
      .then((data) => {
        const orders = parseOrders(data.orders);
        setOrders(orders);
      });
  }, [apiURL]);

  /**
   * Maps each order to an object containing the order date and
   * categorized counts of items by category and collection.
   */
  const orderDates = orders.map((order) => {
    const date = new Date(order.created_at);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    // Initialize count objects
    const categoryCount: Record<string, number> = { men: 0, women: 0 };
    const totalCollectionCount: Record<string, number> = {
      new: 0,
      hot: 0,
      spring: 0,
      summer: 0,
      fall: 0,
      winter: 0,
    };

    // Nested object for category and collection counts
    const categoryCollectionCount: Record<string, Record<string, number>> = {};

    // Iterate over each item in the order's cart
    order.cart.forEach((item) => {
      const category = (item as { category: string }).category;
      const collection = (item as { collection: string }).collection;

      // Increment category and collection counts
      categoryCount[category] += 1;
      totalCollectionCount[collection] += 1;

      // Initialize nested count for category if not present
      if (!categoryCollectionCount[category]) {
        categoryCollectionCount[category] = {};
      }
      // Initialize count for collection within category if not present
      if (!categoryCollectionCount[category][collection]) {
        categoryCollectionCount[category][collection] = 0;
      }
      categoryCollectionCount[category][collection] += 1;
    });

    // Return an object with order date and counts
    return {
      orderDate: `${month} ${day}`,
      categoryCount,
      collectionCount: totalCollectionCount,
      categoryCollectionCount,
    };
  });

  /**
   * Extract unique months from order dates and sort them chronologically.
   */

  // Extract unique months from orderDates
  const orderMonths = Array.from(
    new Set(orderDates.map((date) => date.orderDate.split(" ")[0]))
  );

  // Define the chronological order of months
  const monthOrder = [
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

  // Sort extracted months based on chronological order
  orderMonths.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

  // Sort orderDates by month and day
  orderDates.sort((a, b) => {
    const monthA = a.orderDate.split(" ")[0];
    const monthB = b.orderDate.split(" ")[0];
    const dayA = parseInt(a.orderDate.split(" ")[1]);
    const dayB = parseInt(b.orderDate.split(" ")[1]);

    // If the months are the same, sort by day
    if (monthA === monthB) {
      return dayA - dayB;
    } else {
      // Otherwise, sort by month in chronological order
      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    }
  });

  /**
   * Filter orderDates to include only dates in the current month.
   */
  const filteredOrderDates = orderDates.filter((date) =>
    date.orderDate.includes(chartMonth)
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const collectionCounts = {
    new: 0,
    hot: 0,
    spring: 0,
    summer: 0,
    fall: 0,
    winter: 0,
  };

  /**
   * Count the number of collections in each category for the current month.
   */
  filteredOrderDates.forEach((date) => {
    Object.keys(collectionCounts).forEach((collection) => {
      // Increment the count for the current collection in the category
      collectionCounts[collection as keyof typeof collectionCounts] +=
        date.categoryCollectionCount[chartBar]?.[collection] || 0;
    });
  });

  /**
   * Handler for when the category (men or women) is changed.
   * @param {string} value - The new category.
   */
  const handleChangeCategory = (value: string) => {
    setChartBar(value);
    if (value === "men") {
      // Set the bar color for men's collections
      setBarColor("rgba(54, 162, 235,");
    } else {
      // Set the bar color for women's collections
      setBarColor("rgba(255, 99, 132,");
    }
  };

  /**
   * Function to update the charts when the component mounts or the dependencies change.
   * @param {number[]} filteredOrderDates - The filtered order dates for the current month.
   * @param {string} chartMonth - The month to display in the charts.
   * @param {string} chartBar - The category to display in the bar chart.
   * @param {string} barColor - The color of the bar chart.
   * @param {Record<string, number>} collectionCounts - The count of collections in each category.
   */
  useEffect(() => {
    const pieCollectionCount = [
      collectionCounts.new,
      collectionCounts.hot,
      collectionCounts.spring,
      collectionCounts.summer,
      collectionCounts.fall,
      collectionCounts.winter,
    ];
    const barChart = document.getElementById("barChart") as HTMLCanvasElement;
    const barChartInstance = new Chart(barChart, {
      type: "line",
      data: {
        labels: filteredOrderDates.map((date) => date.orderDate),
        datasets: [
          {
            label: chartBar,
            data: filteredOrderDates.map(
              (date) => date.categoryCount[chartBar]
            ),
            backgroundColor: `${barColor} 0.2)`,
            borderColor: `${barColor} 1)`,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: `Orders for ${chartBar} items in ${chartMonth}`,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const pieChart = document.getElementById("pieChart") as HTMLCanvasElement;
    const pieChartInstance = new Chart(pieChart, {
      type: "pie",
      data: {
        labels: ["New", "Hot", "Spring", "Summer", "Fall", "Winter"],
        datasets: [
          {
            label: "Amount of orders",
            data: pieCollectionCount,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: `Most purchased collection in ${chartMonth} for ${chartBar}`,
          },
        },
      },
    });
    return () => {
      barChartInstance.destroy();
      pieChartInstance.destroy();
    };
  }, [filteredOrderDates, chartMonth, chartBar, barColor, collectionCounts]);

  return (
    <div className="statistics">
      <div className="chart-controls">
        <div className="form-floating">
          <select id="monthSelect" className="form-select">
            {orderMonths.map((month) => (
              <option
                key={month}
                value={month}
                onClick={() => setChartMonth(month)}
              >
                {month}
              </option>
            ))}
          </select>
          <label htmlFor="monthSelect">Select month to display:</label>
        </div>
        <div className="form-floating">
          <select id="categorySelect" className="form-select">
            <option value="men" onClick={() => handleChangeCategory("men")}>
              Men
            </option>
            <option value="women" onClick={() => handleChangeCategory("women")}>
              Women
            </option>
          </select>
          <label htmlFor="monthSelect">Select category to display:</label>
        </div>
      </div>
      <div className="chart-container">
        <canvas id="barChart" className="chart"></canvas>
        <canvas id="pieChart" className="pie-chart"></canvas>
      </div>
    </div>
  );
}

export default StatisticsPage;
