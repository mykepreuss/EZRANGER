/* Author:
	@mykepreuss
*/

$(function() {
	function estimate(){
		var x = parseInt($('#abp').val());
		var y = parseInt($('#hp').val());
		var estimate = (x + (Math.sqrt(x + y))).toFixed(1);
		var time = $('#time').val();
		$('#estimate').html(estimate+' '+time);
	}

	function estimate2(){
		var x = parseInt($('#abp').val());
		var y = parseInt($('#hp').val());
		var bufferRoot = Math.pow((y - x),2);
		console.log(bufferRoot);
		var buffer = Math.sqrt(bufferRoot);
		console.log(buffer);
		var estimate = (buffer + x).toFixed(1);
		var time = $('#time').val();
		$('#estimate2').html(estimate+' '+time);
	}

		
	$('#calculate').click(function(){
		estimate();
		estimate2();
		return false;
	});
});




