eventIndex = 1.0


function story() {

  displayBackground (moscow_b)

  //-----------------------------------------------------------------------------------------------------------------------------------

  //Event 1
  events ()

}

function change (previous, next) {
  if (leftDown) {
    eventIndex = previous
    leftDown = false
  } else if (rightDown) {
    eventIndex = next
    rightDown = false
  }
}


function events () {


  switch(eventIndex) {

    case 1.0:

    displayWaifu (pasha, "CENTER")
    speak (sov_c, 'Stalin',
    'I like to eat big kebab I like to eat big kebab \n'
    )

    change (1.0, 1.1)

    break

    case 1.1:

    displayWaifu (pasha, "CENTER")
    speak (sov_c, 'Stalin',
    'I am the pasha! \n'
    )

    change (1.0, 2.0)

    break

    case 2.0:

    change (1.1, 2.0)

    break
  }
}
