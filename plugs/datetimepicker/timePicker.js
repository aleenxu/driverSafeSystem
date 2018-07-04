
$('#datetimepicker9').datetimepicker({
 onGenerate:function( ct ){
     $(this).find('.xdsoft_date.xdsoft_weekend')
         .addClass('xdsoft_disabled');
 },
 weekends:['01.01.2014','02.01.2014','03.01.2014','04.01.2014','05.01.2014','06.01.2014'],
 timepicker:false
});
var dateToDisable = new Date();
 dateToDisable.setDate(dateToDisable.getDate() + 2);
 
 