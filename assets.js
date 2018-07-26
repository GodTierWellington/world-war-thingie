function loadAssets () {
    //images
    stalin_h_1 = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/girls/sov_h_1.png")
    stalin_h_2 = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/girls/sov_h_2.png")
    stalin_h_3 = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/girls/sov_h_3.png")
    stalin_h_4 = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/girls/sov_h_4.png")
    stalin_1 = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/girls/sov_b_1.png")
    stalin_2 = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/girls/sov_b_2.png")
    stalin_3 = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/girls/sov_b_3.png")
    stalin_4 = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/girls/sov_b_4.png")



    //battle assets
    grass_texture = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/battle/background/grass_texture.png")

    sov_light = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/battle/tanks/sov_t26_l.png")
    sov_light_r = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/battle/tanks/sov_t26_r.png")



    tower0 = loadImage("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/level0.png")
    tower1 = loadImage("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/level1.png")

    //ui elements
    textbox_ui = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ui/textbox.png")
    button_ui = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ui/button.png")
    button_ui_s = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ui/button_selected.png")
    button_ui_c = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ui/button_clicked.png")
    s_button_ui = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ui/small_button.png")
    s_button_ui_s = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ui/small_button_selected.png")
    s_button_ui_c = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ui/small_button_clicked.png")

    //backgrounds
    moscow_b = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/background/moscow.png")

    map = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/map/map.jpg")
    icon_s = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/map/icon_selected.png")
    icon_c = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/map/icon_clicked.png")
    ussr_i = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/map/ussr_icon.png")

    //sizes override
    ussr_i.width = 100
    grass_texture.width = 100
    grass_texture.height = 50
    sov_light.width = 224
    sov_light.height = 105
    sov_light.r = sov_light_r
    s_button_ui.width = 231
    s_button_ui.height = 107

    sov_c = [186, 3, 12]
    ger_c = [102, 102, 102]
    jap_c = [249, 236, 177]
    all_c = [31, 103, 226]


    loadMapElements ()
    loadBattleElements ()
  }
