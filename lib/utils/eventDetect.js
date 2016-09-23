'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transitionEndDetect = transitionEndDetect;
/**
 * Keep using your grandpa's browser ( IEx etc ),
 * and don't complain for a poor user experience
 */

function transitionEndDetect() {

    var prefixes = ['', 'webkit', 'o'];

    for (var i = 0, len = prefixes.length; i < len; i++) {
        var vender = prefixes[i];
        if ('on' + vender + 'transitionend' in window) {
            return {
                supported: true,
                event: (vender ? vender + 'T' : 't') + 'ransitionend'
            };
        }
    }

    return { supported: false };
}