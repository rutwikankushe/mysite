"use strict";

var tools = new Array();
var get_file_status = 1;
$('.searchbar,#mobsearch').on('click', function (e) {
  if (get_file_status == 1) {
    $.get(base_url_path + '/searchbar.txt?' + Math.floor(Math.random() * 100 + 1), function (data) {
      data = $.parseJSON(data);
      tools[0] = data;
    });
    get_file_status = 0;
  }

  e.stopPropagation();
  $('#srch_togle').slideToggle();
  $('#srch_togle').toggleClass('document_click');
  $('#n_lang_drop_sty').removeClass('lang_drop_sty n_add_lang_drop_sty');
  $('#top_search,#blog_search').focus();
});

function clearText(text) {
  myStr = text.toLowerCase();
  myStr = myStr.replace(/ /g, "");
  myStr = myStr.replace(/[^a-zA-Z0-9]+/g, "");
  myStr = myStr.replace(/(\s)+/g, "");
  return myStr;
}

function showResults() {
  var val = $("#top_search").val();
  val = $.trim(val);
  val = val.toLowerCase();
  $(".search_drop_box").hide();

  if (val.length < 3) {
    $(".search_drop_box").hide();
    $('#n_lang_drop_sty').removeClass('lang_drop_sty n_add_lang_drop_sty');
    return false;
  }

  $(".search_drop_box").html("<ul></ul>");
  $('#n_lang_drop_sty').addClass('lang_drop_sty n_add_lang_drop_sty');
  var matches = 0;
  $.each(tools[0], function (i, item) {
    var res = item.title.toLowerCase();

    if (res.match(val.toLowerCase())) {
      ++matches;
      var match_html = '<b>' + val + '</b>';
      var match = item.title.toLowerCase().replace(new RegExp(val, "ig"), '<b>' + val.toLowerCase() + '</b>');
      $(".search_drop_box ul").append('<li><a href="' + item.url + '">' + match + '</a></li>');
    }
  });

  if (matches < 1) {
    $(".search_drop_box ul").append('<li style="padding:10px;">No result found related to your keyword..</li>');
  }

  $(".search_drop_box").show();
}

function showResultsbar() {
  var val = $("#searchbar").val();
  val = $.trim(val);
  val = val.toLowerCase();
  $(".search-resultsbar").html("");

  if (val.length < 2) {
    return false;
  }

  $(".search-resultsbar").show();
  var matches = 0;
  $.each(tools[0], function (i, item) {
    var res = item.title.toLowerCase();

    if (res.match(val.toLowerCase())) {
      ++matches;
      var match_html = '<b>' + val + '</b>';
      var match = item.title.toLowerCase().replace(new RegExp(val, "ig"), '<b>' + val.toLowerCase() + '</b>');
      $(".search-resultsbar").append('<span class="match"><a href="' + item.url + '">' + match + '</a></span>');
    }
  });

  if (matches < 1) {
    $(".search-resultsbar").append('<span class="match" style="border-bottom:none">No result found related to your keyword..</span>');
  }
}

function showModel(heading, msg) {
  var show_on_top = $(".error-popup-box").offset().top;
  show_on_top = show_on_top - 100;
  $("html, body").animate({
    scrollTop: show_on_top
  }, 0);
  $(".model-box .error_type").html(heading);
  $(".model-box .error_type_desc").html(msg);
  $(".error-popup-box").show();
  $(".model-box").fadeIn();
}

function hideModel() {
  $(".error-popup-box").fadeOut();
  $(".error-popup-box").hide();
}

$("#top_search").keyup(function () {
  showResults();
});
$("#mobsearch").click(function (e) {
  e.stopPropagation();
  $("#HeadSearch").slideToggle("slow");
  $('#searchbar').focus();
});
$("#searchbar").keyup(function () {
  showResultsbar();
});
$("#searchbar").click(function () {
  showResultsbar();
});

function fixd_st() {
  if ($('.st_sidebar').length != 0) {
    var win_height = $(window).scrollTop();
    var st_ofset_in = $('.st_sidebar').offset().top;
    var st_ofset_out = $('.st_ofset_out').offset().top;

    if (win_height >= st_ofset_in) {
      $('.st_sidebar').css('position', 'fixed');
      $('.st_sidebar').css('top', '0');
    }

    if (win_height <= st_ofset_out) {
      $('.st_sidebar').css('position', '');
      $('.st_sidebar').css('top', '');
    }

    if ($('.st_sidebar').offset().top + $(".st_sidebar").height() - 100 > $(".main-content").height()) {
      $('.st_sidebar').css('top', -($(".st_sidebar").offset().top + $(".st_sidebar").height() - $(".f_intro_bg_test").offset().top) - 50);
    }
  }
}

