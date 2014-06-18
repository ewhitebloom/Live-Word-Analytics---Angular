pagetitle = document.getElementById('pagetitle')

pagetitle.onmouseover = function() {
    animate()
}

// pagetitle.onmouseout = function() {
//   pagetitle.innerHTML = 'Word Analytics'
// }


function animate() {
  regular = 'Word Analytics'

  colors = ['blue', 'red', 'yellow', 'green']

  chopped = pagetitle.innerHTML.split('')

  function iteration(i) {
    pagetitle.innerHTML = regular

    var colored = null
    var colorDiv = document.createElement('span')
    var colorLetter = chopped[i]

    colorDiv.style.color = colors[i % colors.length]
    colorDiv.innerHTML = colorLetter
    colored = chopped.slice(0, i).join('') + colorDiv.outerHTML + chopped.slice(i + 1, chopped.length).join('')
    pagetitle.innerHTML = colored
  }

  var i=0

  function doSetTimeout() {
    setTimeout(function() {
      iteration(i)
      i++
      if (i<=chopped.length-1){
        doSetTimeout()
      }
    }, 300);
  }

  doSetTimeout()

}
