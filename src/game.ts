import * as RestrictedActions from '@decentraland/RestrictedActions'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import { GuestBook } from './guestbook'
import utils from '../node_modules/decentraland-ecs-utils/index'

const imageTexture = new Texture('images/UI_Guestbook.png')
const canvas = new UICanvas()

const songs: { src: string; name: string }[] = [
  { src: 'sounds/hiphop.mp3', name: 'Hiphop' },
  { src: 'sounds/house.mp3', name: 'House' }
]

const inventoryContainer = new UIContainerStack(canvas)
inventoryContainer.adaptWidth = true
inventoryContainer.adaptHeight = true
inventoryContainer.width = 200
inventoryContainer.height = 75
inventoryContainer.positionY = 100
inventoryContainer.positionX = 0
inventoryContainer.color = Color4.Yellow()
inventoryContainer.hAlign = "right"
inventoryContainer.vAlign = "bottom"
inventoryContainer.stackOrientation = UIStackOrientation.VERTICAL
inventoryContainer.opacity = 0.1

const NextButton0 = new UIImage(canvas, imageTexture)
NextButton0.width = 76
NextButton0.height = 76
NextButton0.hAlign = "right"
NextButton0.vAlign = "bottom"
NextButton0.positionY = 100
NextButton0.positionX = 10
NextButton0.sourceWidth = 75
NextButton0.sourceHeight = 75
NextButton0.visible = false

const NextButton1 = new UIImage(canvas, imageTexture)
NextButton1.width = 76
NextButton1.height = 76
NextButton1.hAlign = "right"
NextButton1.vAlign = "bottom"
NextButton1.positionY = 100
NextButton1.positionX = 10
NextButton1.sourceWidth = 75
NextButton1.sourceHeight = 75
NextButton1.visible = true

const NextButton2 = new UIImage(canvas, imageTexture)
NextButton2.width = 76
NextButton2.height = 76
NextButton2.hAlign = "right"
NextButton2.vAlign = "bottom"
NextButton2.positionY = 176
NextButton2.positionX = 10
NextButton2.sourceWidth = 75
NextButton2.sourceHeight = 75
NextButton2.visible = false

const NextButton3 = new UIImage(canvas, imageTexture)
NextButton3.width = 76
NextButton3.height = 76
NextButton3.hAlign = "right"
NextButton3.vAlign = "bottom"
NextButton3.positionY = 252
NextButton3.positionX = 10
NextButton3.sourceWidth = 75
NextButton3.sourceHeight = 75
NextButton3.visible = false

const sname = new UIText(canvas)
sname.value = "MusicBox"
sname.width = 76
sname.height = 76
sname.hAlign = "right"
sname.vAlign = "bottom"
sname.positionY = 110
sname.positionX = -120
sname.fontSize = 25
sname.color = Color4.Black()

const sname2 = new UIText(canvas)
sname2.value = "House"
sname2.width = 76
sname2.height = 76
sname2.hAlign = "right"
sname2.vAlign = "bottom"
sname2.positionY = 186
sname2.positionX = -120
sname2.fontSize = 25
sname2.color = Color4.Black()
sname2.visible = false

const sname3 = new UIText(canvas)
sname3.value = "HipHop"
sname3.width = 76
sname3.height = 76
sname3.hAlign = "right"
sname3.vAlign = "bottom"
sname3.positionY = 262
sname3.positionX = -120
sname3.fontSize = 25
sname3.color = Color4.Black()
sname3.visible = false


NextButton0.onClick = new OnClick(() => {
  sname.value = "MusicBox"
  inventoryContainer.height = 75
  NextButton0.visible = false
  NextButton1.visible = true
  NextButton2.visible = false
  NextButton3.visible = false
  sname2.visible = false
  sname3.visible = false
  }
)

let buttonArray = []

