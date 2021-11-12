const getForm = () => {
  let form = document.getElementById('queryForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const startTime = new Date(event.target[0].value).getTime();
    const endTime = new Date(event.target[1].value).getTime();
    const bookmarkFolder = event.target[2].value;

    const pageHistory = await chrome.history.search(
      {
        startTime: startTime,
        endTime: endTime,
        text: '',
      },
      () => {}
    );

    const folder = await chrome.bookmarks.create(
      { title: bookmarkFolder },
      () => {}
    );

    pageHistory.forEach((page) => {
      chrome.bookmarks.create(
        {
          parentId: folder.id,
          title: page.title,
          url: page.url,
        },
        (returned) => {
          return returned;
        }
      );
    });
  });
};

document.addEventListener('DOMContentLoaded', (event) => {
  getForm();
});
