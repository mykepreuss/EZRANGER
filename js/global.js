/* Author:
	@mykepreuss
*/

function estimate(){
	// Add up all the ABP's
	var abp = 0;
	$('.abp:input').each(function() {
		abp += parseInt($(this).val());
	});
	
	// Make a variable to hold the difference in our estimates
	var tasks = [];

		$('.task').each(function(){
			var abp = parseInt($(this).find('.abp:input').val());
			var hp = parseInt($(this).find('.hp:input').val());
			var task =  hp - abp;
			
			// Fill the tasks[] variable with the differences of each value
		tasks.push(task);
		});
		
	// Assign the total variable as zero
	var total = 0;
	
	// Add up all of the task values
	for (var i = 0; i< tasks.length; i++) {
		total += Math.pow(tasks[i],2);
	}
		
	// Math time!		
	var buffer = Math.sqrt(total);
	var estimate = (buffer + abp).toFixed(1);
	var time = $('#time').val();
	$('#estimate').hide().html(estimate+' '+time).fadeIn();
};

$(function() {
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
