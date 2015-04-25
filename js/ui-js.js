$(function(){
    $('#list').hide();
    $("#about").hide();
    $("#list-but").on('click', function(){
        $('#home').hide();
        $("#about").hide();
        $('#list').show();
        
    });
      $("#home-but").on('click', function(){
        $('#list').hide();
        $("#about").hide();
        $('#home').show();
    });
    $("#about-but").on('click', function(){
       $('#list') .hide();
       $("#home").hide();
       $('#about').show();
        
    });
    
});