let editor1 = {}; // use a global for the submit and return data rendering in the examples
let defaultAjax = {
  remove: {
    type: 'DELETE',
    url: '/post/_id_',
  },
};
let selectedId = null;

$(document).ready(function () {
  editor1 = new $.fn.dataTable.Editor({
    ajax: defaultAjax,
    table: '#table',
    idSrc: '_id',
  });
  let s = $.param({
    data: true,
    populate: { path: 'post_category', select: 'category_name' },
  });

  let table = $('#table').DataTable({
    ajax: `/post?${s}`,
    columns: [
      { data: 'post_category.category_name', title: 'Category' },
      {
        title: 'Title',
        data: 'post_title',
      },
      {
        title: 'Time',
        data: null,
        render: (data, type, row) => {
          return new Date(data.post_date).toLocaleDateString();
        },
      },
      {
        title: 'Author',
        data: null,
        render: (data, type, row) => {
          if (!data.post_author) return '';
          let author =
            data.post_author.first_name + ' ' + data.post_author.last_name;
          return author;
        },
      },
      {
        title: 'Views',
        data: 'post_views',
      },
    ],
    select: true,
    dom: 'Bfrtip',
    'order': [[2, 'desc']],
    buttons: [
      {
        text: 'Preview',
        className: 'btn-preview',
        action: (args) => window.open(`/post/${selectedId}`),
      },
      { extend: 'remove', editor: editor1 },
    ],
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
});