for (let i = 0; i < songs.length; i++) {

  let song = new AudioClip(songs[i].src)
  let audioSource = new AudioSource(song)
  audioSource.playing = false

NextButton1.onClick = new OnClick(() => {
  sname.value = "close"
  inventoryContainer.height = 230
  NextButton0.visible = true
  NextButton1.visible = false
  NextButton2.visible = true
  NextButton3.visible = true
  sname2.visible = true
  sname3.visible = true
  }
)

NextButton2.onClick = new OnClick(() => {
  sname2.value = "Playing.."
  sname3.value = songs[i-1].name
  pressButton(i)
  }
)

NextButton3.onClick = new OnClick(() => {
  sname2.value = songs[i].name
  sname3.value = "Playing.."
  pressButton(i-1)
  }
)

const camera = Camera.instance

class SomeSystem implements ISystem {
  entity: Entity
  constructor(entity: Entity) {
    this.entity = entity
  }

  update() {
    const transform = this.entity.getComponent(Transform)
    transform.rotation = camera.rotation
  }
}

const spin = new Entity();
engine.addEntity(spin);
spin.addComponent(audioSource)
spin.addComponent(new GLTFShape("models/spink.glb"));
spin.addComponent(new Transform({ position: new Vector3(41, 1.5, 42.25) }));

spin.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://keep.network")
  },
    { hoverText: "Visit Keep.Network" }
)
)

const idoor = new Entity()
engine.addEntity(idoor)
idoor.addComponent(audioSource)
idoor.addComponent(new GLTFShape("models/lama.gltf"))
idoor.addComponent(new Transform({ position: new Vector3(12,39,29), rotation: Quaternion.Euler(0, 180, 0), }));
idoor.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://twitter.com/austingriffith/status/1302369046176739328")
  },
    { hoverText: "Like a llama!",
      distance: 33, }
)
)



  buttonArray[i] = new Entity()

  buttonArray[i].setParent(idoor)
  buttonArray[i].addComponent(
    new utils.ToggleComponent(utils.ToggleState.Off, value => {
      if (value == utils.ToggleState.On) {
        buttonArray[i].getComponent(AudioSource).playing = true
      } else {
        if (buttonArray[i].getComponent(AudioSource).playing) {
          buttonArray[i].getComponent(AudioSource).playing = false
        }
      }
    })
  )

  buttonArray[i].addComponent(audioSource)

  engine.addEntity(buttonArray[i])

const idoor2 = new Entity()
engine.addEntity(idoor2)
idoor2.addComponent(audioSource)
idoor2.addComponent(new GLTFShape("models/lama.gltf"))
idoor2.addComponent(new Transform({ position: new Vector3(68,39,20), rotation: Quaternion.Euler(0, 180, 0), }));
idoor2.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://discord.gg/vxTFBaAu8A")
  },
    { hoverText: "This months prize!",
      distance: 33, }
)
)
engine.addSystem(new SomeSystem(idoor2))

engine.addSystem(new SomeSystem(idoor))


}
//FINISH
function pressButton(i: number) {
  buttonArray[i].getComponent(utils.ToggleComponent).toggle()
  for (let j = 0; j < songs.length; j++) {
    if (j != i) {
      buttonArray[j]
        .getComponent(utils.ToggleComponent)
        .set(utils.ToggleState.Off)
    }
  }
}





const avocado3 = new Entity();
engine.addEntity(avocado3);

avocado3.addComponent(new GLTFShape("models/info1.gltf"));
avocado3.addComponent(new Transform({ position: new Vector3(50, 0, 41.5) }));

avocado3.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://uniswap.info/pair/0x854056fd40c1b52037166285b2e54fee774d33f6")
  },
    { hoverText: "Go to Uniswap!" }
)
)

const pic1 = new Entity()
const shapeComponent = new NFTShape(
  "ethereum://0xc02697c417ddacfbe5edbf23edad956bc883f4fb/1110"
)
pic1.addComponent(shapeComponent)
pic1.addComponent(
  new Transform({
    position: new Vector3(74.5, 43, 30),
    scale: new Vector3(7, 7, 7),
    rotation: Quaternion.Euler(0, 90, 0),
  })
)
pic1.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://app.rarible.com/token/0xc02697c417ddacfbe5edbf23edad956bc883f4fb:1110:0x07356b0edf9b934330f41952b09d076c3810c608")
  },
    { hoverText: "Buy on rarible" }
)
)

