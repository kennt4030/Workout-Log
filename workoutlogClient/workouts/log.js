$(function() {
	$.extend(WorkoutLog, {
		log: {
			workouts: [],

			setDefinitions: function() {
                var defs = WorkoutLog.definition.userDefinitions;
                var len = defs.length;
                var opts;
                for (var i = 0; i < len; i++) {
                    opts += "<option value='" + defs[i].id +"'>" + defs[i].description + "</option>";
                }
                $("#log-definition").children().remove();
                $("#log-definition").append(opts);
            },

			setHistory: function() {
                var history = WorkoutLog.log.workouts;
                var len = history.length;
                var lis = "";
                for (var i = 0; i < len; i++) {
                    lis += "<li class='list-group-item'>" + history[i].def + " - " + history[i].result + "</li>";
                }
                $("#history-list").children().remove();
                $("#history-list").append(lis);
			},
			create: function() {
                var itsLog = { 
                    desc: $("#log-description").val(),
                     result: $("#log-result").val(),
                     def: $("#log-definition option:selected").text()
                    };
                var postData = { log: itsLog };
                var logger = $.ajax({
                     type: "POST",
                     url: WorkoutLog.API_BASE + "log",
                     data: JSON.stringify(postData),
                     contentType: "application/json"
                    });
                
            logger.done(function(data) {
                        WorkoutLog.log.workouts.push(data);
                        $("#log-description").val("");
					            $("#log-result").val("");
					            $('a[href="#history"]').tab("show");
                    });
                
            },

            getWorkout: function() {
				var thisLog = {id: $(this).attr("id")};
				console.log(thisLog);
				logID = thisLog.id;
				var updateData = { log: thisLog };
				var getLog = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log/" + logID,
					data: JSON.stringify(updateData),
					contentType: "application/json"
				});
				getLog.done(function(data){
					
				    $('a[href="#update-log"]').tab("show");
					$('#update-result').val(data.result);
					$('#update-description').val(data.description);
					$('#update-id').val(data.id);
				});

			},

			updateWorkout: function() {
				$("#update").text("Update");
				var updateLog = { 
					id: $('#update-id').val(),
					desc: $("#update-description").val(),
						result: $("#update-result").val(),
						def: $("#update-definition option:selected").text()
				};
				for(var i = 0; i < WorkoutLog.log.workouts.length; i++){
					if(WorkoutLog.log.workouts[i].id == updateLog.id){
						WorkoutLog.log.workouts.splice(i, 1);
					}
				}
				WorkoutLog.log.workouts.push(updateLog);
				var updateLogData = { log: updateLog };
				var updater = $.ajax({
						type: "PUT",
						url: WorkoutLog.API_BASE + "log",
						data: JSON.stringify(updateLogData),
						contentType: "application/json"
				});

				updater.done(function(data) {
					console.log(data);
					$("#update-description").val("");
					$("#update-result").val("");
					$('a[href="#history"]').tab("show");
				});

            },
                // History
			fetchAll: function() {
                var fetchDefs = $.ajax({
                    type: "GET",
                    url: WorkoutLog.API_BASE + "log",
                    headers: {
                        "authorization": window.localStorage.getItem("sessionToken")
                    }
                 })
                 .done(function(data) {
                    WorkoutLog.log.workouts = data;
                 })
                 .fail(function(err) {
                    console.log(err);
                 });
               
            }
        }  
    });
    
    $("#log-save").on("click", WorkoutLog.log.create);

        // fetch history if we are already authenticated and refreshed
    if (window.localStorage.getItem("sessionToken")) {
        WorkoutLog.log.fetchAll();
     }
  });
