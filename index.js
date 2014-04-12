/**
 * compare client and server time
 * @param {Int} +-error in second
 * @param {Function} callback function
 * @return {Boolean}
 */
function checkServerTime(error, callback) {
    error *= 1000;
    $.ajax({
        url: 'http://time.jsontest.com/',
        cache: false,
        timeout: error
    }).done(function(res) {
        if(!res.milliseconds_since_epoch) {
            return callback('Server Error');
        }

        var server = res.milliseconds_since_epoch;
        var client = (new Date()).getTime();

        console.log(server, client);
        console.log(server - client);

        if(client <= server + error && client >= server - error) {
            return callback(null, true);
        }

        return callback(null, false);
    }).fail(function(res, error) {
        return callback('Server Error');
    });
}