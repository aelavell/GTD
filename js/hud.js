var foo = "bar";

$(document).ready(function() {
    $("a").click(function(event) {
        alert("sry bro, you can't go there");
        event.preventDefault();
    });
});
