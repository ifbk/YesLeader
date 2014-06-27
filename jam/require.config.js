var jam = {
    "packages": [
        {
            "name": "device",
            "location": "jam/device",
            "main": "srt-0.9.js"
        }
    ],
    "version": "0.2.17",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "device",
            "location": "jam/device",
            "main": "srt-0.9.js"
        }
    ],
    "shim": {}
});
}
else {
    var require = {
    "packages": [
        {
            "name": "device",
            "location": "jam/device",
            "main": "srt-0.9.js"
        }
    ],
    "shim": {}
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}