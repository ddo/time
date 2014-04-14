var time = Time(1000);

time.getOffSet(function(err, offset) {
    console.log('getOffSet()');
    console.log(err, offset);
});

time.check(function(err, good) {
    console.log('check()');
    console.log(err, good);
});