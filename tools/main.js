onload = main;

/**
 * constatns from chromium
 * 
 */
const spriteData = {
    LDPI: {
        BACKGROUND_EL: { x: 86, y: 2 },
        CACTUS_LARGE: { x: 332, y: 2 },
        CACTUS_SMALL: { x: 228, y: 2 },
        OBSTACLE_2: { x: 332, y: 2 },
        OBSTACLE: { x: 228, y: 2 },
        CLOUD: { x: 86, y: 2 },
        HORIZON: { x: 2, y: 54 },
        MOON: { x: 484, y: 2 },
        PTERODACTYL: { x: 134, y: 2 },
        RESTART: { x: 2, y: 68 },
        TEXT_SPRITE: { x: 655, y: 2 },
        TREX: { x: 848, y: 2 },
        STAR: { x: 645, y: 2 },
        COLLECTABLE: { x: 2, y: 2 },
        ALT_GAME_END: { x: 121, y: 2 },
    },
    HDPI: {
        BACKGROUND_EL: { x: 166, y: 2 },
        CACTUS_LARGE: { x: 652, y: 2 },
        CACTUS_SMALL: { x: 446, y: 2 },
        OBSTACLE_2: { x: 652, y: 2 },
        OBSTACLE: { x: 446, y: 2 },
        CLOUD: { x: 166, y: 2 },
        HORIZON: { x: 2, y: 104 },
        MOON: { x: 954, y: 2 },
        PTERODACTYL: { x: 260, y: 2 },
        RESTART: { x: 2, y: 130 },
        TEXT_SPRITE: { x: 1294, y: 2 },
        TREX: { x: 1678, y: 2 },
        STAR: { x: 1276, y: 2 },
        COLLECTABLE: { x: 4, y: 4 },
        ALT_GAME_END: { x: 242, y: 4 },
    },
    MAX_GAP_COEFFICIENT: 1.5,
    MAX_OBSTACLE_LENGTH: 3,
    HAS_CLOUDS: 1,
    BOTTOM_PAD: 10,
    TREX: {
        WAITING_1: { x: 44, w: 44, h: 47, xOffset: 0 },
        WAITING_2: { x: 0, w: 44, h: 47, xOffset: 0 },
        RUNNING_1: { x: 88, w: 44, h: 47, xOffset: 0 },
        RUNNING_2: { x: 132, w: 44, h: 47, xOffset: 0 },
        JUMPING: { x: 0, w: 44, h: 47, xOffset: 0 },
        CRASHED: { x: 220, w: 44, h: 47, xOffset: 0 },
        COLLISION_BOXES: [
            new CollisionBox(22, 0, 17, 16),
            new CollisionBox(1, 18, 30, 9),
            new CollisionBox(10, 35, 14, 8),
            new CollisionBox(1, 24, 29, 5),
            new CollisionBox(5, 30, 21, 4),
            new CollisionBox(9, 34, 15, 4),
        ],
    },
    OBSTACLES: [
        {
            type: 'CACTUS_SMALL',
            width: 17,
            height: 35,
            yPos: 105,
            multipleSpeed: 4,
            minGap: 120,
            minSpeed: 0,
            collisionBoxes: [
                new CollisionBox(0, 7, 5, 27),
                new CollisionBox(4, 0, 6, 34),
                new CollisionBox(10, 4, 7, 14),
            ],
        },
        {
            type: 'CACTUS_LARGE',
            width: 25,
            height: 50,
            yPos: 90,
            multipleSpeed: 7,
            minGap: 120,
            minSpeed: 0,
            collisionBoxes: [
                new CollisionBox(0, 12, 7, 38),
                new CollisionBox(8, 0, 7, 49),
                new CollisionBox(13, 10, 10, 38),
            ],
        },
        {
            type: 'PTERODACTYL',
            width: 46,
            height: 40,
            yPos: [100, 75, 50],    // Variable height.
            yPosMobile: [100, 50],  // Variable height mobile.
            multipleSpeed: 999,
            minSpeed: 8.5,
            minGap: 150,
            collisionBoxes: [
                new CollisionBox(15, 15, 16, 5),
                new CollisionBox(18, 21, 24, 6),
                new CollisionBox(2, 14, 4, 3),
                new CollisionBox(6, 10, 4, 7),
                new CollisionBox(10, 8, 6, 9),
            ],
            numFrames: 2,
            frameRate: 1000 / 6,
            speedOffset: .8,
        },
    ],
    BACKGROUND_EL: {
        'CLOUD': {
            HEIGHT: 14,
            MAX_CLOUD_GAP: 400,
            MAX_SKY_LEVEL: 30,
            MIN_CLOUD_GAP: 100,
            MIN_SKY_LEVEL: 71,
            OFFSET: 4,
            WIDTH: 46,
            X_POS: 1,
            Y_POS: 120,
        },
    },
    BACKGROUND_EL_CONFIG: {
        MAX_BG_ELS: 1,
        MAX_GAP: 400,
        MIN_GAP: 100,
        POS: 0,
        SPEED: 0.5,
        Y_POS: 125,
    },
    LINES: [
        { SOURCE_X: 2, SOURCE_Y: 52, WIDTH: 600, HEIGHT: 12, YPOS: 127 },
    ],
};





