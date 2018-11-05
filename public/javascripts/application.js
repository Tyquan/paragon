window.addEventListener("load", function(e){
	var path = window.location.pathname.split("/");
	$.get("/jobs/" + path[3]).then((data) => {
		// skills
		var skillUl = $("<ul>");
		var skills = data.requiredSkills.split("-");
		for (var i = 1; i < skills.length; i++) {
			skillUl.append("<li>" + skills[i] + "</li>");
		}
		// details
		var detailsUl = $("<ul>");
		var details = data.details.split("-");
		for (var i = 1; i < details.length; i++) {
			detailsUl.append("<li>" + details[i] + "</li>")
		}
		// benefits
		var benefitsUl = $("<ul>");
		var benefits = data.benefits.split("-");
		for (var i = 1; i < benefits.length; i++) {
			benefitsUl.append("<li>" + benefits[i] + "</li>")
		}
		$("#skills").append(skillUl);
		$("#details").append(detailsUl);
		$("#benefits").append(benefitsUl);
	}).catch((error) => {
		console.log(error);
	});
});