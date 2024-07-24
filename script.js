document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileInput').addEventListener('change', handleFile, false);

    const pieData = {
        labels: ['UI', 'IPB', 'ITB', 'ITERA', 'ITS'],
        datasets: [{
            data: [30, 20, 15, 25, 10],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        let label = tooltipItem.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.raw + '%';
                        return label;
                    }
                }
            },
            datalabels: {
                formatter: (value, context) => {
                    return context.chart.data.labels[context.dataIndex] + '\n' + value + '%';
                },
                color: '#fff',
                labels: {
                    title: {
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        },
        cutout: '50%' // This makes it a donut chart
    };

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: pieData,
        options: pieOptions,
    });

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'],
        datasets: [{
            label: 'Score',
            data: [65, 59, 80, 81, 56],
            fill: true,
            borderColor: 'rgba(75, 190, 190, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.5,
        }],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw;
                    }
                }
            }
        }
    };

    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: lineData,
        options: lineOptions,
    });
});

function handleFile(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(sma, {type: 'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        updateScores(json);
    };
    reader.readAsArrayBuffer(file);
}

function updateScores(data) {
    let totalPPU = 0;
    let totalPK = 0;
    let totalKMBM = 0;
    let totalIND = 0;
    let count = 0;

    data.forEach(row => {
        totalPPU += row.PPU || 0;
        totalPK += row.PK || 0;
        totalKMBM += row.KMBM || 0;
        totalIND += row.IND || 0;
        count++;
    });

    const averagePPU = totalPPU / count;
    const averagePK = totalPK / count;
    const averageKMBM = totalKMBM / count;
    const averageIND = totalIND / count;
    const averageScore = (averagePPU + averagePK + averageKMBM + averageIND) / 4;

    document.getElementById('ppuScore').innerText = averagePPU.toFixed(2);
    document.getElementById('pkScore').innerText = averagePK.toFixed(2);
    document.getElementById('kmbmScore').innerText = averageKMBM.toFixed(2);
    document.getElementById('indScore').innerText = averageIND.toFixed(2);
    document.getElementById('averageScore').innerText = averageScore.toFixed(2);
}


document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Nilai Try Out',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