$(window).scroll(function () {
  fixd_st();
});
$('#n_lang_drop_sty').click(function () {
  $('#n_lang_drop_sty').removeClass('lang_drop_sty n_add_lang_drop_sty');
  $('#srch_togle').slideToggle();
});
document.addEventListener("DOMContentLoaded", function (event) {
  $(function () {
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }

      return "";
    }

    function checkCookie() {
      var browser_notify_id = getCookie("sst_notify");
      last_notify_id = $('.last_notify_id').attr('data-notify_id');

      if (browser_notify_id == last_notify_id) {
        $(".btn_notify").removeClass('btn_notify_act');
      } else {
        $('.btn_notify').addClass('btn_notify_act');
      }
    }

    $(".btn_notify").click(function () {
      var last_notify_id = $('.last_notify_id').attr('data-notify_id');
      setCookie("sst_notify", last_notify_id, 365);
      $(".btn_notify").removeClass('btn_notify_act');
    });
    checkCookie();
  });
});

if ($('#blog_search_type').length != 0) {
  $('#blog_search').attr('placeholder', 'Type any word to search Blog Posts...');
}

$('#blog_search_type').click(function () {
  $('#blog_search').attr('placeholder', 'Type any word to search Blog Posts...');
});
$('#seo_tools_search').click(function () {
  $('#blog_search').attr('placeholder', 'Type any word to search for SEO tools...');
});
var run = true;
$('#blog_search').keyup(function () {
  if ($(this).val().length > 3) {
    var search_type = $("input[name='blog_search_type']:checked").val();
    var word = $(this).val();

    if (run) {
      $.ajax({
        url: base_url_path + '/blog_search/',
        type: 'post',
        data: {
          'type': search_type,
          'word': word
        },
        success: function success(g) {
          if (search_type == 'inside_blog') {
            $('#srch_togle').addClass('blog_search_con');
          } else {
            $('#srch_togle').removeClass('blog_search_con');
          }

          $('.search_drop_box.n_search_drop_box ul,.search-resultsbar').html(g);
          $('.search_drop_box.n_search_drop_box,.search-resultsbar').show();
          pushEventVal('Blog search');
        }
      });
      run = false;
      setTimeout(function () {
        run = true;
      }, 1000);
    }
  } else {
    $('.search_drop_box ul').html('');
    $('.search_drop_box').hide();
  }
});
$(document).click(function (e) {
  var container = $("#srch_togle,.search_drop_box");

  if (!$(e.target).is('roshu')) {
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.search_drop_box ul').html('');
      $('.search_drop_box,#srch_togle').hide();
      $('#blog_search,#top_search').val('');
      return;
    }
  }
});
var start_timestamp;
var recognizing = false;
var final_transcript = '';
var ignore_onend;

function startDictation(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }

  recognition.lang = 'English';
  recognition.start();
  ignore_onend = false;
  start_timestamp = event.timeStamp;
}

if (!('webkitSpeechRecognition' in window)) {} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function () {
    recognizing = true;
    updatemsg('speak_now');
  };

  recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
      ignore_onend = true;
    }

    if (event.error == 'audio-capture') {
      ignore_onend = true;
    }

    if (event.error == 'not-allowed') {
      ignore_onend = true;
    }
  };

  recognition.onend = function () {
    recognizing = false;

    if (ignore_onend) {
      return;
    }

    updatemsg('end_search');
  };

  recognition.onresult = function (event) {
    var final_transcript = '';
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        final_transcript = capitalize(final_transcript);
        $('#top_search,#blog_search,#searchbar').val('');
        $('#top_search,#blog_search,#searchbar').val(linebreak(final_transcript));
        $("#top_search,#blog_search,#searchbar").trigger('keyup');
      } else {
        $('#top_search,#blog_search,#searchbar').val('');
        interim_transcript += event.results[i][0].transcript;
        $('#top_search,#blog_search,#searchbar').attr('placeholder', linebreak(interim_transcript));
      }
    }
  };
}

var first_char = /\S/;

function capitalize(s) {
  return s.replace(first_char, function (m) {
    return m.toUpperCase();
  });
}

var two_line = /\n\n/g;
var one_line = /\n/g;

function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function updatemsg(msg) {
  if (msg == 'speak_now') {
    $('#voice_search').attr('src', base_url_path + 'asets/images/microphone-hover.svg');
    $('#top_search,#blog_search,#searchbar').attr('placeholder', 'Speak Now');
  } else if ('end_search') {
    $('#voice_search').attr('src', base_url_path + 'asets/images/microphone.svg');
    $('#top_search,#blog_search').attr('placeholder', 'Type any word to search for SEO tools...');
    $('#searchbar').attr('placeholder', 'Search from seo tools');
  }
}