engine.addEntity(pic1)

//   socket = new WebSocket('wss://144-126-202-32.nip.io/broadcast/')
// "ethereum://0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/25180895152149446296289720949950847647707"
// https://www.youtube.com/watch?v=RN7mbUBzUJw




const win = new Entity()
engine.addEntity(win)
win.addComponent(new GLTFShape("models/de4.glb"))
win.addComponent(new Transform({ position: new Vector3(75.58, 0, 30) }));

win.addComponent(

  new OnPointerDown(() => {
    openExternalURL("https://nifty.ink/ink/QmX5X2HYuj3QP7he9froXQGmfeCLauXtTngPsmvtg9U3n4")
  },
    { hoverText: "Watch the artist draw!" }
)
)

const de1 = new Entity()
engine.addEntity(de1)
de1.addComponent(new GLTFShape("models/de1.glb"))
de1.addComponent(new Transform({ position: new Vector3(75.58, 0, 69) }));

de1.addComponent(

  new OnPointerDown(() => {
    openExternalURL("https://discord.gg/vxTFBaAu8A")
  },
    { hoverText: "Join the keep discord!",
      distance: 33,}
)
)



const de2 = new Entity()
engine.addEntity(de2)
de2.addComponent(new GLTFShape("models/de2.glb"))
de2.addComponent(new Transform({ position: new Vector3(75.58, 0, 56) }));

de2.addComponent(

  new OnPointerDown(() => {
    openExternalURL("https://discord.gg/8tcPxfudVW")
  },
    { hoverText: "Join the tBTC discord!",
      distance: 33,
    }
)
)

let guestBook = new GuestBook(
  {
    position: new Vector3(75.58, 0, 43),
  },
  'test'
)
engine.addEntity(guestBook)
// const de3 = new Entity()
// engine.addEntity(de3)
// de3.addComponent(new GLTFShape("models/de3.glb"))
// de3.addComponent(new Transform({ position: new Vector3(75.58, 0, 43) }));
//
// de3.addComponent(
//
//   new OnPointerDown(() => {},
//     { hoverText: "Submit your discord username",
//       distance: 33,
//      }
// )
// )

const avoc = new Entity()
engine.addEntity(avoc)
avoc.addComponent(new GLTFShape("models/avoc.gltf"))
avoc.addComponent(new Transform({ position: new Vector3(0, 0, -1) }));


const entity = new Entity('entity')
engine.addEntity(entity)
const gltfShape = new GLTFShape(
  'models/grass/FloorBaseGrass_01.glb'
)
entity.addComponent(gltfShape)
const transform2 = new Transform({
  position: new Vector3(40, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(5, 1, 5),
})
entity.addComponentOrReplace(transform2)



const avocado1 = new Entity()
engine.addEntity(avocado1)
avocado1.addComponent(new GLTFShape("models/scene.glb"))
avocado1.addComponent(new Transform({ position: new Vector3(0, 0, -1) }));

const stairz = new Entity()
engine.addEntity(stairz)
stairz.addComponent(new GLTFShape("models/stairz.gltf"))
stairz.addComponent(new Transform({ position: new Vector3(0, 0, -1) }));
stairz.addComponent(
  new OnPointerDown(
    (_e) => {
      RestrictedActions.movePlayerTo({ x: 40, y: 65, z: 28 }, { x: 40, y: 65, z: 28 })
    },
    { hoverText: "Go upstairs!",
    distance: 50,  }
  )
)

const upstairs = new Entity()

engine.addEntity(upstairs)
upstairs.addComponent(new GLTFShape("models/upstairs.glb"))
upstairs.addComponent(new Transform({ position: new Vector3(68, 0, 49) }));
upstairs.addComponent(
  new OnPointerDown(
    (_e) => {
      RestrictedActions.movePlayerTo({ x: 5, y: 44, z: 44 }, { x: 5, y: 44, z: 44 })
    },
    { hoverText: "Go upstairs!",
    distance: 50,  }
  )
)

const dstairs = new Entity()

engine.addEntity(dstairs)
dstairs.addComponent(new GLTFShape("models/dstairs.gltf"))
dstairs.addComponent(new Transform({ position: new Vector3(19, 38, 77) }));
dstairs.addComponent(
  new OnPointerDown(
    (_e) => {
      RestrictedActions.movePlayerTo({ x: 60, y: 5, z: 20 }, { x: 70, y: 5, z: 20 })
    },
    { hoverText: "Go downstairs!",
    distance: 50,  }
  )
)

const moon = new Entity()
engine.addEntity(moon)
moon.addComponent(new GLTFShape("models/moon.gltf"))
moon.addComponent(new Transform({ position: new Vector3(55, 44, 75) }));
moon.addComponent(
  new OnPointerDown(
    (_e) => {
      RestrictedActions.movePlayerTo({ x: 42, y: 599, z: 44 }, { x: 1, y: 1, z: 1 })
    },
    { hoverText: "To the moon!",
    distance: 50,  }
  )
)

const stage = new Entity()
engine.addEntity(stage)
stage.addComponent(new GLTFShape("models/stage.glb"))
stage.addComponent(new Transform({ position: new Vector3(0, 0, -1) }));

stage.addComponent(

  new OnPointerDown(() => {
    openExternalURL("https://keep.network")
  },
    { hoverText: "Keep.Network" }
)
)



const avocado2 = new Entity()
engine.addEntity(avocado2)
avocado2.addComponent(new GLTFShape("models/atm9.glb"))
avocado2.addComponent(new Transform({ position: new Vector3(39.75, 0, 41.5) }));

avocado2.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://discord.gg/vxTFBaAu8A")
  },
    { hoverText: "Ask questions on Discord:" }
)
)



