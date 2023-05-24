const getForm = () => {
  let form = document.getElementById('queryForm');
  let formStart = document.getElementById('start');
  let formFinish = document.getElementById('finish');
  let formFolder = document.getElementById('folder');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [startTime, endTime, bookmarkFolder] = [
      new Date(event.target[0].value).getTime(),
      new Date(event.target[1].value).getTime(),
      event.target[2].value,
    ];

    /* maxResults value is arbitrary choice as chrome api rejects Number.MAX_VALUE and Number.MAX_SAFE_INTEGER */
    const pageHistory = await chrome.history.search({
      startTime: startTime,
      endTime: endTime,
      text: '',
      maxResults: 500,
    });
    const folderName = await chrome.bookmarks.create({ title: bookmarkFolder });

    if (pageHistory) {
      pageHistory.forEach((page) => {
        chrome.bookmarks.create({
          parentId: folderName.id,
          title: page.title,
          url: page.url,
        });
      });
    }

    formStart.value = '';
    formFinish.value = '';
    formFolder.value = '';
  });
};

document.addEventListener('DOMContentLoaded', (event) => {
  getForm();
});
