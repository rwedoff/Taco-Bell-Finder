$(function(){
    var height = $(window).height() / 1.37;
    $('#map-canvas').css("height", height);
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