const avocado4 = new Entity();
engine.addEntity(avocado4);

avocado4.addComponent(new GLTFShape("models/info2.gltf"));
avocado4.addComponent(new Transform({ position: new Vector3(40.5, 0, 31.5), rotation: Quaternion.Euler(0, 90, 0),  }));

avocado4.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://docs.keep.network/tbtc/index.pdf")
  },
    { hoverText: "Read the tbtc whitepaper!" }
)
)

const avocado5 = new Entity();
engine.addEntity(avocado5);

avocado5.addComponent(new GLTFShape("models/info3.gltf"));
avocado5.addComponent(new Transform({ position: new Vector3(31.5, 0, 41.5), rotation: Quaternion.Euler(0, 180, 0),  }));

avocado5.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://dapp.test.tbtc.network/")
  },
    { hoverText: "Exchange tBTC for testnet BTC)" }
)
)

const avocado6 = new Entity();
engine.addEntity(avocado6);

avocado6.addComponent(new GLTFShape("models/info4.gltf"));
avocado6.addComponent(new Transform({ position: new Vector3(40.5, 0, 51.5), rotation: Quaternion.Euler(0, 270, 0),  }));

avocado6.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://discord.gg/jaBW8AkKMT")
  },
    { hoverText: "Go to tBTC discord!" }
)
)

const button1 = new Entity();
engine.addEntity(button1);

button1.addComponent(new GLTFShape("models/but1.glb"));
button1.addComponent(new Transform({ position: new Vector3(39.75, 0, 41.5) }));

button1.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://dapp.tbtc.network/deposit")
  },
    { hoverText: "Convert 0.001BTC!" }
)
)

const button2 = new Entity();
engine.addEntity(button2);

button2.addComponent(new GLTFShape("models/but2.glb"));
button2.addComponent(new Transform({ position: new Vector3(39.75, 0, 41.5) }));

button2.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://dapp.tbtc.network/deposit")
  },
    { hoverText: "Convert 0.01BTC!" }
)
)

const button3 = new Entity();
engine.addEntity(button3);

button3.addComponent(new GLTFShape("models/but3.glb"));
button3.addComponent(new Transform({ position: new Vector3(39.75, 0, 41.5) }));

button3.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://dapp.tbtc.network/deposit")
  },
    { hoverText: "Convert 0.1BTC!" }
)
)

const button4 = new Entity();
engine.addEntity(button4);

