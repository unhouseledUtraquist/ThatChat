﻿// Declare a proxy to reference the hub.
var chat = $.connection.chatHub;

// Create a function that the hub can call to broadcast messages.
chat.client.broadcastMessage = function (name, message) {
    // Html encode display name and message.
    var encodedName = $('<div />').text(name).html();
    var encodedMsg = $('<div />').text(message).html();
    // Add the message to the page.
    $('#discussion').append('<li><div class="active accnt">' + encodedName
        + ':&nbsp;&nbsp; </div>' + encodedMsg + '</li>');
};

// Set initial focus to name input box.
$('#displayname').focus();

// Start the connection.
$.connection.hub.start().done(function () {
    $('#sendmessage').click(function () {
        // Call the Send method on the hub.
        chat.server.send($('#message').val());
        // Clear text box and reset focus for next comment.
        $('#message').val('').focus();
    });

    $('#setname').click(function () {
        // Call the Send method on the hub.
        chat.server.setName($('#displayname').val());
        // Clear text box and reset focus for next comment.
        $('#displayname').val('').focus();
    });

    chat.server.init($('#displayname').val());
});

