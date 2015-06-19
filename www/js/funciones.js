var loged=false;
$(document).ready(function(){onDeviceReady();});
function Seguir(){
		var miip=$('#ipnumber').val();
		if(miip.length>6){
			$('#btnseguir').html("<img src='images/loader.gif' width='15px;'/>");
			$.ajax({
			  url: "http://"+miip+"/conexionwifi/index.php",
			  data:{equipo:1550,data:1}
			}).done(function(resp) {
				console.log(resp);
				if(resp=='ok'){
					$('#formlogin').fadeIn();
					$('#formip').css('display','none');
					ingresadatos(1,miip);
				}else if (resp=='error'){
					$('#alerta1').html(resp+" Su equipo no está registrado.");
					$('#alerta1').fadeIn();
				}else{
					$('#alerta1').html(resp);
					$('#alerta1').fadeIn();
				}
				$('#btnseguir').html("SEGUIR");
			});
		}else{
			$('#btnseguir').html("SEGUIR");
			$('#alerta1').html("<div><button type='button' class='close' data-dismiss='alert'>&times;</button></div><div>Ingrese un número de ip válido.</div>");
			$('#alerta1').fadeIn();
		}
		
		//window.location="//"+$('#ipnumber').val()+"/conexionwifi/";
}
	
function Login(){
		//console.log("Ana"+$('#user').val()+''+$('#pass').val());
		if($('#user').val()!=''&&$('#pass').val()!=''){
			$('#btnlogin').html("<img src='images/loader.gif' width='15px;'/>");
			$.ajax({
			  url: "http://"+$('#ipnumber').val()+"/conexionwifi/index.php",
			  data:{cedula:$('#user').val(),pass:$('#pass').val(),data:2}
			}).done(function(resp) {
				    console.log(resp);
					ingresadatos(2,$('#user').val()+'|'+$('#pass').val());
					$('#formclientes').html(resp);
					$('.linea').slideUp(100,function(){
						$('#formclientes').slideDown(700);
					});
					/*autocomplete*/
					var cli=JSON.parse($('#jsonclientes').html());
					 var datos = $(cli).map(function(){
						return {value:this.tarjeta,id:this.id};
					  }).get();
					
					console.log(datos);
					 $('#card').autocomplete({
							source: datos,
							minLength: 0,
							select: function(event,ui){
								$('#idcliente').val(ui.item.id);
							}
						});
					$('.soloInt').on('keydown',function(event,value){
						justInt(event,$(this).val());
					});
					/**/
			});
		}else{
			$('#alerta2').html("Por favor, ingrese los datos solicitados.");
			$('#btnlogin').html('REGISTRAR')
		}
		
		//window.location="//"+$('#ipnumber').val()+"/conexionwifi/";
}

function justInt(e,value){
    if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 13)){
        return;
        }
    else{
        e.preventDefault();
        }
    }
	
function ConsumosCliente(){
	//alert($('#idcliente').val());
	var miid=$('#idcliente').val();
	if(miid!=''){
		$.ajax({
		url: "http://"+$('#ipnumber').val()+"/conexionwifi/index.php",
			data:{data:3,idcli:miid}
		}).done(function(resp) {
		console.log(resp);
		$('#formclientes').css('display','none');
		$('#formclientes').html(resp);
		$('#formclientes').slideDown(500);
		$('#regresar').click(function(){
			Login();
		});
		$('#imprimir').click(function(){
				window.open("centvia://?utt=Practisis+Bar-Precuentas&udn=Practisis+Bar-Precuentas&cru=com.practisis.wifibar&cruf=com.practisis.wifibar&ccs=yes&c_="+$('#encode64').html(),'_system','location=yes');
		});
		});
	}
}