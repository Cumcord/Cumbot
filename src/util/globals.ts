export {};

declare global {
    var IS_DEV_MODE: boolean;
}

global.IS_DEV_MODE = process.argv[2] === "dev";