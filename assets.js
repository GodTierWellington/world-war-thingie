function loadAssets () {

    //in console: php -S localhost:8000
    //in chrome: http://localhost:8000/Documents/GitHub/world-war-waifu/index.html
    //backup: https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/

    //images
    zhukov_h_1 = loadImage ("assets/girls/sov_h_1.png")
    zhukov_h_2 = loadImage ("assets/girls/sov_h_2.png")
    zhukov_h_3 = loadImage ("assets/girls/sov_h_3.png")
    zhukov_h_4 = loadImage ("assets/girls/sov_h_4.png")
    zhukov_1 = loadImage ("assets/girls/sov_b_1.png")
    zhukov_2 = loadImage ("assets/girls/sov_b_2.png")
    zhukov_3 = loadImage ("assets/girls/sov_b_3.png")
    zhukov_4 = loadImage ("assets/girls/sov_b_4.png")



    //battle assets
    grass_texture = loadImage ("assets/battle/background/grass_texture.png")

    bullet = loadImage ("assets/battle/bullet.png")

    sov_light = loadImage ("assets/battle/tanks/sov_t26_l.png")
    sov_light_r = loadImage ("assets/battle/tanks/sov_t26_r.png")
    ger_light = loadImage ("assets/battle/tanks/ger_panzer3_l.png")
    ger_light_r = loadImage ("assets/battle/tanks/ger_panzer3_r.png")



    tower0 = loadImage("assets/level0.png")
    tower1 = loadImage("assets/level1.png")

    //ui elements
    textbox_ui = loadImage ("assets/ui/textbox.png")
    button_ui = loadImage ("assets/ui/button.png")
    button_ui_s = loadImage ("assets/ui/button_selected.png")
    button_ui_c = loadImage ("assets/ui/button_clicked.png")
    s_button_ui = loadImage ("assets/ui/small_button.png")
    s_button_ui_s = loadImage ("assets/ui/small_button_selected.png")
    s_button_ui_c = loadImage ("assets/ui/small_button_clicked.png")

    //backgrounds
    moscow_b = loadImage ("assets/background/moscow.png")

    map = loadImage ("assets/map/map.jpg")
    icon_s = loadImage ("assets/map/icon_selected.png")
    icon_c = loadImage ("assets/map/icon_clicked.png")
    ussr_i = loadImage ("assets/map/ussr_icon.png")

    //sizes override
    ussr_i.width = 100
    grass_texture.width = 100
    grass_texture.height = 50

    sov_light.width = 224
    sov_light.height = 105
    sov_light.r = sov_light_r
    sov_light.barrelPosX = 157
    sov_light.barrelPosY = 87

    ger_light.width = 209
    ger_light.height = 104
    ger_light.r = ger_light_r
    ger_light.barrelPosX = 144
    ger_light.barrelPosY = 78

    s_button_ui.width = 231
    s_button_ui.height = 107

    sov_c = [186, 3, 12]
    ger_c = [102, 102, 102]
    jap_c = [249, 236, 177]
    all_c = [31, 103, 226]


    loadMapElements ()
    loadBattleElements ()
  }
