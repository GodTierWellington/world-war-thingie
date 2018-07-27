eventIndex = 1.0
girlChosen = []
choices = []

function story() {

  //-----------------------------------------------------------------------------------------------------------------------------------

}

function change (previous, next, nextOverride) {
  if (leftDown) {
    eventIndex = previous
    leftDown = false
  } else if (rightDown) {
    if (nextOverride != undefined) {
      eventIndex = nextOverride
    } else {
      eventIndex = next
    }
    rightDown = false
  }
}

function setOverride (currentEvent) {
  for (i = 0; i < choices.length; i++) {
    if (choices[i][0] == currentEvent) {
      return choices[i][1]
    }
  }
  return undefined
}


function sov_event () {

  displayBackground (moscow_b)
  switch(eventIndex) {

    case 1.0:

    girlChosen.push ("sov")
    displayWaifu (stalin_h_1, "CENTER")
    speak (sov_c, 'Stalin',
    'I like to eat big kebab I like to eat big kebab'
    )

    change (1.0, 1.1)

    break

    case 1.1:

    displayWaifu (stalin_1, "CENTER")
    speak (sov_c, 'Stalin',
    'I am the pasha!'
    )

    change (1.0, 1.2, setOverride (1.1))

    break

    case 1.2:

    makeChoice ([["Click this!", 1.31],
                ["Click this!", 1.32],
                ["Click this!", 1.33]], 1.1)

    change (1.1, 1.2)

    break

    case 1.31:

    displayWaifu (stalin_h_3, "CENTER")
    speak (sov_c, 'Stalin',
    'Motherland.'
    )

    change (1.1, 1.31)

    break

    case 1.32:

    displayWaifu (stalin_1, "CENTER")
    speak (sov_c, 'Stalin',
    'Fat boi, big kebab.'
    )

    change (1.1, 1.32)

    break

    case 1.33:

    displayWaifu (stalin_1, "CENTER")
    speak (sov_c, 'Stalin',
    'Gimme succ'
    )

    change (1.1, 1.33)

    break
  }
}
