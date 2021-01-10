var editor1; // use a global for the submit and return data rendering in the examples
var editor2; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
  editor1 = new $.fn.dataTable.Editor({
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
    table: '#table1',
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
      {
        name: 'user_role',
        label: 'user_role',
        type: 'hidden',
        default: 'writer',
      },
    ],
  });

  $('#table1').DataTable({
    dom: 'Bfrtip',
    ajax: '/user?role=writer',
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
      { extend: 'create', editor: editor1 },
      { extend: 'edit', editor: editor1 },
      { extend: 'remove', editor: editor1 },
    ],
  });
});

$(document).ready(function () {
  editor2 = new $.fn.dataTable.Editor({
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
    table: '#table2',
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
      {
        name: 'user_role',
        label: 'user_role',
        type: 'hidden',
        default: 'admin',
      },
    ],
  });

  $('#table2').DataTable({
    dom: 'Bfrtip',
    ajax: '/user?role=admin',
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
    ],
    select: true,
    buttons: [
      { extend: 'create', editor: editor2 },
      { extend: 'edit', editor: editor2 },
      { extend: 'remove', editor: editor2 },
    ],
  });
});
