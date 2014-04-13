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

        var diff = server - client;

        diff = diff > 0 ? diff : -diff;

        console.log(diff);

        return callback(null, diff <= error);

    }).fail(function(res, e) {
        return callback('Server Error');
    });
}