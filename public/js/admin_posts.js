let editor1 = {}; // use a global for the submit and return data rendering in the examples
let defaultAjax = {
  remove: {
    type: 'DELETE',
    url: '/post/_id_',
  },
};

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
  $('#table').DataTable({
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
          return new Date(data.created_at).toLocaleDateString();
        },
      },
      {
        title: 'Author',
        data: null,
        render: (data, type, row) => {
          if (!data.post_author) return '';
          let author =
            data.post_author.first_name + ' ' + data.post_author.last_name;
          console.log(author, row);
          return author;
        },
      },
    ],
    select: true,
    dom: 'Bfrtip',
    buttons: [{ extend: 'remove', editor: editor1 }],
  });
});
