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

let defaultAjax = {
  remove: {
    type: 'DELETE',
    url: '/contact/_id_',
  },
};

let selectedId = null;

$(document).ready(function () {
  editor1 = new $.fn.dataTable.Editor({
    ajax: defaultAjax,
    table: '#table1',
    idSrc: '_id',
  });

  let table = $('#table1').DataTable({
    ajax: `/contact`,
    columns: [
      {
        'class': 'details-control',
        'orderable': false,
        'data': null,
        'defaultContent': '+',
      },
      { data: 'type', title: 'Purpose' },
      {
        title: 'From',
        data: 'name',
      },
      {
        title: 'Email',
        data: 'email',
      },
      {
        title: 'At',
        data: null,
        render: (data, type, row) => {
          return new Date(data.created_at).toLocaleDateString();
        },
      },
    ],
    select: true,
    dom: 'Bfrtip',
    'order': [[4, 'desc']],
    buttons: [{ extend: 'remove', editor: editor1 }],
  });

  table.button('.btn-preview').enable(false);
  table.on('select', function (e, dt, type, indexes) {
    if (type === 'row') {
      selectedId = table.rows(indexes).data().pluck('_id')[0];

      table.button('.btn-preview').enable(true);
    }
  });

  table.on('deselect', function (e, dt, type, indexes) {
    if (type === 'row') {
      selectedId = null;

      table.button('.btn-preview').enable(false);
    }
  });

  let currentShow = null;
  let currentRow = null;
  let currentCell = null;
  $('#table1 tbody').on('click', 'tr td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
      tr.removeClass('details');
      row.cell(this).node().textContent = '+';
      row.child.hide();

      // Remove from the 'open' array
      currentShow = null;
      currentRow = null;
      currentCell = null;
    } else {
      // Close other
      if (currentShow) {
        currentCell.textContent = '+';
        currentShow.hide();
        currentRow.removeClass('details');
      }
      tr.addClass('details');
      row.child(format(row.data())).show();
      row.cell(this).node().textContent = '-';

      currentShow = row.child;
      currentRow = tr;
      currentCell = row.cell(this).node();
    }
  });
});

function format(d) {
  return `<div class="expanded-row">
      <p>Title: <em>${d.title}</em></p>
      <p>Descrition: <em> ${d.description}</em></p>
    </div>`;
}
