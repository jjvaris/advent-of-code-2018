const day = process.argv[2];
const advent = new (require(`./${day}/solution`))(day);
advent.executeAdvent(day);
