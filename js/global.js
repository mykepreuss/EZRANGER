/* Author:
	@mykepreuss
*/

function estimate(){
	// Add up all the ABP's
	var abp = 0;
	$('.abp:input').each(function() {
		abp += parseInt($(this).val());
	});

	// Make an array to hold the difference in our estimates
	var tasks = [];

	$('.task').each(function(){
		var abp = parseInt($(this).find('.abp:input').val()) || 0;
		var hp = parseInt($(this).find('.hp:input').val()) || 0;
		var task =  hp - abp;

		// Check to see if the ABP is lower than HP
		if(hp < abp ){
			tasks.push('tooHigh');
			$(this).addClass('alert alert-block');
		// Check to see if either of the ABP or HP is emtpy
		} else if (abp === 0 || hp === 0){
			$(this).addClass('alert alert-block');
		} else {
			// Fill the tasks[] variable with the differences of each value
			tasks.push(task);
			$(this).removeClass('alert alert-block');
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


	if ($.inArray('tooHigh', tasks) > -1){
		$('#estimate').hide().html('<div class="alert alert-error">Make sure all ABP values are lower than HP values</div>').fadeIn();
	} else if (estimate === 'NaN'){
		$('#estimate').hide().html('<div class="alert alert-error">Make sure to enter numbers for<br />all fields</div>').fadeIn();
	} else {
		$('#estimate').hide().html('<div class="alert alert-success"><div class="estimateTotal">'+estimate+'&nbsp;</div> <div class="time">'+time+'</div></div>').fadeIn();
	};
};

function saveTasksToMemory(){
	var data = {};
	data.projectTitle = $("#projectTitle").text();
	data.time = $("#time").val();
	data.tasks = [];

	$('.task').each(function(){
		var item = {};
		item.title = $(this).find('h3').text();
		item.abp = $(this).find('.abp:input').val();
		item.hp = $(this).find('.hp:input').val();

		data.tasks.push(item);
	});

	// Now save list to memory
	if (Modernizr.localstorage) {
		console.log("yes");
		localStorage.setItem("estimatorData", JSON.stringify(data));	
	} else {
		$.cookie("estimatorData", JSON.stringify(data));
	}
};

function loadTasksFromMemory(){
	// Check for LocalStorage or Cookie
	if (Modernizr.localstorage) {
		var data = JSON.parse(localStorage.getItem('estimatorData'));	
	} else {
		var data = JSON.parse($.cookie("estimatorData"))
	}

	// Create tasks from data
	if (data.projectTitle){
		$("#projectTitle").text(data.projectTitle);
	}

	if (data.time){
		$("#time").val(data.time);
	}


	if (data.tasks){
		var len = data.tasks.length;
		for (var i=0; i < len; ++i){
			// Add each task
			var newTask = '<article class="task"><h3 contenteditable="true">' + data.tasks[i].title + '</h3><p><label for="abp">Aggressive But Possible: </label><input type="number" name="abp" class="abp" value="'+ data.tasks[i].abp + '"/></p><p><label for="abp">Highly Probable: </label><input type="number" name="hp" class="hp" value="'+ data.tasks[i].hp + '"/></p><div class="removeTask"><button class="btn btn-mini"><i class="icon-remove-sign"></i></button></div></article>';
			$(newTask).hide().appendTo('#form').fadeIn();
			$('#estimate').hide();
		}
	}
   estimate();
};

function goToByScroll(id){
	$('html,body').animate({scrollTop: $('#'+id).offset().top},'slow');
}

$(function() {
	// Check for LocalStorage or Cookie
	if (Modernizr.localstorage) {
		// If no cookie create 2 tasks
		if(localStorage.getItem('estimatorData') === null){
			for(i=0; i < 2; ++i){
				var newTask = '<article class="task"><h3 contenteditable="true">Task Title</h3><p><label for="abp">Aggressive But Possible: </label><input type="number" name="abp" class="abp" /></p><p><label for="abp">Highly Probable: </label><input type="number" name="hp" class="hp" /></p><div class="removeTask"><button class="btn btn-mini"><i class="icon-remove-sign"></i></button></div></article>';
				$(newTask).hide().appendTo('#form').fadeIn();
			}
		} else {
			loadTasksFromMemory();
		};
	} else {
		if($.cookie("estimatorData") === null){
			for(i=0; i < 2; ++i){
				var newTask = '<article class="task"><h3 contenteditable="true">Task Title</h3><p><label for="abp">Aggressive But Possible: </label><input type="number" name="abp" class="abp" /></p><p><label for="abp">Highly Probable: </label><input type="number" name="hp" class="hp" /></p><div class="removeTask"><button class="btn btn-mini"><i class="icon-remove-sign"></i></button></div></article>';
				$(newTask).hide().appendTo('#form').fadeIn();
			}
		// Else load cookie
		} else {
			loadTasksFromMemory();
		};
	}

	// Add More Tasks Button
	$('#addTaskBtn').click(function(){
		var newTask = '<article class="task"><h3 contenteditable="true">Task Title</h3><p><label for="abp">Aggressive But Possible: </label><input type="number" name="abp" class="abp" /></p><p><label for="abp">Highly Probable: </label><input type="number" name="hp" class="hp" /></p><div class="removeTask"><button class="btn btn-mini"><i class="icon-remove-sign"></i></button></div></article>';
		$(newTask).hide().appendTo('#form').fadeIn();
		$('#estimate').hide();
		return false;
	});

	// Remove Task Button
	$('#form').on('click', '.removeTask .btn', function(){
		// Check to see there at least 2 tasks
		if ($('.task').length > 2){
			$(this).parent().parent().remove();
			saveTasksToMemory();
			estimate();
		} else {
			$('#estimate').hide().html('<div class="alert alert-error">You must have at least 2 tasks</div>').fadeIn();
			goToByScroll('estimate');

		}
		return false;
	});

	// Enter Key Blur
	$('.task h3, #projectTitle').keypress(function(event){
  		if (event.which == 13){
     		$(this).blur();
     		return false;
   		}
	});

	// Clear Project Title when editing
	$('#projectTitle').focus(function(){
		if($(this).text() === 'Project Title'){
			$(this).text('');
			$(this).focus();
		}
	});

	$('#projectTitle').blur(function(){
		if($(this).text() === ''){
			$(this).text('Project Title');
		}
	});

	// Clear Task Titles when editing
	$('.task h3').focus(function(){
		if($(this).text() === 'Task Title'){
			$(this).text('');
			$(this).focus();
		}
	});

	$('.task h3').blur(function(){
		if($(this).text() === ''){
			$(this).text('Task Title');
		}
	});

	// Update Time Value
	$('#time').change(function(){
		var time = $('#time').val();
		$('.time').hide().html(time).fadeIn();
		saveTasksToMemory();
	});

	// Perform Calculation
	$('#calculateBtn').click(function(){
		estimate();
		saveTasksToMemory();
		goToByScroll('estimate');
		$('#about').children().removeClass('open');
		return false;
	});

	$('.dropdown-toggle').dropdown();
});

var addToHomeConfig = {
	expire: 10080,
	startDelay: 500,
	animationIn: 'fade'
};
