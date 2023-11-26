const PERMISSIONS = [
    'background-sync',
    'clipboard-read',
    'clipboard-write',
    'geolocation',
    'microphone',
    'camera',
    'notifications',
    'payment-handler',
    'push',
    'accelerometer',
    'gyroscope',
    'magnetometer',
    'ambient-light-sensor',
    'storage-access',
    'persistent-storage',
    'speaker-selection',
    'midi',
    'window-management',
];

function canvasHash() {
    // https://fingerprint.com/blog/canvas-fingerprinting/

    var canvas = document.getElementById("canvasTest");
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.rect(20, 20, 150, 100);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,255,255)";
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();   
    ctx.closePath();
    
    txt = 'abz190#$%^@£éú';
    ctx.textBaseline = "top";
    ctx.font = '17px "Arial 17"';
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgb(255,5,5)";
    ctx.rotate(.03);
    ctx.fillText(txt, 4, 17);
    ctx.fillStyle = "rgb(155,255,5)";
    ctx.shadowBlur=8;
    ctx.shadowColor="red";
    ctx.fillRect(20,12,100,5);
    
    // hashing function
    src = canvas.toDataURL();
    hash = 0;
    
    for (i = 0; i < src.length; i++) {
        char = src.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    
    return hash
}

function getPermissionState(permissionName) {
    var result = "failed"
    if (!navigator.permissions) {
        return result
    }
    return navigator.permissions.query({name: permissionName}).then((result) => {
        return result.state;
    }).catch(error => {
        return "failed";
    });
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateFpData() {
    var data = [];
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator
    if (navigator.oscpu) {
        data["cpu"] = navigator.oscpu;
    }
    if (navigator.hardwareConcurrency) {
        data["cpuCores"] = navigator.hardwareConcurrency;
    }
    if (navigator.deviceMemory) {
        data["memory"] = navigator.deviceMemory;
    }
    if (navigator.gpu) {
        data["gpu"] = navigator.gpu;
    }
    if (navigator.bluetooth) {
        data["bluetooth"] = navigator.bluetooth;
    }
    if (navigator.hid) {
        data["hid"] = navigator.hid;
    }
    // gui
    data["screen"] = window.screen;
    data["size"] = window.innerWidth + ":" + window.innerHeight;
    if ("queryLocalFonts" in window) {
        data["fonts"] = window.queryLocalFonts();
    }
    data["canvasHash"] = canvasHash();
    // generic
    if (navigator.geolocation) {
        var permissionGeoLocation = getPermissionState('geolocation');
        if (permissionGeoLocation === "granted") {
            navigator.geolocation.getCurrentPosition(function(location){
                data["location"] = location;
            }, function(error) {
                data["location"] = "failed";
            });
        } else {
            data["location"] = permissionGeoLocation;
        }
    }
    PERMISSIONS.forEach(perm => {
        if (navigator.permissions) {
            data["permission" + capitalize(perm)] = getPermissionState(perm);
        }
    });

    PERMISSIONS
    if (navigator.cookieEnabled) {
        data["cookies"] = navigator.cookieEnabled;
    }
    if (navigator.language) {
        data["language"] = navigator.language;
    }
    if (navigator.languages) {
        data["languages"] = navigator.languages;
    }
    if (navigator.maxTouchPoints) {
        data["maxTouchPoints"] = navigator.maxTouchPoints;
    }
    if (navigator.pdfViewerEnabled) {
        data["pdfViewer"] = navigator.pdfViewerEnabled;
    }
    /*
    maybe useful
    if (navigator.mediaCapabilities) {
        data["mediaCapabilities"] = navigator.mediaCapabilities;
    }
    if (navigator.mediaDevices) {
        data["mediaDevices"] = navigator.mediaDevices;
    }
    if (navigator.storage) {
        data["storage"] = navigator.storage;
    }
    */
    if (navigator.usb) {
        data["usb"] = navigator.usb;
    }
    if (navigator.userAgent) {
        data["userAgent"] = navigator.userAgent;
    }
    if (navigator.userAgentData) {
        data["userAgentData"] = navigator.userAgentData;
    }
    if (navigator.connection) {
        data["connection"] = navigator.connection;
    }
    if (navigator.getBattery) {
        data["battery"] = navigator.getBattery();
    } else {
        var battery = navigator.getBattery || navigator.webkitBattery || navigator.mozBattery;
        if (battery) {
            data["battery"] = battery;
        }
    }
    if (navigator.getGamepads) {
        data["gamepads"] = navigator.getGamepads();
    }
    data["supportsVibrate"] = navigator.vibrate.length > 0 || navigator.mozVibrate;
    data["supportsTouch"] = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    data["supportsLightLevel"] = 'ondevicelight' in window || 'onlightlevel' in window;
    data["supportsDeviceMotion"] = 'DeviceMotionEvent' in window;
    data["supportsDeviceOrientation"] = 'DeviceOrientationEvent' in window;
    data["supportsDeviceProximity"] = 'ondeviceproximity' in window;
    data["supportsUserProximity"] = 'userproximity' in window;
    // checks
    data["check1"] = eval.toString().length;
    if (data["check1"] == 33) {
        data["check2"] = windows.Chrome;
    }
    if (navigator.permissions) {
        navigator.permissions.query({
            name: 'notifications'
        }).then(function(permissionStatus) {
            data["check3"] = Notification.permission === 'denied' && permissionStatus.state === 'prompt';
        });
    }
    // deprecated
    if (navigator.vendor) {
        data["vendor"] = navigator.vendor;
    }
    if (navigator.platform) {
        data["platform"] = navigator.platform;
    }
    if (navigator.plugins) {
        data["plugins"] = navigator.plugins;
    }
    if (navigator.vendorSub) {
        data["vendorSub"] = navigator.vendorSub;
    }
    if (navigator.appName) {
        data["appName"] = navigator.appName;
    }
    if (navigator.appCodeName) {
        data["appCodeName"] = navigator.appCodeName;
    }
    if (navigator.appVersion) {
        data["appVersion"] = navigator.appVersion;
    }
    console.log(data);
    // document.getElementById("rawFp").innerHTML = toJson(data);
}