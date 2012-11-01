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
          $('html,body').animate({scrollTop: targetOffset}, 300);
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
      "name": "박난하",
      "twitter": "nanhapark",
      "company" : "KTH",
      "session": "Node.js In Production",
      "contents": "저는 지루한 삶을 싫어합니다. 항상 새로운 것을 찾아다닙니다. 그래서 내 몸은 항상 피곤하고, 남들에게 눈총을 사기도 합니다. 하지만, 이런 삶이 즐겁습니다. 앞으로 평생 개발자가 되어 후배들에게 정보를 공유하고 싶은 박난하 입니다."
    },
    "b": {
      "name": "백정상",
      "twitter": "jeongsangbaek",
      "company" : "블루윈드",
      "session": "소셜게임 서버 개발 관점에서 본 node.js의 장/단점 과 대안",
      "contents": "소셜 게임 서버 플랫폼으로 node.js 를 선택한 이유와 개발 방법에 대해 소개합니다. 이어서 개발하면서 느꼈던 node.js의 장점과 단점에 대해 설명하고, 단점을 보완하기 위한 대안을 제시합니다."
    },
    "tpl": {
      "name": "",
      "company" : "",
      "session": "",
      "contents": ""
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
      twitter: coll['twitter'],
      company: coll['company'],
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
