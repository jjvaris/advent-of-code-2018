const day = process.argv[2];
const advent = new (require(`./${day}/advent${day}`))(day);
advent.executeAdvent(day);
