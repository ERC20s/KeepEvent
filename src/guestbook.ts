import { openUI, headerText } from './ui'

// external servers being used by the project - Please change these to your own if working on something else!
export let fireBaseServer =
  'https://us-central1-dcl-guestbook.cloudfunctions.net/app/'

// get player data

export class GuestBook extends Entity {
  eventName: string
  constructor(
    transform: TranformConstructorArgs,
    eventName: string

    //,sound: AudioClip
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(new GLTFShape('models/de3.glb'))
    this.addComponent(new Transform(transform))

    this.eventName = eventName

    this.addComponent(
      new OnPointerDown(
        () => {
          openUI(eventName)
          log('OPENED GUESTBOOK')
        },
        { hoverText: "Sign the Discord guestbook!",
          distance: 33, }
      )
    )

    let guestBookBase = new Entity()
    guestBookBase.addComponent(new Transform())
    guestBookBase.addComponent(
      new GLTFShape('models/guestbook/guestbook_base.glb')
    )
    guestBookBase.setParent(this)
  }
}
