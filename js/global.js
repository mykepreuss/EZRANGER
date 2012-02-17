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
		
		// Check to see if the ABP is lower than HP
		if(hp < abp ){
			tasks.push('tooHigh');
		}else{
			// Fill the tasks[] variable with the differences of each value
			tasks.push(task);
		}
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

	console.log(tasks);

	if ($.inArray('tooHigh', tasks) > -1){
		$('#estimate').hide().html('Make sure all ABP values are lower than HP values').fadeIn();	
	} else if (estimate === 'NaN'){
		$('#estimate').hide().html('Make sure to enter numbers for all fields').fadeIn();
	} else {
		$('#estimate').hide().html(estimate+' '+time).fadeIn();
	};
};

$(function() {
	// Add More Tasks Button
	$('#addTaskBtn').click(function(){
		var newTask = '<div class="task"><h3 contenteditable="true">Task Title</h3><p><label name="abp">ABP: </span><input type="number" step="0.5" name="abp" class="abp" /></p><p><label name="abp">HP: </span><input type="number" step="0.5" name="hp" class="hp" /></p><div class="removeTask"><a href="#">Remove Task</a></div></div>';
		$(newTask).hide().appendTo('#form').fadeIn();
		$('#estimate').hide();
		return false;
	});
	
	// Remove Task Button
	$('#form').on('click', '.removeTask a', function(){
		// Check to see there at least 2 tasks
		if ($('.task').length > 2){
			$(this).parent().parent().remove();
		} else {
			$('#estimate').hide().html('You must have at least 2 tasks').fadeIn();
		}
		return false;
	});

	// Enter Key Blur
	$(".task h3, #projectTitle").keypress(function(event){
  		if (event.which == 13){
     		$(this).blur();
     		return false;
   		}
	});

	// Update Time Value
	$('#time').change(function(){
		estimate();
	})

	// Perform Calculation
	$('#calculateBtn').click(function(){
		estimate();
		return false;
	});
});