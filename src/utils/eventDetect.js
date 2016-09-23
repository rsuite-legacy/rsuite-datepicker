/**
 * Keep using your grandpa's browser ( IEx etc ),
 * and don't complain for a poor user experience
 */

export function transitionEndDetect() {

    let prefixes = [
        '',
        'webkit',
        'o'
    ];

    for(let i = 0, len = prefixes.length; i < len; i++) {
        let vender = prefixes[i];
        if(`on${vender}transitionend` in window) {
            return {
                supported: true,
                event: (vender ? vender + 'T' : 't') + 'ransitionend'
            };
        }
    }

    return { supported: false };
}
