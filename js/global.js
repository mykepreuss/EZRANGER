/* Author:
	@mykepreuss
*/

$(function() {
	
	//task prototype (not currently using)
	function task(abp, hp){
		this.abp = abp;
		this.hp = hp;
	};
	
	// not currently using
	var singleTask = {
		abp: parseInt($(this).find('.abp:input').val()),
		hp: parseInt($(this).find('.hp:input').val())
	}
	
	function estimate(){
		//Add up all the ABP's
		var abp = 0;	
		$('.abp:input').each(function() {
			abp += parseInt($(this).val());
		});

		//Add up all the HP's	
		var hp = 0;	
		$('.hp:input').each(function() {
			hp += parseInt($(this).val());
		});
 		 		
		var tasks = [];
 		$('.task').each(function(){
 			var abp2 = parseInt($(this).find('.abp:input').val()); 			
 			var hp2 = parseInt($(this).find('.hp:input').val());

 			var task =  hp2 - abp2;
			tasks.push(task);
 			
 		})

 		console.log(tasks);
 		 		
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




