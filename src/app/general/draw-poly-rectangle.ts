import { DrawPoly } from './draw-poly'

export class DrawPolyRectangle extends DrawPoly {
    constructor(public locationX: number, public locationY: number, public width: number, public height: number,
        public foreColor: string, public backColor: string) {
        super(locationX, locationY, width, height, foreColor, backColor)
        this.shapeType = "Rectangle"
    }

    draw(ctx: any) {
        super.draw(ctx)
        ctx.strokeRect(this.locationX, this.locationY, this.width, this.height)
        ctx.fillRect(this.locationX, this.locationY, this.width, this.height)
    }

    stickOut(ctx: any) {
        super.stickOut(ctx)
        //ctx.strokeRect(this.locationX + 1, this.locationY + 1, this.width + 1, this.height + 1)
    }

}
