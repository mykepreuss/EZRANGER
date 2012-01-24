/* Author:
	@mykepreuss
*/

$(function() {
	function estimate(){
		//Add up all the ABP's
		abp = 0;	
		$('.abp:input').each(function() {
			abp += parseInt($(this).val());
		});
		
		//Add up all the HP's	
		hp = 0;	
		$('.hp:input').each(function() {
			hp += parseInt($(this).val());
		});
 			
		var bufferRoot = Math.pow((hp - abp),2);
		var buffer = Math.sqrt(bufferRoot);
		var estimate = (buffer + abp).toFixed(1);
		var time = $('#time').val();
		$('#estimate').html(estimate+' '+time);
	};

		
	$('#calculate').click(function(){
		estimate();
		return false;
	});
	
	// Add More Tasks Button	
	$('#addTask').click(function(){
		var newTask = '<div class="task"><p><label name="abp">ABP:</span><input type="text" name="abp" class="abp" /></p><p><label name="abp">HP:</span><input type="text" name="hp" class="hp" /></p></div>';
		$(newTask).hide().appendTo('#form').fadeIn();
	})
});




