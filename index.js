/**
 * @param {Int} +-accuracy in millisecond
 */
function time(accuracy) {
    if(!(this instanceof time)) {
        return new time(accuracy);
    }

    this.accuracy = accuracy;
    this.remote = {
        url: '//server-time.herokuapp.com',
        key: 'timestamp_millisecond'
    };
}

time.prototype.request = function(data, callback) {
    $.ajax(data).done(function(res) {
        return callback(null, res);
    }).fail(function(res, err) {
        return callback(err);
    })
};

time.prototype.setRemote = function(remote) {
    this.remote = remote;
};

/**
 * get server and client time offset
 * @param {Function} callback function
 * @return {Int} offset
 */
time.prototype.getOffSet = function(callback) {
    var self = this;
    //to calculate the loading time
    var now = (new Date()).getTime();

    this.request({
        url: self.remote.url,
        cache: false
    }, function(err, res) {
        var client       = (new Date()).getTime();
        var loading_time = client - now;

        console.log('Loading time', loading_time);

        if(err) {
            return callback(err);
        }

        if(!res[self.remote.key]) {
            return callback('Server Error');
        }

        var server = res.timestamp_millisecond - loading_time;

        return callback(null, client - server);
    });
}

/**
 * compare client and server time

 * @param {Function} callback function
 * @return {Boolean}
 */
time.prototype.check = function(callback) {
    var self = this;

    this.getOffSet(function(err, offset) {
        if(err) {
            return callback(err);
        }

        offset = offset > 0 ? offset : -offset;

        console.log('Accuracy', self.accuracy);
        console.log('Offset', offset);

        return callback(null, offset <= self.accuracy);
    })
}

if(typeof module !== 'undefined' && module.exports) {
    module.exports = time;
}