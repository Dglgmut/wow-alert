function wow_default_alert () {
	alert("Hello World!");
}
function wow_default_alert_with_callback(){
	confirm("Hello World! Press 'YES' & Check Your Console Log.",
	{
		callback: function (response) {
			console.log(response);
		}
	}
	);
}
