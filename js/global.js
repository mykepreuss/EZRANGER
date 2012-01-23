/* Author:
	@mykepreuss
*/

$(function() {
	function estimate(){
		var x = parseInt($('#abp').val());
		var y = parseInt($('#hp').val());
		var estimate = x + (Math.sqrt(x + y));
		var time = $('#time').val();
		$('#estimate').html(estimate+' '+time);
	}
		
	$('#calculate').click(function(){
		estimate();
		return false;
	});
});




