var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
  editor = new $.fn.dataTable.Editor({
    ajax: {
      create: {
        type: 'POST',
        url: '/user',
      },
      edit: {
        type: 'PUT',
        url: '/user/_id_',
      },
      remove: {
        type: 'DELETE',
        url: '/user/_id_',
        deleteBody: false,
      },
    },
    table: '#table',
    idSrc: '_id',
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
        label: 'Email:',
        name: 'email',
      },
      {
        label: 'Username:',
        name: 'username',
      },
      {
        label: 'Password:',
        name: 'password',
        type: 'password',
      },
      {
        label: 'Confirm Password:',
        name: 'confirm_password',
        type: 'password',
      },
    ],
  });

  $('#table').DataTable({
    dom: 'Bfrtip',
    ajax: '/user',
    columns: [
      {
        title: 'Name',
        data: null,
        render: function (data, type, row) {
          // Combine the first and last names into a single table field
          return data.first_name + ' ' + data.last_name;
        },
      },
      { data: 'email', title: 'Email' },
      {
        title: 'Join on',
        data: null,
        render: (data, type, row) => {
          return new Date(data.created_at).toLocaleDateString();
        },
      },
      {
        title: 'Posts',
        data: null,
        render: (data, type, row) => {
          return data.list_post ? data.list_post.length : 0;
        },
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