let img;
let ctx;
const W = 160;
const H = 128;

const scaleFactor = 1; // 600 is original game width

function CollisionBox(x, y, w, h) { // just to make spriteData happy
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

function main() {
    ctx = $("#cnvs").getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.canvas.onclick = (e) => {
        let dat = e.target.getBoundingClientRect();
        let x = Math.round(e.clientX - dat.left - 4);
        let y = Math.round(e.clientY - dat.top - 4);
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, 1, 1);
        console.log(x, y);
    }
    img = new Image();
    // img.src = "./assets/cactus.png";
    img.src = "./assets/track0.png";
    // img.src = "./assets/track1.png";
    // img.src = "./assets/dino-standing.png";
    // img.src = "./assets/dino-idle.png";
    // img.src = "./assets/bcactus0.png";
    img.onload = setup;
}

function setup() {
    getDinoWaitingImage();
}

function getDinoWaitingImage() {
    ctx.canvas.width = img.width / 2;
    ctx.canvas.height = img.height / 2;
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    let imageData = convertToBitmapArray(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    printCppArray("dino_rest", imageData, ctx.canvas.width, ctx.canvas.height);
    checkBitmap(imageData, ctx.canvas.width, ctx.canvas.height);

    // checkBitmap([
    //     0b00010000, 0b00010000, 0b00010000, 0b00010000,
    // ], 32, 1);
}

function checkBitmap(bitmap, w, h) {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < bitmap.length; i++) {
        for (let j = 0; j < 8; j++) {
            let idx = i * 8 + j;
            let x = idx % (w + (8 - w % 8) % 8);
            let y = Math.floor((idx - x) / (w + (8 - w % 8) % 8));
            let bit = bitmap[i] & (0b1 << (8 - j - 1));
            if (bit) ctx.fillStyle = "#FFF";
            else ctx.fillStyle = "#000";
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function convertToBitmapArray(arr, width, height) {
    let corrected_width = (width + (8 - width % 8) % 8);
    let ret = new Uint8Array((height * corrected_width) / 8);
    let byte = 0;
    let position = 7;
    let j = 0;
    for (let i = 0; i < arr.length; i += 4) {
        let r = arr[i];
        let g = arr[i + 1];
        let b = arr[i + 2];
        let intensity = activation((r + g + b) / 3);
        if ((((i / 4) % width) >= (width - 1))) { // todo : refactor
            if (position == 0) {
                position = 7;
                ret[j++] = byte | intensity;
                byte = 0;
            } else {
                byte |= intensity << (position);
                position--;
            }

            for (let k = 0; k < (8 - width % 8) % 8; k++) {
                let intensity = 0;
                if (position == 0) {
                    position = 7;
                    ret[j++] = byte | intensity;
                    byte = 0;
                } else {
                    byte |= intensity << (position);
                    position--;
                }
            }
        } else {
            if (position == 0) {
                position = 7;
                ret[j++] = byte | intensity;
                byte = 0;
            } else {
                byte |= intensity << (position);
                position--;
            }
        }
    }
    return ret;
}


function activation(val) {
    if (val >= 122) return 1;
    return 0;
}

function printCppArray(variableName, arr, w, h) {
    let str = `const uint8_t  ${variableName}[] = {`;

    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        str += `0x${(arr[i]).toString(16).toUpperCase()}`;
        if ((i + 1) != arr.length) {
            str += ',';
        }
    }

    str += `}; // w=${w}  h=${h}`;

    console.log(str);
}

function $(el) {
    return document.querySelector(el);
}