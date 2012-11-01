$(function() {
  //
  // tweet
  //
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

  //
  // auto scroll
  //
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      && location.hostname == this.hostname) {
        var $target = $(this.hash);
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
          var targetOffset = $target.offset().top;
          $('html,body').animate({scrollTop: targetOffset}, 1000);
          return false;
        }
      }
  });

  //
  // speakers
  //
  var tpl = $('#profile-contents').html();
  var initFlag = true;
  var SpeakerColl = {
    "a": {
      "name": "nanhapark",
      "session": "Node.js In Production",
      "contents": "저는 지루한 삶을 싫어합니다. 항상 새로운 것을 찾아다닙니다. 그래서 내 몸은 항상 피곤하고, 남들에게 눈총을 사기도 합니다. 하지만, 이런 삶이 즐겁습니다. 앞으로 평생 개발자가 되어 후배들에게 정보를 공유하고 싶은 박난하 입니다."
    }
  };
  $('#speaker a').click(function(e) {
    e.preventDefault();
    var $t = $(e.target), id = $t.parent().data('id');
    if (!id) return;

    var coll = SpeakerColl[id] || null;
    if (coll == null) { alert('not found collection'); return; }

    $('#speaker .zoom img').attr('src', $t.attr('src')).hide().fadeIn();

    var r = Mustache.render(tpl, {
      name: coll['name'],
      session: coll['session'],
      contents: coll['contents']
    });
    $('#speaker .zoom-contents').html(r).hide().fadeIn();
    if (!initFlag) $('a[href=#speaker]').click()
    initFlag = false;
  });

  //
  // init
  //
  $('#speaker a').eq(1).find('img').click();
});
