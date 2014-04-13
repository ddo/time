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

        console.log(diff);

        if(client <= -diff && client >= diff) {
            return callback(null, true);
        }

        return callback(null, false);
    }).fail(function(res, error) {
        return callback('Server Error');
    });
}