fetch('/view')
  .then((res) => res.json())
  .then((data) => {
    console.log(typeof data);
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: getLabels(data),
        datasets: [
          {
            label: 'Views',
            data: getPoints(data),
            backgroundColor: '#333',
            borderColor: '#333',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const getLabels = (data) => {
  return data.map((v) => `${MONTHS[Number(v.month) - 1]} ${v.year}`);
};

const getPoints = (data) => {
  return data.map((v) => v.views);
};
