const addEvent = () => {
  table.on('select', function (e, dt, type, indexes) {
    let id = table[type](indexes).nodes().to$().attr('id');

    console.log(id);
  });
};

var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
  editor = new $.fn.dataTable.Editor({
    ajax: '/user',
    table: '#table',
    fields: [
      {
        label: 'First name:',
        name: 'first_name',
      },
      {
        label: 'Last name:',
        name: 'last_name',
      },
      {
        label: 'username:',
        name: 'start_date',
        type: 'datetime',
      },
      {
        label: 'Salary:',
        name: 'salary',
        type: 'password',
      },
    ],
  });

  $('#table').DataTable({
    dom: 'Bfrtip',
    ajax: '/post?limit=5',
    columns: [
      {
        data: null,
        render: function (data, type, row) {
          // Combine the first and last names into a single table field
          return data.first_name + ' ' + data.last_name;
        },
      },
      { data: 'position' },
      { data: 'office' },
      { data: 'extn' },
      { data: 'start_date' },
      {
        data: 'salary',
        render: $.fn.dataTable.render.number(',', '.', 0, '$'),
      },
    ],
    select: true,
    buttons: [
      { extend: 'create', editor: editor },
      { extend: 'edit', editor: editor },
      { extend: 'remove', editor: editor },
    ],
  });
});
