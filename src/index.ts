class Change {
  // このクラスはあくまで値を保持することを目的とする
  price: number;
  amount: number;
  type: string;

  constructor(price: number, amount: number, type: string) {
    this.price = price;
    this.amount = amount;
    this.type = type;
  }

  // 今後変更される可能性が高いからChangeクラスから出した方がいい
  dispayChangeDetails() {
    return `${this.price}円${this.type} ${this.amount}枚`;
  }
}
type MoneyTypes = { [key: number]: string };

const moneyTypes: MoneyTypes = {
  // 10個くらいだったらベタが書きでいいかも
  10000: "紙幣",
  5000: "紙幣",
  1000: "紙幣",
  500: "硬貨",
  100: "硬貨",
  50: "硬貨",
  10: "硬貨",
  5: "硬貨",
  1: "硬貨",
};

interface ChangeItem {
  item: Change;
}

const input: string = require("fs").readFileSync("/dev/stdin", "utf8");
const [price, paid] = input.split(" ").map((item) => parseInt(item));

const bussinessLogic = (price: number, paid: number) => {
  let changeArray: Change[] = [];

  // ここに計算が入る
  let change = paid - price;
  const denominations = Object.keys(moneyTypes)
    .map(Number)
    .sort((a, b) => b - a);

  for (const denomination of denominations) {
    const count = Math.floor(change / denomination);
    if (count > 0) {
      changeArray.push(new Change(denomination, count, moneyTypes[denomination]));
      change -= denomination * count;
    }
  }
  // お釣り配列だと複数の支払いのお釣りだと思ってしまう
  // changeByCoinsなどが良さそう
  return changeArray;
};

const dispayChange = (changeResultArray: Change[], change: number) => {
  console.log(`お釣りは、${change}円です。`);
  changeResultArray.forEach((item) => {
    console.log(item.dispayChangeDetails());
  });
};

const changeResultArray = bussinessLogic(price, paid);
const changeResult = paid - price;
dispayChange(changeResultArray, changeResult);
