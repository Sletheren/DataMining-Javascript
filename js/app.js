jQuery(function($) {
	'use strict';
	var size=0;
	var elem=0;
	$(document).ready(function() {
		new WOW().init();
		
		$("div.sletheren-tab-menu>div.list-group>a").click(function(e) {
			e.preventDefault();
			$(this).siblings('a.active').removeClass("active");
			$(this).addClass("active");
			var index = $(this).index();
			$("div.sletheren-tab>div.sletheren-tab-content").removeClass("active");
			$("div.sletheren-tab>div.sletheren-tab-content").eq(index).addClass("active");
		});
	});
	
	$('#calctp1').on('click',function(){
		var x1 = parseInt($('#tp1 .xA').val());
		var x2 = parseInt($('#tp1 .yA').val());
		var y1 = parseInt($('#tp1 .xB').val());
		var y2 = parseInt($('#tp1 .yB').val());
		$('#table1 .x1').html(x1);
		$('#table1 .x2').html(x2);
		$('#table1 .y1').html(y1);
		$('#table1 .y2').html(y2);
		
		$('#tp1 .xA').val('');
		$('#tp1 .xB').val('');
		$('#tp1 .yA').val('');
		$('#tp1 .yB').val('');
		
		console.log(Math)
		var result = Math.sqrt(Math.pow((y2 - y1),2) + Math.pow((x2 - x1),2)).toPrecision(4);
		$('#tp1 .result').removeClass('wow');
		$('#tp1 .result').removeClass('fadeInUp');
		$('#tp1 .result').removeClass('animated');
		setTimeout(function(){
		$('#tp1 .result').addClass('wow fadeInUp animated');
		},10);
		$('#tp1 .dist').html(result);
	});
	
	$('#tp2 #generateVector').on('click',function(){
		size = parseInt($('#tp2 #vectorSize').val());
		if(!isNaN(size)){
			var header = '<table id="table2" class="table table-bordered"><thead class="hidden"><tr><th></th>';
		  	var bodyA = '</tr></thead><tbody><tr><td>A</td>';
			var bodyB = '</tr><tr><td>B</td>';
			var bottom = '</tr></tbody></table>';
			
			var cols = '';
			var tdsA = '';
			var tdsB = '';
			for(var i = 0;i<size;i++){
				cols+='<th></th>';
				tdsA+='<td><input type="text" class="inputmini" id="A'+i+'" /></td>';
				tdsB+='<td><input type="text" class="inputmini" id="B'+i+'" /></td>';
			}
			
			var html = header+cols+bodyA+tdsA+bodyB+tdsB+bottom;
			$('#tp2 .vectors').html('');
			$('#tp2 .vectors').html(html);
			$('#tp2 #calctp2').removeClass('hidden');
		}
	});
	
	$('#calctp2').on('click',function(e){
		e.preventDefault();
		var m11 = 0;
		var m01 = 0;
		for(var i = 0;i<size;i++){
			var a = parseInt($("#tp2 #A"+i).val());
			var b = parseInt($("#tp2 #B"+i).val());
			if(a == 1 && a == b){
				m11++;
			}
			else if(a != b){
				m01++;
			}
		}
		var result = m11/(m11+m01).toPrecision(4);
		$('#tp2 .result').removeClass('hidden');
		$('#tp2 #vectorSize').val('');
		$('#tp2 .result').removeClass('fadeInUp');
		$('#tp2 .result').removeClass('animated');
		$('#tp2 .result').addClass('wow fadeInUp animated');
		$('#tp2 .dist').html(result);
	});
	
	$('#tp4 #generateVector').on('click',function(){
		elem = parseInt($('#tp4 #vectorSize').val());
		if(!isNaN(elem)){
			var header = '<table id="table4" class="table table-bordered"><thead><tr><th>Elements</th><th>X</th><th>Y</th></tr></thead><tbody>';
			var bottom = '</tbody></table>';
			var rows ='';
			for(var i = 1;i<=elem;i++){
				rows+='<tr><td>'+i+'</td><td><input type="text" class="inputmini" id="X'+i+'" /></td><td><input type="text" class="inputmini" id="Y'+i+'" /></td></tr>';
			}
			
			var html = header+rows+bottom;
			$('#tp4 .vectors').html('');
			$('#tp4 .vectors').html(html);
			$('#tp4 #calctp4').removeClass('hidden');
		}
	});
	
	$('#calctp4').on('click',function(e){
		console.log('clicked');
		e.preventDefault();
		var X = 0;
		var Y = 0;
		var XX = 0;
		var YY = 0;
		var XY = 0;
		for(var i = 1;i<=elem;i++){
			var x = parseInt($("#tp4 #X"+i).val());
			var y = parseInt($("#tp4 #Y"+i).val());
			console.log(x);
			console.log(y);
			X += x;
			Y += y;
			XX+= Math.pow(x,2);
			YY += Math.pow(y,2);			
			XY += x*y;			
		}
		var formula = (elem*XY - (X*Y))/Math.sqrt((elem*XX-(X*X))*((elem*YY)-(Y*Y))).toPrecision(4);
		if(isNaN(formula)){
			alert('Impossible');
			return;
		}
		console.log(formula);
		$('#tp4 .result').removeClass('hidden');
		$('#tp4 #vectorSize').val('');
		$('#tp4 .result').removeClass('fadeInUp');
		$('#tp4 .result').removeClass('animated');
		setTimeout(function(){
			$('#tp4 .result').addClass('wow fadeInUp animated');
			$('#tp4 .dist').html(formula);
		},10)
		
	});
});