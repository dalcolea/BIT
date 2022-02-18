	var pasajeros;
	var indicePasajeros=0;
	var nombre=[];
	var apellidos=[];
	
	$(document).ready(function(){
		
		$(".opcion").click(irPasoDos);
		
		$("#inputs-precios input").keyup(calcular);
		
		$("#contratar").click(irPasoTres);
		
		$("#anyadir").click(controlarPasajeros);

		$('#otra').click(otraReserva);

		$('#imprimir').click(imprimir)
	});

	function irPasoDos(){
		$(this).find("input").attr('checked', 'checked');
		$("#paso2").show();
		precio=$(this).find("input").attr('value');
		$("#campo1").val(precio);
		$("#campo4").val(Number($("#campo1").val())*Number($("#campo2").val())*Number($("#campo3").val()));
	}

	function calcular(e){
		a=e.keyCode;
		//console.log(e);
		//console.log(e.target);
		if (a >= 48 && a <= 57){
			total=Number($("#campo1").val())*Number($("#campo2").val())*Number($("#campo3").val());
			$("#campo4").val(total);
		} else {
			//borrar el último caracter marcado si no es un numero						
			f=$(e.target).val();							
			$(e.target).val(f.substring(0,f.length - 1));
		}	
	}
	
	function irPasoTres(){
		z=$("#campo2")[0].checkValidity();
		y=$("#campo3")[0].checkValidity();
		if(z == true && y == true){
			pasajeros=Number($("#campo3").val());
			$("#paso3").show();
			$("#campo5").focus();
			$("#campo2").attr("disabled","disabled");
			$("#campo3").attr("disabled","disabled");
			console.log($("#campo3").attr("disabled"));
		}
	}

	
	
	function controlarPasajeros(){
		z=$("#campo5")[0].checkValidity();
		y=$("#campo6")[0].checkValidity();
		if (z == true && y == true){	
			if (pasajeros==1){
				nombre.push($("#campo5").val());
				apellidos.push($("#campo6").val());
				mostrarBillete();
				acabar(pasajeros);
			} else {
				nombre.push($("#campo5").val());
				apellidos.push($("#campo6").val());
				indicePasajeros++;
				if (indicePasajeros<pasajeros){
					$("#paso4").show().focus();
					$("#aviso-pasajeros").html("<h4>Pasajeros: ["+indicePasajeros+" de "+pasajeros+"]</h4>");
					$("#aviso-txt").html("Únicamente falta introducir "+(pasajeros - indicePasajeros)+" pasajero/s más");
				}else{
					mostrarBillete();
					acabar(pasajeros);
				}
			}
			$("#campo5").val("").focus();
			$("#campo6").val("");
		}
	}

	function mostrarBillete(){
		$("#paso6").show();
	}

	function acabar(p){
		$("#paso5").show().append("<h2>Muy bien, ya puedes imprimir la TARJETA DE EMBARQUE inferior en la que figuran los "+p+" pasajeros.</h2>");
		for(k=0;k<pasajeros;k++){
			$("#paso5").append("<h4>"+nombre[k]+" "+apellidos[k]+"</h4>");
		};
		$("#paso4").hide();
		$("#paso3").hide();
		$("#paso2").hide();
		$("#paso1").hide();
	}

	function otraReserva(){
		$("#paso5").html('');
		$("#campo2").removeAttr("disabled");
		$("#campo3").removeAttr("disabled");
		$("#campo2").val("2");
		$("#campo3").val("2");

		$("#paso6").hide();
		$("#paso5").hide();
		$("#paso4").hide();
		$("#paso3").hide();
		$("#paso2").hide();
		$("#paso1").show();

		pasajeros = 0;
		indicePasajeros=0;
		nombre=[];
		apellidos=[];
	}

	function imprimir() {
		//guardamos en una variable el contenido de la etiqueta que queremos imprimir
		var contenido=document.getElementById('tarjeta').innerHTML;

		//abrir una ventana con nombre popimpr
		var miVentana=window.open("", "popimpr", "width=700,height=350");

		//abrir documento dentro de la ventana
		miVentana.document.open();

		//escribir dentro del documento de la ventana emergente
		miVentana.document.write(contenido);

		//cerrar documento
		miVentana.document.close();
		
		miVentana.onload=function() {
			//imprimir contenido de la ventana
			miVentana.print();

			//cerrar ventana
			miVentana.close();
		}
		
	}
