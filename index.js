/**
 * @param {Int} +-accuracy in millisecond
 */
function Time(accuracy) {
    if(!(this instanceof Time)) {
        return new Time(accuracy);
    }

    this.accuracy = accuracy;
    this.remote = {
        url: '//server-time.herokuapp.com',
        key: 'timestamp_millisecond'
    };
}

Time.prototype.request = function(data, callback) {
    $.ajax(data).done(function(res) {
        return callback(null, res);
    }).fail(function(res, err) {
        return callback(err);
    })
};

Time.prototype.setRemote = function(remote) {
    this.remote = remote;
};

/**
 * get server and client time offset
 * @param {Function} callback function
 * @return {Int} offset
 */
Time.prototype.getOffSet = function(callback) {
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
Time.prototype.check = function(callback) {
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