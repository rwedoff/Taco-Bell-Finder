$(function(){
    $('#list').hide();
    $("#about").hide();
    $("#list-but").on('click', function(){
        $('#home').hide();
  
        $('#list').show();
        
    });
      $("#home-but").on('click', function(){
        $('#list').hide();
        $('#home').show();
    });
   
  
    
});