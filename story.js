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
    displayWaifu (zhukov_h_1, "CENTER")
    speak (sov_c, 'Zhukov',
    'I want to eat ice cream.'
    )

    change (1.0, 1.1)

    break

    case 1.1:

    displayWaifu (zhukov_h_4, "CENTER")
    speak (sov_c, 'Zhukov',
    'But no one ever gives me ice cream!!'
    )

    change (1.0, 1.2, setOverride (1.1))

    break

    case 1.2:

    makeChoice ([["Give ice cream.", 1.31],
                ["Don't give any.", 1.32]], 1.1)

    change (1.1, 1.2)

    break

    case 1.31:

    displayWaifu (zhukov_h_1, "CENTER")
    speak (sov_c, 'Zhukov',
    'Thank you!'
    )

    change (1.1, 1.31)

    break

    case 1.32:

    displayWaifu (zhukov_3, "CENTER")
    speak (sov_c, 'Zhukov',
    'Meanie.'
    )

    change (1.1, 1.32)

    break

  }
}
