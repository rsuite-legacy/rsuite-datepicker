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

  for (let i = 0, len = prefixes.length; i < len; i += 1) {
    let vender = prefixes[i];
    let prefix = vender ? `${vender}T` : 't';
    if (`on${vender}transitionend` in window) {
      return {
        supported: true,
        event: `${prefix}ransitionend`
      };
    }
  }

  return { supported: false };
}

export default transitionEndDetect;
