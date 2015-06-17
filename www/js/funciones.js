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
					/**/
			});
		}else{
			$('#alerta2').html("Por favor, ingrese los datos solicitados.");
			$('#btnlogin').html('REGISTRAR')
		}
		
		//window.location="//"+$('#ipnumber').val()+"/conexionwifi/";
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
				window.open('centvia://?udn=My+Sample+centvia+print&utt=Your+Company+%2f+Product+Name&cru=http%3a%2f%2fwww.centsoftware.com%2fcentvia%2fsamples.aspx&c_=!+0+200+200+300+1%0d%0aTEXT+4+0+20+10+Key+Lime+Soda%0d%0aTEXT+7+0+20+60+Natural+Soda%2c+Key+Lime%2c+12+ounce+can%0d%0aBT+7+0+5%0d%0aBARCODE+128+2+0+30+40+100+4000112206%0d%0aBT+OFF%0d%0aPRINT%0d%0a','_system','location=yes');
		});
		});
	}
}

function Imprimir(){
		var type = "text/html";
		var title = "test.html";
		var fileContent = "<html>Phonegap Print Plugin</html>";
		window.plugins.PrintPlugin.print(fileContent,function(){console.log('success')},function(){console.log('fail')},"",type,title);

}