button4.addComponent(new GLTFShape("models/but4.glb"));
button4.addComponent(new Transform({ position: new Vector3(39.75, 0, 41.5) }));

button4.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://dapp.tbtc.network/deposit")
  },
    { hoverText: "Convert 0.2BTC!" }
)
)

const button5 = new Entity();
engine.addEntity(button5);

button5.addComponent(new GLTFShape("models/but5.glb"));
button5.addComponent(new Transform({ position: new Vector3(39.75, 0, 41.5) }));

button5.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://dapp.tbtc.network/deposit")
  },
    { hoverText: "Convert 0.5BTC!" }
)
)

const button6 = new Entity();
engine.addEntity(button6);

button6.addComponent(new GLTFShape("models/but6.glb"));
button6.addComponent(new Transform({ position: new Vector3(39.75, 0, 41.5) }));

button6.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://dapp.tbtc.network/deposit")
  },
    { hoverText: "Convert 1BTC!" }
)
)



const coins = new Entity();
engine.addEntity(coins);

coins.addComponent(new GLTFShape("models/coins.glb"));
coins.addComponent(new Transform({ position: new Vector3(10, 1, 41.5) }));

coins.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://keep.network")
  },
    { hoverText: "Click to learn more.." }
)
)

const coins1 = new Entity();
engine.addEntity(coins1);

coins1.addComponent(new GLTFShape("models/b2.glb"));
coins1.addComponent(new Transform({ position: new Vector3(10, 1, 41.5) }));

coins1.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.coingecko.com/en/coins/bitcoin")
  },
    { hoverText: "CoinGecko: Bitcoin" }
)
)

const coins2 = new Entity();
engine.addEntity(coins2);

coins2.addComponent(new GLTFShape("models/t2.glb"));
coins2.addComponent(new Transform({ position: new Vector3(10, 1, 41.5) }));

coins2.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.coingecko.com/en/coins/tbtc")
  },
    { hoverText: "CoinGecko: tBTC" }
)
)

const coins3 = new Entity();
engine.addEntity(coins3);

coins3.addComponent(new GLTFShape("models/e1.glb"));
coins3.addComponent(new Transform({ position: new Vector3(10, 1, 41.5) }));

coins3.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.coingecko.com/en/coins/ethereum")
  },
    { hoverText: "CoinGecko: Ethereum" }
)
)

const coins4 = new Entity();
engine.addEntity(coins4);

coins4.addComponent(new GLTFShape("models/k1.glb"));
coins4.addComponent(new Transform({ position: new Vector3(10, 1, 41.5) }));

coins4.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.coingecko.com/en/coins/keep-network")
  },
    { hoverText: "CoinGecko: Keep" }
)
)

const te1 = new Entity();
engine.addEntity(te1);

te1.addComponent(new GLTFShape("models/0luk.glb"));
te1.addComponent(new Transform({ position: new Vector3(68, 4, 70) }));

te1.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/lukasz-zimnoch")
  },
    { hoverText: "Lukasz Zimnoch!" }
)
)

const te2 = new Entity();
engine.addEntity(te2);

te2.addComponent(new GLTFShape("models/0dmi.glb"));
te2.addComponent(new Transform({ position: new Vector3(68, 4, 65) }));

te2.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/dimpar")
  },
    { hoverText: "Dmitry Paremski!" }
)
)

const te3 = new Entity();
engine.addEntity(te3);

te3.addComponent(new GLTFShape("models/0jak.glb"));
te3.addComponent(new Transform({ position: new Vector3(68, 4, 60) }));

te3.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/nkuba")
  },
    { hoverText: "Jakub Nowakowski!" }
)
)

const te4 = new Entity();
engine.addEntity(te4);

te4.addComponent(new GLTFShape("models/0pro.glb"));
te4.addComponent(new Transform({ position: new Vector3(68, 4, 55) }));

te4.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/eth-r")
  },
    { hoverText: "Promethea Raschke!" }
)
)

const te5 = new Entity();
engine.addEntity(te5);

te5.addComponent(new GLTFShape("models/0mat.glb"));
te5.addComponent(new Transform({ position: new Vector3(68, 4, 50) }));

