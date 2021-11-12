const getForm = () => {
  let form = document.getElementById('queryForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [startTime, endTime, bookmarkFolder] = [
      new Date(event.target.value).getTime(),
      new Date(event.target.value).getTime(),
      event.target.value,
    ];

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

    if (pageHistory) {
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
    }
  });
};

document.addEventListener('DOMContentLoaded', (event) => {
  getForm();
});
