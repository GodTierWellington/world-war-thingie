eventIndex = 1.0
girlChosen = []

function story() {

  displayBackground (moscow_b)

  //-----------------------------------------------------------------------------------------------------------------------------------

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

    girlChosen.push ("sov")
    displayWaifu (sov_girl, "CENTER")
    speak (sov_c, 'Stalin',
    'I like to eat big kebab I like to eat big kebab'
    )

    change (1.0, 1.1)

    break

    case 1.1:

    displayWaifu (sov_girl, "CENTER")
    speak (sov_c, 'Stalin',
    'I am the pasha!'
    )

    change (1.0, 1.2)

    break

    case 1.2:

    makeChoice ([["Click this!", 1.31],
                ["Click this!", 1.32],
                ["Click this!", 1.33]])

    change (1.1, 1.2)

    break

    case 1.31:

    displayWaifu (sov_girl, "CENTER")
    speak (sov_c, 'Stalin',
    'Motherland.'
    )

    break

    case 1.32:

    displayWaifu (sov_girl, "CENTER")
    speak (sov_c, 'Stalin',
    'Fat boi, big kebab.'
    )

    break

    case 1.33:

    displayWaifu (sov_girl, "CENTER")
    speak (sov_c, 'Stalin',
    'Gimme succ'
    )

    break
  }
}
