  $("#infowindow").mouseover(function() {
    var headline = document.getElementById('headline');
    var infobox = document.createElement('p');
    infobox.setAttribute('id','infotext')
    infobox.style.display = 'block'
    infobox.style.background = '#e4e4e4'
    infobox.innerHTML = "Click on 'Top Words' to toggle a live-updating table of each word's count, along with thesarus suggestions for counts above 3."
    headline.appendChild(infobox)
  });

  $("#infowindow").mouseleave(function() {
    $('#infotext').remove();
  });
