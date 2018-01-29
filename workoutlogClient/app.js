// this function is used so we can test our api function//
// run it in the console with npm start//
// if the test works you should see "it is working" in the console of the web page.//
$(document).ready(function(){
    $("#testAPI").on("click", function(){
        console.log("It is working");
    })

    var test = $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/test"
    })
    .done(function(data){
        console.log(data)
    })
    // this function runs if the test fails, you will see "oh no" in the web console
    .fail(function(){
        console.log("Oh No!")
    })
})  