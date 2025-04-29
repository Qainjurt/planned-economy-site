document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('productionChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1928', '1933', '1938', '1943', '1948', '1953'],
            datasets: [{
                label: 'Болат өндірісі (млн тонна)',
                data: [4.3, 6.9, 18.1, 8.5, 19.2, 38.1],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Өндіріс (млн тонна)',
                        font: {
                            size: window.innerWidth < 768 ? 12 : 14
                        }
                    },
                    ticks: {
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Жылдар',
                        font: {
                            size: window.innerWidth < 768 ? 12 : 14
                        }
                    },
                    ticks: {
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: window.innerWidth < 768 ? 12 : 14
                        }
                    }
                }
            }
        }
    });
});