te5.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/mhluongo")
  },
    { hoverText: "Matt Luongo!" }
)
)

const te6 = new Entity();
engine.addEntity(te6);

te6.addComponent(new GLTFShape("models/0liz.glb"));
te6.addComponent(new Transform({ position: new Vector3(68, 4, 40) }));

te6.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/liz-shinn")
  },
    { hoverText: "Liz Shinn!" }
)
)
const te7 = new Entity();
engine.addEntity(te7);

te7.addComponent(new GLTFShape("models/0sea.glb"));
te7.addComponent(new Transform({ position: new Vector3(68, 4, 75) }));

te7.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/sthompson22")
  },
    { hoverText: "Sloan Thompson!" }
)
)

const te8 = new Entity();
engine.addEntity(te8);

te8.addComponent(new GLTFShape("models/0car.glb"));
te8.addComponent(new Transform({ position: new Vector3(68, 0, 45) }));

te8.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/creckhow")
  },
    { hoverText: "Carolyn Reckhow!" }
)
)
const te9 = new Entity();
engine.addEntity(te9);

te9.addComponent(new GLTFShape("models/0pio.glb"));
te9.addComponent(new Transform({ position: new Vector3(68, 0, 50) }));

te9.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/pdyraga")
  },
    { hoverText: "Piotr Dyraga!" }
)
)

const te10 = new Entity();
engine.addEntity(te10);

te10.addComponent(new GLTFShape("models/0ant.glb"));
te10.addComponent(new Transform({ position: new Vector3(68, 0, 55) }));

te10.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/Shadowfiend")
  },
    { hoverText: "Antonio Salazar Cardozo!" }
)
)

const te11 = new Entity();
engine.addEntity(te11);

te11.addComponent(new GLTFShape("models/0cor.glb"));
te11.addComponent(new Transform({ position: new Vector3(68, 0, 60) }));

te11.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/clp16")
  },
    { hoverText: "Corbin Pon!" }
)
)
const te12 = new Entity();
engine.addEntity(te12);

te12.addComponent(new GLTFShape("models/0lau.glb"));
te12.addComponent(new Transform({ position: new Vector3(68, 0, 65) }));

te12.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://twitter.com/LauraWallendal")
  },
    { hoverText: "Laura Wallendal!" }
)
)

const te13 = new Entity();
engine.addEntity(te13);

te13.addComponent(new GLTFShape("models/0mic.glb"));
te13.addComponent(new Transform({ position: new Vector3(68, 0, 70) }));

te13.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/gluzman")
  },
    { hoverText: "Michael Gluzman!" }
)
)

const te14 = new Entity();
engine.addEntity(te14);

te14.addComponent(new GLTFShape("models/0nic.glb"));
te14.addComponent(new Transform({ position: new Vector3(68, 4, 45) }));

te14.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/NicholasDotSol")
  },
    { hoverText: "Nicholas Evans!" }
)
)

const te15 = new Entity();
engine.addEntity(te15);

te15.addComponent(new GLTFShape("models/0raf.glb"));
te15.addComponent(new Transform({ position: new Vector3(68, 0, 75) }));

te15.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/r-czajkowski")
  },
    { hoverText: "Rafal Czajkowski!" }
)
)

const te16 = new Entity();
engine.addEntity(te16);

te16.addComponent(new GLTFShape("models/0eri.glb"));
te16.addComponent(new Transform({ position: new Vector3(68, 0, 40) }));

te16.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://github.com/ironng")
  },
    { hoverText: "Eric Ng!" }
)
)


// const whurl ="https://discordapp.com/api/webhooks/786002210714025986/uAfyt8BUoFKqVkxnLvP4xmVOYoRER93r3VTMHpCbVoGhliReN_1vB6waM1ppIGcJNTRD"
//
// const dismess = {
//     "content": "Just realised I'm spamming my own channel everytime i test my file.. lol.."
// }
//
// fetch(whurl + "?wait=true",
// {"method":"POST",
// "headers": {"content-type": "application/json"},
// "body": JSON.stringify(dismess)})
//
//
// then(a=>a.json()).then(console.log);
