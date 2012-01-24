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
 		
 		//THIS IS WHERE I'M HAVING TROUBLE
 		$('.task').each(function(){
 			abp2 = parseInt($(this).find('.abp:input').val());
 			
 			console.log(abp2);

 			hp2 = parseInt($(this).find('.hp:input').val());

 			console.log(hp2);

 			task =  hp2 - abp2;
			
			// How do I get the values of task transferred out of this each function so I can use the numbers in the next part of the equation?
			
 			console.log(task);
 			
 		})
 		 		
		var bufferPower = Math.pow((hp - abp),2);
		var bufferRoot = Math.sqrt(bufferPower);
		var estimate = (bufferRoot + abp).toFixed(1);
		var time = $('#time').val();
		$('#estimate').hide().html(estimate+' '+time).fadeIn();
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




