$("#infowindow").mouseover(function() {
  var headline = document.getElementById('headline');
  var infobox = document.createElement('p');
  infobox.setAttribute('id','infotext')
  infobox.style.display = 'block'
  infobox.style.background = '#e4e4e4'
  infobox.innerHTML = "Simply type to get a live-updating table of word counts and thesaurus suggestions for most used words. Use the buttons to toggle between features."
  headline.appendChild(infobox)
});

$("#infowindow").mouseleave(function() {
  $('#infotext').remove();
});
