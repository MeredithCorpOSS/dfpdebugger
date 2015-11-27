var enabled = false;

function printToCurrent (string) {
    chrome.tabs.executeScript ({
        code : 'console.log("DFPDEBUG: ' + string.replace (/"/g, /\\"/) + '");'
    });
}

function group () {
    return;
    chrome.tabs.executeScript ({
        code : 'console.group();'
    });
}

function groupEnd () {
    return;
    chrome.tabs.executeScript ({
        code : 'console.groupEnd();'
    });
}

function queryToObject (query) {
    var result = {};
    query.split ('&').forEach (function (pair) {
        var segments = pair.split ('=');
        result[decodeURIComponent (segments[0])] = decodeURIComponent (segments[1]);
    });
    return result;
}

function parseCreative (creative) {

    Object.keys (creative).forEach (function (key) {
        if ( key.indexOf ('/') === 0 ) {
            var object = creative[key], network = key.replace (/^\//, '').replace (/\/.+$/, '');
            printToCurrent ('Size: ' + (object._width_ + ' x ' + object._height_));
            group ();
            printToCurrent ('AdUnit: ' + key);

            printToCurrent ('Line Items: ' + (object._adgroup2_ids_ || []).join (', '));
            group ();
            object._adgroup2_ids_.forEach (function (id) {
                printToCurrent ('https://www.google.com/dfp/' + network + '#delivery/LineItemDetail/lineItemId=' + id);
            });
            groupEnd ();
            printToCurrent ('Creatives: ' + (object._creative_ids_ || []).join (', '));
            group ();
            object._creative_ids_.forEach (function (id) {
                printToCurrent ('https://www.google.com/dfp/' + network + '#delivery/CreativeDetail/creativeId=' + id);
            });
            groupEnd ();
            printToCurrent ('Empty: ' + (object._empty_ ? 'true' : 'false'));

            printToCurrent ('Type: ' + (object._type_));
            groupEnd ();
            printToCurrent ('----------------------------');
        }
    });

}

function listen (details) {

    if ( details.url.indexOf ('https://securepubads.g.doubleclick.net/gampad/ads') === 0 ) {
        if ( details.parentFrameId === -1 ) return;

        printToCurrent ('============================');
        printToCurrent ('DFP Debugger');
        printToCurrent ('============================');

        printToCurrent (details.url);

        var parts = queryToObject (details.url.replace (/^.+\?/, ''));

        if ( parts.cust_params ) {
            printToCurrent ('----------------------------');
            printToCurrent ('Requested Custom Parameters');
            printToCurrent ('----------------------------');
            group ();
            var custom = queryToObject (parts.cust_params);
            Object.keys (custom).forEach (function (key) {
                printToCurrent (key + ' : ' + custom[key]);
            });
            groupEnd ();
            printToCurrent ('============================');

        }

        var slots = [];

        if ( parts.prev_iu_szs ) {
            parts.prev_iu_szs.split (',').forEach (function (sizeSet) {
                slots.push ({
                    sizes : sizeSet.split ('|')
                })
            });
        }

        if ( parts.prev_scp ) {
            parts.prev_scp.split ('|').forEach (function (targetting, index) {
                if ( slots[index] ) {
                    slots[index].targeting = queryToObject (targetting);
                }
            });
        }

        if ( slots.length > 0 ) {
            printToCurrent ('----------------------------');
            printToCurrent ('Requested Slots');
            printToCurrent ('----------------------------');

            slots.forEach (function (slot) {
                printToCurrent ('Sizes: ' + slot.sizes.join (', '));
                group ();
                if ( slot.targeting ) {
                    Object.keys (slot.targeting).forEach (function (key) {
                        printToCurrent (key + ' = ' + slot.targeting[key]);
                    });
                }
                groupEnd ();
                printToCurrent ('----------------------------');
            });

            printToCurrent ('============================');
        }

        var req = new XMLHttpRequest ();
        req.open ("GET", details.url, true);
        req.onreadystatechange = function () {
            if ( req.readyState == 4 ) {
                if ( req.status == 200 ) {
                    var data = req.responseText.replace (/^callbackProxy\(/, '').replace (/\);$/, '').replace (/\\/g, '\\\\');
                    data = JSON.parse (data);

                    printToCurrent ('----------------------------');
                    printToCurrent ('Received Creatives');
                    printToCurrent ('----------------------------');

                    if(Array.isArray(data)) {
                        data.forEach (parseCreative);
                    } else {
                        parseCreative(data);
                    }

                    printToCurrent ('============================');
                }
                else if ( req.status == 404 ) console.info ("URL doesn't exist!");
                else console.info ("Error: Status is " + req.status)
            }
        };
        req.send ();
    }

}

function enable () {

    enabled = true;
    chrome.browserAction.setIcon ({path : "icon.png"});
    chrome.webRequest.onCompleted.addListener (listen, {
        urls : ["<all_urls>"]
    });

}

function disable () {

    enabled = false;
    chrome.browserAction.setIcon ({path : "icon_disabled.png"});
    chrome.webRequest.onCompleted.removeListener (listen, {
        urls : ["<all_urls>"]
    });

}

chrome.browserAction.onClicked.addListener (function () {
    if ( !enabled ) {
        enable ();
    } else {
        disable ();
    }
});
