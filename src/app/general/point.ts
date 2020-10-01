export class point {
    constructor(public X: number, public Y: number) { }
    add(pt: point): point {
        return new point(this.X + pt.X, this.Y + pt.Y)
    }
    div(denom: number) {
        return new point(this.X / denom, this.Y / denom)
    }
    distanceFrom(pt: point) {
        return Math.sqrt(Math.pow(pt.X - this.X, 2) + Math.pow(pt.Y - this.Y, 2))
    }
}
