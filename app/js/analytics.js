var countbutton = document.getElementById('wordcount_button');
var topwordsbutton = document.getElementById('topwords_button');
var toplettersbutton = document.getElementById('topletters_button');

var input_area = document.getElementById('words_textarea');

countbutton.onclick = function() {
  wordCount();
  input_area.onkeydown = function() {
    wordCount()
  }
};

topwordsbutton.onclick = function() {
  topWords();
  input_area.onkeydown = function() {
    topWords()
  }
};

toplettersbutton.onclick = function() {
  topletters();
  input_area.onkeydown = function() {
    topletters()
  }
};


function wordCount() {

  document.getElementById('all_text').innerHTML = '';

  var words = document.getElementById("words_textarea").value.trim().match(/\w+/g);

  var para = document.createElement("p");

  if (words.length > 1) {
    var count = document.createTextNode('Your document is ' + words.length + ' words long.');
  } else if (words.length = 1) {
    var count = document.createTextNode('Your document is ' + words.length + ' word long.');
  } else if (words[0] === "") {
    var count = document.createTextNode('Your document is 0 words long.');
  }

  para.appendChild(count);

  var element = document.getElementById("all_text");
  element.appendChild(para);
}


function topWords() {

  document.getElementById('all_text').innerHTML = '';

  var words = document.getElementById("words_textarea").value.trim().match(/\w+/g);

  var counts = [];

  for (i = 0; i <= words.length - 1; i++) {
    var found = false;
    var current_word = words[i].toLowerCase();

    for (n = 0; n <= counts.length - 1; n++) {
      if (counts[n][0] == current_word) {
        counts[n][1] += 1;
        found = true;
        break;
      }
    }

    if (found == false) {
      counts.push([current_word, 1]);
    }
  }

  var sorted = counts.sort(function(a, b) {
    return b[1] - a[1]
  });


  function createTable() {
    var element = document.getElementById("all_text");

    var tbl = document.createElement('table');

    tbl.style.width = '100%';

    tbl.setAttribute('border', '1');

    var tbdy = document.createElement('tbody');

    var tr = document.createElement('tr');
    var word = document.createElement('td');
    word.innerHTML = "<strong>Word</strong>"
    var countword = document.createElement('td');
    countword.innerHTML = "<strong>Count</strong>"
    var suggestions = document.createElement('td');
    suggestions.innerHTML = "<strong>Suggestions</strong>"

    tr.appendChild(word)
    tr.appendChild(countword)
    tr.appendChild(suggestions)
    tbdy.appendChild(tr);
    tbl.appendChild(tbdy);
    element.appendChild(tbl)

    for (i = 0; i <= counts.length - 1; i++) {

      if (counts[i][1] < 3) {

        var tr = document.createElement('tr');
        var word = document.createElement('td');
        word.innerHTML = counts[i][0]
        var countword = document.createElement('td');
        countword.innerHTML = counts[i][1]
        var suggestion = document.createElement('td');

        tr.appendChild(word)
        tr.appendChild(countword)
        tr.appendChild(suggestion)
        tbdy.appendChild(tr)

      }

      if (counts[i][1] >= 3) {

        $.ajax({
          type: 'GET',
          url: 'http://words.bighugelabs.com/api/2/dafe2e8acd88d00e5096b17ca16157a7/' + counts[i][0] + '/json?callback=?',
          dataType: 'json',
          success: function(data) {

            var tr = document.createElement('tr');
            var word = document.createElement('td');
            word.innerHTML = this.url.split('/')[6]

            var countword = document.createElement('td');

            for (i = 0; i <= counts.length - 1; i++) {
              if (this.url.split('/')[6] === counts[i][0]){
                countword.innerHTML = counts[i][1]
              }
            }

            var suggestion = document.createElement('td');

            if (typeof data.noun != "undefined") {

              if (typeof data.noun.syn != "undefined" && typeof data.noun.sim != "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "noun: <em>synonyms</em> " + data.noun.syn.slice(0, 3) + " <em>similar</em> " + data.noun.sim.slice(0, 3) + "\n"
              } else if (typeof data.noun.syn != "undefined" && typeof data.noun.sim === "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "noun: <em>synonyms</em> " + data.noun.syn.slice(0, 3) + "\n"
              } else if (typeof data.noun.syn === "undefined" && typeof data.noun.sim != "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "noun: <em>similar</em> " + data.noun.sim.slice(0, 3) + "\n"
              }
            }

            if (typeof data.verb != "undefined") {
              if (typeof data.verb.syn != "undefined" && typeof data.verb.sim != "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "verb: <em>synonyms</em> " + data.verb.syn.slice(0, 3) + " <em>similar</em> " + data.verb.sim.slice(0, 3) + "\n"
              } else if (typeof data.verb.syn != "undefined" && typeof data.verb.sim === "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "verb: <em>synonyms</em> " + data.verb.syn.slice(0, 3) + "\n"
              } else if (typeof data.verb.syn === "undefined" && typeof data.verb.sim != "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "verb: <em>similar</em> " + data.verb.sim.slice(0, 3) + "\n"
              }
            }

            if (typeof data.adverb != "undefined") {
              if (typeof data.adverb.syn != "undefined" && typeof data.adverb.sim != "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "adverb: <em>synonyms</em> " + data.adverb.syn.slice(0, 3) + " <em>similar</em> " + data.adverb.sim.slice(0, 3) + "\n"
              } else if (typeof data.adverb.syn != "undefined" && typeof data.adverb.sim === "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "adverb: <em>synonyms</em> " + data.adverb.syn.slice(0, 3) + "\n"
              } else if (typeof data.adverb.syn === "undefined" && typeof data.adverb.sim != "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "adverb: <em>similar</em> " + data.adverb.sim.slice(0, 3) + "\n"
              }
            }

            if (typeof data.adjective != "undefined") {
              if (typeof data.adjective.syn != "undefined" && typeof data.adjective.sim != "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "adjective: <em>synonyms</em> " + data.adjective.syn.slice(0, 3) + " <em>similar</em> " + data.adjective.sim.slice(0, 3) + "\n"
              } else if (typeof data.adjective.syn != "undefined" && typeof data.adjective.sim === "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "adjective: <em>synonyms</em> " + data.adjective.syn.slice(0, 3) + "\n"
              } else if (typeof data.adjective.syn === "undefined" && typeof data.adjective.sim != "undefined") {
                suggestion.innerHTML = suggestion.innerHTML + "adjective: <em>similar</em> " + data.adjective.sim.slice(0, 3) + "\n"
              }
            }
            tr.insertBefore(word,tr.childNodes[1])
            tr.insertBefore(suggestion,tr.childNodes[1])
            tr.insertBefore(countword,tr.childNodes[1])
            tbdy.insertBefore(tr,tbdy.childNodes[1])
          }
        });
      }
    }

    tbl.appendChild(tbdy)
    element.appendChild(tbl)
  }
  createTable()
};

