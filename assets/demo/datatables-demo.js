// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable();
  $('#myInput').on( 'keyup', function () {
    table.search( this.value ).draw();
} );
});
