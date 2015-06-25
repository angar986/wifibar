var loged=false;
$(document).ready(function(){onDeviceReady();});
function Seguir(){
		var miip=$('#ipnumber').val();
		if(miip.length>6){
			$('#btnseguir').html("<img src='images/loader.gif' width='15px;'/>");
			$.ajax({
				url: "http://"+miip+"/conexionwifi/index.php",
				data:{equipo:1550,data:1},
				error: function (xhr, ajaxOptions, thrownError){
					$('#alerta1').html("Servidor no encontrado.");
					$('#alerta1').slideDown();
					$('#btnseguir').html("SEGUIR");
					$('#ipnumber').val("");
					$('#ipnumber').focus();
				}
			}).done(function(resp){
				console.log(resp);
				if(resp=='ok'){
					$('#formlogin').fadeIn();
					$('#formip').css('display','none');
					ingresadatos(1,miip);
				}else if (resp=='error'){
					$('#alerta1').html(resp+" Su equipo no está registrado.");
					$('#alerta1').slideDown();
				}else{
					$('#alerta1').html(resp);
					$('#alerta1').slideDown();
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
			  data:{cedula:$('#user').val(),pass:$('#pass').val(),data:2,barras:$('#barrascaja').html()}
			}).done(function(resp) {
				    console.log(resp);
					if(resp!=''){
						$('#formclientes').html(resp);
						$('.linea').css('display','none');
						$('#formclientes').slideDown(700);
						ingresadatos(2,$('#user').val()+'|'+$('#pass').val()+'|'+$('#barrascajar').html());
						$('#config').fadeIn('slow');
						$('#dataemp').html($('#empdata').html());
						/*autocomplete*/
						/*var cli=JSON.parse($('#jsonclientes').html());
						 var datos = $(cli).map(function(){
							return {value:this.tarjeta,id:this.id};
						  }).get();*/
						
						console.log(datos);
						 /*$('#card').autocomplete({
								source: datos,
								minLength: 0,
								select: function(event,ui){
									$('#idcliente').val(ui.item.id);
								}
							});*/
						$('.soloInt').on('keydown',function(event,value){
							justInt(event,$(this).val());
						});
						/**/
					}else{
						$('#alerta2').html("Credenciales no válidas.");
						$('#alerta2').slideDown();
						$('#btnlogin').html("REGISTRAR");
						$('#user,#pass').val('');
						$('#user,#pass').focus();
					}
			});
		}else{
			$('#alerta2').html("Por favor, ingrese los datos solicitados.");
			$('#alerta2').slideDown();
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
	var cli=JSON.parse($('#jsonclientes').html());
	for(n=0;n<cli.length;n++){
		if(cli[n].tarjeta==$('#card').val()){
			$('#idcliente').val(cli[n].id);
			break;
		}
	}  
	var miid=$('#idcliente').val();
	if(miid!=''){
		$('#btnver').html("<img src='images/loader.gif' width='15px;'/>");
		$.ajax({
		url: "http://"+$('#ipnumber').val()+"/conexionwifi/index.php",
			data:{data:3,idcli:miid,card:$('#card').val()}
		}).done(function(resp) {
		console.log(resp);
		$('#formclientes').css('display','none');
		$('#formclientes').html(resp);
		$('#formclientes').slideDown(500);
		$('#regresar').click(function(){
			Login();
		});
			$('#imprimir').click(function(){
					window.open("centvia://?utt=Practisis+Bar-Precuentas&udn=Practisis+Bar-Precuentas&cru=Practisis+Wifibar&cruf=Practisis+Wifibar&ccs=yes&c_="+$('#encode64').html(),'_system','location=yes');
			});
			$('#pagar').click(function(){
				$('#invoiceTotal').html($('#spantotal').html());
				$('#formaspago').modal('show');
				$('#alerta4').css('display','none');
			});
			
			/*carga formas de pago*/
			$('#tablaformaspago').html('');
			var formasp=JSON.parse($('#jsonformaspago').html());
			for(var n in formasp){
				var fila="<tr data-id='"+formasp[n].id+"'><td style='vertical-align:middle; text-align:left;'>"+formasp[n].forma+"</td><td><input data-id='"+formasp[n].forma+"' id='f_"+formasp[n].id+"' value='0.00' class='form-control input-lg subs' type='number' onclick='this.select();' onfocus='Faltantes("+formasp[n].id+");' onchange='Faltantes("+formasp[n].id+");'/></td></tr>";
				$('#tablaformaspago').append(fila);
			}
		});
	}else{
		$('#alerta3').html("Por favor, ingrese un número de tarjeta válido.");
		$('#alerta3').slideDown();
	}
}

function Faltantes(f){
	var total=parseFloat($('#invoiceTotal').html());
	var suma=0;
	$('.subs').each(function(){
		suma+=parseFloat($(this).val());
	});
	//console.log(suma+'-'+total);
	if((total-suma)>0){
		if(parseFloat($('#f_'+f).val())==0)
			$('#f_'+f).val((total-suma).toFixed(2));
	}
	//else
	//$('#f_'+f).val('0.00');

	/*var suma=0;
	$('.subs').each(function(){
		suma+=parseFloat($(this).val());
	});*/
	
	$('#invoicePaid').html(suma.toFixed(2));
	if((suma-total)>0)
		$('#invoiceDebt').html("VUELTO");
	else
		$('#invoiceDebt').html("FALTANTE");
	$('#changeFromPurchase').html((suma-total).toFixed(2));
}

function EnviarPagos(){
	var pagado=parseFloat($('#invoicePaid').html());
	var total=parseFloat($('#invoiceTotal').html());
	if(pagado>=total){
		var arraypagos=new Array();
		$('.subs').each(function(){
			if($(this).val()>0){
				var formas={f:$(this).attr('data-id'),val:$(this).val()};
				arraypagos.push(formas);
			}
		});
		//console.log(arraypagos);
		var miid=$('#idcliente').val();
		$.ajax({
		url: "http://"+$('#ipnumber').val()+"/conexionwifi/index.php",
			data:{data:4,idcli:miid,jsonpagos:JSON.stringify(arraypagos),vuelto:$('#changeFromPurchase').html(),barras:$('#barrascaja').html(),card:$('#cardnumber').html(),m:$('#mujeres').val(),h:$('#hombres').val(),dataemp:$('#dataemp').html()},
		method:'post'
		}).done(function(resp) {
			console.log(resp);
			var miresp=resp.split('|');
			if(miresp[0]=='ok'){
				$('#encode64f').html(miresp[1]);
				window.open("centvia://?utt=Practisis+Bar-Precuentas&udn=Practisis+Bar-Precuentas&cru=Practisis+Wifibar&cruf=Practisis+Wifibar&ccs=yes&c_="+$('#encode64f').html(),'_system','location=yes');
			}else{
				$('#alerta4').html("Ha ocurrido un error en el pago.");
				$('#alerta4').slideDown();
			}
		});
	}else{
		$('#alerta4').html("El valor pagado debe ser igual al valor total.");
		$('#alerta4').slideDown();
	}
}

function ControlarSalida(){
	var mujeres=parseInt($('#mujeres').val());
	var hombres=parseInt($('#hombres').val());
	var datosalidas=$('#registros').val().split('@');
	var rh=parseInt(datosalidas[3])+parseInt(datosalidas[4])-parseInt(datosalidas[5]);
	var rm=parseInt(datosalidas[0])+parseInt(datosalidas[1])-parseInt(datosalidas[2]);
	var quienes='';
	var cont=0;
	if(rh!=hombres){
		quienes+='hombres';
		cont++;
	}
	if(rm!=mujeres){
		if(cont>0) quienes+=',';
		quienes+='mujeres';
		cont++;
	}
	console.log(mujeres+'|'+hombres+'|'+rh+'|'+rm);
	if(cont==0){
		$('#alerta4').css('display','none');
		$('#alerta4').html('');
		$('#divsalida').css('display','none');
		$('#divpagos').fadeIn('slow');
	}else{
		$('#alerta4').html("El número de hombres y mujeres que ingresan y salen debe coincidir.");
		$('#alerta4').slideDown();
	}
}

function VerificarFormas(){
	if(parseFloat($('#f_2').val())==0)
		EnviarPagos();
	else
		alert("Tarjeta de Crédito");
}