function topletters() {
  document.getElementById('all_text').innerHTML = '';

  var letters = document.getElementById("words_textarea").value.trim().match(/[A-z]/g);

  var counts = [];

  for (i = 0; i <= letters.length - 1; i++) {
    var found = false;
    var current_letter = letters[i].toLowerCase();

    for (n = 0; n <= counts.length - 1; n++) {
      if (counts[n][0] == current_letter) {
        counts[n][1] += 1;
        found = true;
        break;
      }
    }

    if (found == false) {
      counts.push([current_letter, 1]);
    }
  }

  var sorted = counts.sort(function(a, b) {
    return b[1] - a[1]
  });

  function createTable() {
    var element = document.getElementById("all_text");

    var tbl = document.createElement('table');

    tbl.style.width = '100%';

    tbl.setAttribute('border', '1');

    var tbdy = document.createElement('tbody');

    var tr = document.createElement('tr');
    var word = document.createElement('td');
    word.innerHTML = "<strong>Character</strong>"
    var countword = document.createElement('td');
    countword.innerHTML = "<strong>Count</strong>"
    tr.appendChild(word)
    tr.appendChild(countword)
    tbdy.appendChild(tr);
    tbl.appendChild(tbdy);
    element.appendChild(tbl)

    for (i = 0; i <= counts.length - 1; i++) {
      var tr = document.createElement('tr');
      var word = document.createElement('td');
      word.innerHTML = counts[i][0]
      var countword = document.createElement('td');
      countword.innerHTML = counts[i][1]
      tr.appendChild(word)
      tr.appendChild(countword)
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    element.appendChild(tbl)
  }
  createTable()
}
