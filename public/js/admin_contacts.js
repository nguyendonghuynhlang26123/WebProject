let editor1 = {}; // use a global for the submit and return data rendering in the examples
let editor2 = {}; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
  $('#table2').DataTable({
    ajax: '/subscribe',
    'info': false,
    'lengthChange': false,
    columns: [
      { data: 'email', title: 'Email' },
      {
        title: 'Subscribed on',
        data: null,
        render: (data, type, row) => {
          return new Date(data.created_at).toLocaleDateString();
        },
      },
    ],
  });
});
