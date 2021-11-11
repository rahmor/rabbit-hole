// console.log('hello foreground');

const getForm = () => {
  let form = document.getElementById('queryForm');
  let button = document.getElementById('queryButton');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const startTime = new Date(event.target[0].value).getTime();
    const endTime = new Date(event.target[1].value).getTime();
    const bookmarkFolder = event.target[2].value;

    // chrome.extension
    //   .getBackgroundPage()
    //   .console.log(startTime, endTime, folder);

    chrome.history.search(
      { startTime: startTime, endTime: endTime, text: '' },
      (pages) => {
        chrome.bookmarks.create({ title: bookmarkFolder }, (folder) => {
          chrome.extension.getBackgroundPage().console.log(folder);

          pages.forEach((page) => {
            chrome.bookmarks.create(
              {
                parentId: folder.id,
                title: page.title,
                url: page.url,
              },
              (returned) => {
                // chrome.extension.getBackgroundPage().console.log(returned);
                return returned;
              }
            );
          });
        });
      }
    );
  });

  //   chrome.bookmarks.search({ query: 'javascript' }, (bookmarks) => {
  //     chrome.extension.getBackgroundPage().console.log(bookmarks);
  //   });
  // });
};

// chrome.runtime.onInstalled.addListener(function () {
//   console.log('hello foreground');
//   let form = document.getElementById('queryForm');
//   console.log(form);

// form.onsubmit = function (event) {
//   event.preventDefault();
//   chrome.tabs.executeScript(null, { file: './foreground.js' }, () => {
//     console.log('i injected');
//   });
// };

document.addEventListener('DOMContentLoaded', (event) => {
  getForm();
});
