$(function() {
  //
  // tweet
  //
  $('#tweetFeed').jTweetsAnywhere({
    searchParams: ['q=PlayNode', 'q=playnode'],
    count: 15,
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
    "c": {
      "name": "박경욱",
      "twitter": "kyungw00k",
      "company" : "다음커뮤니케이션",
      "session": "When hardware met nodeJS",
      "contents": "항상 재밌는 것을 찾아다니고, 실험해보는 것을 좋아합니다. 최근에는 제주로 이주해 아이가 커가는 모습을 보면서 지내고 있습니다."
    },
    "d": {
      "name": "김양원",
      "twitter": "Rhiokim",
      "company" : "KTH",
      "session": "정적 페이지 기반 블로그 엔진 | 하루프레스",
      "contents": "5분만에 설치하는 블로그 엔진!, 웹 서버와 데이터베이스가 필요 없는 초 간편 컨텐츠 메니징 시스템(CMS)! 다양한 테마, 웹 슬라이드, 플러그인, 마크다운 포맷, 데이터 변환 유틸"
    },
    "e": {
      "name": "이재호",
      "twitter": "acidsound",
      "company" : "Appsoulute",
      "session": "Meteor로 만들어보는 Modern Web Application",
      "contents": "십여 년간 여러 분야의 SI 일을 하다가 node.js를 비롯한 Javascript에 대한 열망이 커져 아예 앱소울루트(Appsoulute)라는 회사를 만들고 관련 일들을 시작했습니다. ...."
    },
    "f": {
      "name": "홍영택",
      "twitter": "susukang98",
      "company" : "사이냅소프트",
      "session": "Operational Transform in Node.js",
      "contents": "직장인이 아닌 해커가 되고 싶은 개발자입니다. 지금까지 주로 클라우드 오피스 관련 개발을 하고 있으나 다양한 분야에 가치 있는 소프트웨어를 만들고 싶어 합니다."
    },
    "g": {
      "name": "배성준",
      "twitter": "hanguli",
      "company" : "big4games",
      "session": "모바일 게임 서버 개발을 하면서 만난 node.js",
      "contents": "일로써 프로그래밍은 놓을 지라도 늙어 죽을 때까지 프로그래밍을 하면서 살고 싶은 꿈많은 30대 청년입니다."
    },
    "h": {
      "name": "변정훈",
      "twitter": "outsideris",
      "company" : "NBP",
      "session": "Learning Dtrace",
      "contents": "새로운 것이나 도전적인 것을 좋아하고 항상 즐겁게 코딩을 하려고 하는 프로그래머입니다. 아는 내용을 공유하는 데도 많은 즐거움을 느껴서 블로그(http://blog.outsider.ne.kr)도 운연하고 있습니다."
    },
    "i": {
      "name": "김범진",
      "twitter": "beejei",
      "company" : "다이렉트미디어",
      "session": "Node.js & Web Service",
      "contents": "..."
    },
    "j": {
      "name": "김익중",
      "twitter": "...",
      "company" : "드래곤플라이",
      "session": "MMORPG에서의 node.js를 이용한 커뮤니티 설계",
      "contents": "..."
    },
    "aa": {
      "name": "Isaac Z. Schlueter",
      "twitter": "izs",
      "company" : "Joyent",
      "session": "Keynote",
      "contents": "Node.js를 만든 <a href='https://twitter.com/ryah' target='_blank'>Ryan Dahl</a>에게서 프로젝트를 이어받아 현재 Node.js 개발을 이끌고 있다. Node.js 프로젝트에 초창기부터 참여했으며 패키지매니저인 <a href='https://npmjs.org/' target='_blank'>npm</a>을 만들어서 현재의 수많은 서드파티 모듈들이 만들어지는 기반을 마련했다. 현재는 Node.js의 공식 스폰서인 Joyent에서 풀타임 Node.js 개발자로 일하고 있다."
    },
    "bb": {
      "name": "Mikeal Rogers",
      "twitter": "mikeal",
      "company" : "Gather",
      "session": "",
      "contents": "Mozilla, CouchOne, Yammer를 거쳐 현재는 <a href='https://gather.at' target='_blank'>Gather</a>라는 회사를 세워서 일하고 있다. Node.js의 소스공헌자이기도 하며 매년 <a href='http://www.nodeconf.com/' target='_blank'>nodeconf</a>를 개최해서 node.js 홍보와 기술공유에 힘쓰고 있다. 대표적인 모듈로는 HTTP 클라이언트 모듈인 <a href='https://github.com/mikeal/request' target='_blank'>request</a>가 있다."
    },
    "cc": {
      "name": "Charlie Robbins",
      "twitter": "indexzero",
      "company" : "Nodejitsu",
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
