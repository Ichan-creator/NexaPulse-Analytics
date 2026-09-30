const chartData = document.getElementById("chartData");

const monthlyData = JSON.parse(
    chartData.dataset.monthly
);

const categoryData = JSON.parse(
    chartData.dataset.category
);

const regionData = JSON.parse(
    chartData.dataset.region
);

document.querySelectorAll(".product-progress").forEach((bar) => {

    const value = Number(
        bar.dataset.value || 0
    );

    bar.style.width = `${value}%`;

});

const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

        legend: {
            display: false
        }

    },

    scales: {

        y: {

            beginAtZero: true,

            ticks: {

                callback: function (value) {

                    return "₱" +
                        Number(value).toLocaleString();

                }

            }

        }

    }

};

const revenueChart =
    document.getElementById("revenueChart");


if (revenueChart) {

    new Chart(revenueChart, {

        type: "line",

        data: {

            labels: Object.keys(monthlyData),

            datasets: [{

                label: "Revenue",

                data: Object.values(monthlyData),

                tension: 0.4,

                fill: true,

                borderWidth: 3,

                pointRadius: 4

            }]

        },

        options: chartOptions

    });

}

const categoryChart =
    document.getElementById("categoryChart");


if (categoryChart) {

    new Chart(categoryChart, {

        type: "doughnut",

        data: {

            labels: Object.keys(categoryData),

            datasets: [{

                data: Object.values(categoryData),

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

const regionChart =
    document.getElementById("regionChart");


if (regionChart) {

    new Chart(regionChart, {

        type: "bar",

        data: {

            labels: Object.keys(regionData),

            datasets: [{

                label: "Revenue",

                data: Object.values(regionData),

                borderRadius: 6

            }]

        },

        options: chartOptions

    });

}