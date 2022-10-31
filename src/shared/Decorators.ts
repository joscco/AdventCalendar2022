
export function ScaleOnHover(target: any) {
    // save a reference to the original constructor
    let original = target;

    // the new constructor behaviour
    let f: any = function (...args: any[]) {
        //return  original.apply(this, args);
        let orig = new original(...args); // according to the comments
        orig.on("pointerover", () => {
            gsap.to(orig.scale, {
                x: 1.2,
                y: 1.2,
                duration: 0.3,
                ease: Back.easeOut
            })
        })
        orig.on("pointerout", () => {
            gsap.to(orig.scale, {
                x: 1,
                y: 1,
                duration: 0.3,
                ease: Back.easeOut
            })
        })
        return orig
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
}