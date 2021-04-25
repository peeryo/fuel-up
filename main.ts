namespace SpriteKind {
    export const gas = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fdd111111ddf......
        ......fbdd1111dddf......
        ......fcdbfddfbdbf......
        .......fbcf11fcbfff.....
        .......ffb1111bcfbcf....
        ........fcdb1bdfbbbf....
        .......ffffffffffcf.....
        .....fcb1bcfffff........
        .....f1b1b1ffff.........
        ......ffbff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        `, mySprite, 0, -90)
    projectile.startEffect(effects.hearts)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.starField, 500)
    otherSprite.destroy(effects.blizzard, 500)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.spray, 500)
})
let myEnemy: Sprite = null
let myFuel = 0
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 4 . . . . . . . 
    . . . . . . . . d . . . . . . . 
    . . . . . . . . d . . . . . . . 
    . . . . . . . e d e . . . . . . 
    . . . . . . . e d e . . . . . . 
    . . . . . . . 7 7 7 . . . . . . 
    . . . . . . e 9 9 9 e . . . . . 
    . . . . . . e e e e e . . . . . 
    . . . . . . e c c c e . . . . . 
    . . . . . . a a a a a . . . . . 
    . . . . . . 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 3 . . . . 
    . . . 3 3 3 . . . . . 3 3 3 . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
mySprite.startEffect(effects.smiles, 500)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
game.onUpdateInterval(5000, function () {
    myFuel = 0
    sprites.createProjectileFromSprite(img`
        ..............bbbbbbb...........
        ...........bb66663333baa........
        .........bb3367776333663aa......
        ........b33333888333389633aa....
        .......b3333333333333389633aa...
        ......b34443333333333338633bae..
        .....b3455433333333334443333ae..
        ....b33322333dddd3333455233daee.
        ...b3d333333dd3bbbb33322333dabe.
        ..b3d333333d3bb33bb33333333da4e.
        ..bd33333333b33aab3333333223a4ee
        .b3d3663333b33aab33366332442b4ee
        .bd3b983333a3aa3333387633ee3b4ee
        .bd6983333baaa333333387633bb4bee
        b3d6833333bba333333333863ba44ebe
        bdd3333333bb3333333333333a44bebe
        add666633333322333366333ba44bbbe
        ad67776333332442336983d3a444b4e.
        add888b333333ee3369833d3a44b44e.
        add333333333333336833d3a444b4e..
        a3dd3333344433333dddd3a444b44e..
        ab33ddd325543333dd33aa444b44e...
        .eabb3dd32233333baaa4444b44e....
        .ebabb3d333d33baa444443b44e.....
        ..ebaab3ddd3aaa4444433b44e......
        ..eebbaab33a44444333b444e.......
        ...eeebbaab444b333b4444e........
        ....ebeeebbbbbbbb4444ee.........
        .....eebbbb44444444ee...........
        .......eeebbb444eee.............
        ..........eeeeee................
        ................................
        `, mySprite, 0, 80).x = randint(5, 155)
    mySprite.setKind(SpriteKind.gas)
})
game.onUpdateInterval(1000, function () {
    myEnemy = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 3 3 3 3 3 f 3 3 3 3 3 3 . . 
        . . 3 3 3 3 3 3 f 3 3 3 3 3 . . 
        . . 3 3 3 3 3 f 3 3 3 3 3 3 . . 
        . . . 3 3 3 3 3 f 3 3 3 3 . . . 
        . . . 5 3 3 3 f 3 3 3 3 5 . . . 
        . . . . 3 3 3 3 f 3 3 3 . . . . 
        . . . . 3 3 3 f 3 3 3 3 . . . . 
        . . . . . 3 3 3 f 3 3 . . . . . 
        . . . . . 5 3 f 3 3 5 . . . . . 
        . . . . . . 3 3 f 3 . . . . . . 
        . . . . . . 3 f 3 3 . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
