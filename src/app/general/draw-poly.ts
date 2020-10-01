export class DrawPoly {
    constructor(public LocationX: number, public LocationY: number, public Width: number, public Height: number,
        public foreColor: string, public backColor: string) { }

    draw(ctx: any) {
        ctx.lineWidth = 2
        ctx.strokeStyle = this.foreColor
        ctx.fillStyle = this.backColor
        ctx.beginPath()
    }

    stickOut(ctx: any) {
        ctx.lineWidth = 5
        ctx.strokeStyle = 'yellow'
        ctx.strokeRect(this.LocationX - 4, this.LocationY - 4, this.Width + 8, this.Height + 8)
    }

    changeBackColor(color: string) {
        this.backColor = color
    }
    changeForeColor(color: string) {
        this.foreColor = color
    }
}
