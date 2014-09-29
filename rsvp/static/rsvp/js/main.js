// The length for all our RSVP related animations in milliseconds.
var anim_len = 400;

// Performs the AJAX process for submitting the invite ID.
function submitId() {
    // Fade out the message and form.
    $("#rsvp-message").fadeOut(anim_len);
    $("#rsvpInputForm").animate({
        opacity: 0,
        left: "200"},
        anim_len, 
        // Perform the request after we've animated away.
        function() {
            var input = $("#rsvpIdInput").val();
            $.ajax({
                type: "GET",
                url: "/rsvp/" + input + "/",
                data: $("#rsvpInputForm").serialize(),
                success: handleSubmitId,
                error: handleSubmitIdFail,
                dataType: "json"
            });
        });
    // Prevent default form action.
    return false;
}

// Handles a server error during ID submission.
function handleSubmitIdFail() {
    // Set the message to an error string.
    $("#rsvp-message").text("Invalid invitation number.");
    // Fade everything back in.
    $("#rsvp-message").fadeIn(anim_len);
    $("#rsvpInputForm").animate({
        opacity: 1.0,
        left: "0"}, anim_len);
}

// Handles the successful server response after submitting the ID.
function handleSubmitId(data) {
    // Construct a table with the invitees names and some
    // "Going" checkboxes..
    var table = $("<table></table>").addClass("table");
    var headerRow = $("<tr></tr>");
    headerRow.append($("<th></th>").text('Going?'));
    headerRow.append($("<th></th>").text('First Name'));
    headerRow.append($("<th></th>").text('Last Name'));
    table.append(headerRow);
    for (var i = 0; i < data.people.length; i++) {
        // Create a row.
        var row = $("<tr></tr>");
        row.append($("<td></td>").html(
            '<input name="' + data.people[i].id + '" type="checkbox"></input>'));
        row.append($("<td></td>").text(data.people[i].first));
        row.append($("<td></td>").text(data.people[i].last));
        table.append(row);
    }
    // Stuff our new content into the page.
    $("#rsvpInputBlock").html("<label>Guests</label>");
    $("#rsvpInputBlock").append('<input id="rsvpIdInput" type="hidden" value="' + data.invite + '"></input>');
    $("#rsvpInputBlock").append(table);
    // Set up the new click handler.
    $("#rsvpButton").unbind("click");
    $("#rsvpButton").click(submitResponse);
    // Update the message.
    $("#rsvp-message").text("Please check the box next to the name of whoever will be attending.");
    // Animate everything back in.
    $("#rsvp-message").fadeIn(anim_len);
    $("#rsvpInputForm").animate({
        opacity: 1.0,
        left: "0"}, anim_len);
}

// Performs the AJAX request that submits the RSVP information.
function submitResponse() {
    // Fade out the message and form.
    $("#rsvp-message").fadeOut(anim_len);
    $("#rsvpInputForm").animate({
        opacity: 0,
        left: "200"},
        anim_len, 
        // Perform the request after the animation is done.
        function() {
            var id = $("#rsvpIdInput").val();
            $.ajax({
                type: "POST",
                url: "/rsvp/" + id + "/",
                data: $("#rsvpInputForm").serialize(),
                success: handleSubmitResponse,
                error: handleSubmitResponseFail,
                dataType: "json"
            });
        });
    // Prevent default form action.
    return false;
}
// Handles the successful server response after submitting the RSVP info.
function handleSubmitResponse(data) {
    // Build a table with the results.
    var table = $("<table></table>").addClass("table");
    var headerRow = $("<tr></tr>");
    headerRow.append($("<th></th>").text('Going?'));
    headerRow.append($("<th></th>").text('First Name'));
    headerRow.append($("<th></th>").text('Last Name'));
    table.append(headerRow);
    for (var i = 0; i < data.length; i++) {
        // Create a row.
        var row = $("<tr></tr>");
        row.append($("<td></td>").text(data[i].going));
        row.append($("<td></td>").text(data[i].first));
        row.append($("<td></td>").text(data[i].last));
        table.append(row);
    }
    // Stuff the new stuff into our page.
    $("#rsvpInputForm").html("<label>Confirmation</label>");
    $("#rsvpInputForm").append(table);
    // Update the message.
    $("#rsvp-message").text("Thank you for your response! We look forward to seeing you!");
    // Animate it all back in.
    $("#rsvp-message").fadeIn(anim_len);
    $("#rsvpInputForm").animate({
        opacity: 1.0,
        left: "0"}, anim_len);
}

// Handles a server error during RSVP submission.
function handleSubmitResponseFail() {
    $("#rsvp-message").text("An error has occured. Please refresh the page and retry or contact Chris or Hannah directly.");
    $("#rsvp-message").fadeIn(anim_len);
}

// This needs to be called after the page loads to initialize everything.
function rsvpSetup() {
    // Register a handler for when the user submits their
    // reservation ID.
    $("#rsvpButton").click(submitId);
    $("#rsvp-message").text("Please reply by November 6th.");
}

