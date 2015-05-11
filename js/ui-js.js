$(function(){
    
    var onXDKReady = function () {
    //alert("xdk ready");
    intel.xdk.device.hideSplashScreen();
    //document.addEventListener('intel.xdk.device.hardware.back', function(e){alert("Back"); e.preventDefault(); return false;}, false);

};
document.addEventListener("intel.xdk.device.ready", onXDKReady, false);
    
    
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