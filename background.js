// chrome.tabs.onActivated.addListener((tab) => {
//   chrome.tabs.get(tab.tabId, (current_tab_info) => {
//     console.log(current_tab_info.url);
//     chrome.tabs.executeScript(null, { file: './foreground.js' }, () => {
//       console.log('i injected');
//     });
//   });
// });
// chrome.tabs.executeScript(null, { file: './rabbithole.js' }, () => {
//   console.log('i injected');
// });

// const form = document.querySelector('#queryForm');
// form.addEventListener('submit', (event) => {
//   console.log('form submitted');
// });

chrome.runtime.onInstalled.addListener(function () {
  console.log('The runtime is working.');

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  //   chrome.declarativeContent.onPageChanged.addRules([
  //     {
  //       conditions: [
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { urlPrefix: 'http' },
  //         }),
  //       ],
  //       actions: [new chrome.declarativeContent.ShowPageAction()],
  //     },
  //   ]);
  // });
});
