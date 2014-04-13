/**
 * compare client and server time
 * @param {Int} +-error in second
 * @param {Function} callback function
 * @return {Boolean}
 */
function checkServerTime(error, callback) {
    error *= 1000;
    $.ajax({
        url: '//server-time.herokuapp.com',
        cache: false,
        timeout: error
    }).done(function(res) {
        if(!res.timestamp_millisecond) {
            return callback('Server Error');
        }

        var server = res.timestamp_millisecond;
        var client = (new Date()).getTime();

        var diff = server - client;

        diff = diff > 0 ? diff : -diff;

        console.log(diff);

        return callback(null, diff <= error);

    }).fail(function(res, e) {
        return callback('Server Error');
    });
}