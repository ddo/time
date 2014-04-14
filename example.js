var t = time(1000);

t.getOffSet(function(err, offset) {
    console.log(err, offset);
});

t.check(function(err, good) {
    console.log(err, good);
});