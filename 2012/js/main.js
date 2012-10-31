$(function() {
  $('#tweetFeed').jTweetsAnywhere({
    searchParams: ['q=PlayNode', 'q=playnode'],
    count: 10,
    showTweetFeed: {
      autorefresh: {
        mode: 'trigger-insert',
        interval: 10
      },
      showTimestamp: {
        refreshInterval: 15
      },
      showTweetFeed: {
        expandHovercards: true,
        showSource: true
      }
    },
    onDataRequestHandler: function(stats, options) {
      if (stats.dataRequestCount < 11) {
        return true;
      } else {
        stopAutorefresh(options);
      }
    }
  });
});

