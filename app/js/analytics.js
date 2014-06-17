var countbutton = document.getElementById('wordcount_button');
var topwordsbutton = document.getElementById('topwords_button');
var toplettersbutton = document.getElementById('topletters_button');

var input_area = document.getElementById('words_textarea');

input_area.onkeyup = function() {
  topWords()
}

countbutton.onclick = function() {
  wordCount();
  input_area.onkeyup = function() {
    wordCount()
  }
};

topwordsbutton.onclick = function() {
  topWords();
  input_area.onkeyup = function() {
    topWords()
  }
};

toplettersbutton.onclick = function() {
  topletters();
  input_area.onkeyup = function() {
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
    var irrelevant = ['aboard', 'about', 'above', 'across', 'after', 'against', 'along', 'around', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'during', 'except', 'following', 'inside', 'minus', 'onto', 'opposite', 'outside', 'round', 'since', 'through', 'toward', 'under', 'underneath', 'unlike', 'until', 'upon', 'without', 'as', 'at', 'but', 'by', 'down', 'for', 'from', 'in', 'into', 'like', 'near', 'next', 'of', 'off', 'on', 'onto', 'out', 'over', 'past', 'plus', 'minus', 'since', 'than', 'to', 'up', 'with'];

    if ($.inArray(current_word, irrelevant) == -1) {
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
        var rowIndex = 1;

        $.ajax({
          type: 'GET',
          url: 'http://words.bighugelabs.com/api/2/f5915b0e669a698049a43e63af4704af/' + counts[i][0] + '/json?callback=?',
          dataType: 'json',
          success: function(data) {

            var parsedWord = this.url.split('/')[6];

            var tr = document.createElement('tr');
            var word = document.createElement('td');
            word.innerHTML = parsedWord

            var countword = document.createElement('td');

            for (i = 0; i <= counts.length - 1; i++) {
              if (parsedWord === counts[i][0]) {
                countword.innerHTML = counts[i][1]
                break
              }
            }

            var suggestion = document.createElement('td');

            thesaurusHandling(data,suggestion)

            if (rowIndex > 1) {
              tr.insertBefore(word, tr.childNodes[rowIndex])
              tr.insertBefore(countword, tr.childNodes[rowIndex])
              tr.insertBefore(suggestion, tr.childNodes[rowIndex])
              tbdy.insertBefore(tr, tbdy.childNodes[rowIndex])
              rowIndex += 1
            } else {
              tr.insertBefore(word, tr.childNodes[rowIndex])
              tr.insertBefore(suggestion, tr.childNodes[rowIndex])
              tr.insertBefore(countword, tr.childNodes[rowIndex])
              tbdy.insertBefore(tr, tbdy.childNodes[rowIndex])
              rowIndex += 1
            }
          }
        });
      }
    }
    tbl.appendChild(tbdy)
    element.appendChild(tbl)
  }
  createTable()
};


function thesaurusHandling(data,suggestion) {

  var options = ['noun', 'verb', 'adverb', 'adjective']

  for (i = 0; i <= options.length - 1; i++) {

    var thisWordType = options[i]

    if (typeof data[thisWordType] != "undefined") {

      if (typeof data[thisWordType].syn != "undefined" && typeof data[thisWordType].sim != "undefined") {
        suggestion.innerHTML = suggestion.innerHTML + "<u>" + thisWordType + ":</u> <em>synonyms</em> " + data[thisWordType].syn.slice(0, 3) + " <em>similar</em> " + data[thisWordType].sim.slice(0, 3) + "\n"
      } else if (typeof data[thisWordType].syn != "undefined" && typeof data[thisWordType].sim === "undefined") {
        suggestion.innerHTML = suggestion.innerHTML + "<u>" + thisWordType + ":</u> <em>synonyms</em> " + data[thisWordType].syn.slice(0, 3) + "\n"
      } else if (typeof data[thisWordType].syn === "undefined" && typeof data[thisWordType].sim != "undefined") {
        suggestion.innerHTML = suggestion.innerHTML + "<u>" + thisWordType + ":</u> <em>similar</em> " + data[thisWordType].sim.slice(0, 3) + "\n"
      }
    }
  }
}


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
