const getLabels = (data) => {
  return data.map((v) => `${MONTHS[Number(v.month) - 1]} ${v.year}`);
};

const getPoints = (data) => {
  return data.map((v) => v.views);
};

const getTotalView = (data) => {
  let points = getPoints(data);
  let total = points.reduce((total, v) => total + v);
  return total;
};

const getWriterPostCount = (data) => {
  return data.map((u) => u.list_post.length);
};

const getUserDetails = async (data) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    let user = await fetch(`/user/writer/${element._id}`)
      .then((res) => res.json())
      .then((d) => d.data);

    result.push(user);
  }
  return result;
};

const getWriterViewCount = async (data) => {
  let users = await getUserDetails(data);
  let list_posts = await users.map((u) => u.list_post);

  let result = list_posts.map((l) => {
    if (l.length == 0) return 0;
    let views = l.map((p) => p.post_id.post_views);
    views = views.sort();
    return views[0];
  });
  return result;
};

const getWriterLabel = (data) => {
  return data.map((u) => u.first_name + ' ' + u.last_name);
};

fetch('/view')
  .then((res) => res.json())
  .then((data) => {
    data = data.reverse();

    document.querySelector('[data-views]').textContent = getTotalView(data);

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

fetch('/user?role=writer')
  .then((data) => data.json())
  .then(async (data) => {
    document.querySelector('[data-writers]').textContent = data.data.length;

    data = data.data;
    let table2Data = await getWriterViewCount(data);

    let ctx = document.getElementById('writerChart').getContext('2d');
    let writerChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: getWriterLabel(data),
        datasets: [
          {
            label: '# of posts',
            data: getWriterPostCount(data),
            backgroundColor: '#f58634',
            borderColor: '#f58634',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'highest views',
            data: table2Data,
            backgroundColor: '#ffcc29',
            borderColor: '#ffcc29',
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

fetch('/post')
  .then((data) => data.json())
  .then((data) => {
    document.querySelector('[data-posts]').textContent = data.data.length;
  });

fetch('/subscribe')
  .then((data) => data.json())
  .then((data) => {
    document.querySelector('[data-subscribed]').textContent = data.data.length;
  });

fetch('/contact')
  .then((data) => data.json())
  .then((data) => {
    document.querySelector('[data-contacts]').textContent = data.data.length;
  });
