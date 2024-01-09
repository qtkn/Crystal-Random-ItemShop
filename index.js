const fs = require("fs");
let shop = require("./catalog_config.json");

console.log("Crystal Random ItemShop By qtkn!\n");


const Cosmetics = `
AthenaCharacter:CID_009_Athena_Commando_M
AthenaCharacter:CID_010_Athena_Commando_M
AthenaCharacter:CID_011_Athena_Commando_M
... (Add Your Skins That You Want)
`;


const characterIds = Cosmetics.match(/AthenaCharacter:CID_\d+_\w+/g) || [];


function getRandomItem(ids) {
    const randomIndex = Math.floor(Math.random() * ids.length);
    const itemId = ids[randomIndex];
    const [type, id] = itemId.split(':');
    return { type, id };
}


function updateShop(slot, item) {
    const itemId = `${item.type}:${item.id}`;
    shop[slot].itemGrants[0] = itemId;

    // Prices You Can Adjust It If You Want
    shop[slot].price = Math.floor(Math.random() * (2000 - 200 + 1)) + 200;
}


for (let slot in shop) {
    const randomItem = getRandomItem(characterIds);
    updateShop(slot, randomItem);
}


fs.writeFileSync("./catalog_config.json", JSON.stringify(shop, null, 2));

console.log("Randomized The ItemShop", `${__dirname}\\catalog_config.json`);