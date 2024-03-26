class Change {
  // このクラスはあくまで値を保持することを目的とする
  change: number;

  constructor(change: number) {
    this.change = change;
  }
}

type MoneyTypes = { [key: number]: string };
type ChangeDetails = { [key: number]: number };

class JapaneseChange extends Change {
  constructor(change: number) {
    super(change);
  }

  static moneyTypes: MoneyTypes = {
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

  calcDetail(): ChangeDetails {
    let change = paid - price;
    // 通貨の価値が高い順にソートして配列にする
    const denominations = Object.keys(JapaneseChange.moneyTypes)
      .map(Number)
      .sort((a, b) => b - a);
    let result: ChangeDetails = {};

    denominations.forEach((denomination) => {
      const count = Math.floor(change / denomination);
      if (count > 0) {
        result = { ...result, [denomination]: count };
        change -= denomination * count;
      }
    });
    return result;
  }
}
const displayChange = (change: JapaneseChange) => {
  const changeDetails: ChangeDetails = change.calcDetail();

  // 通貨の価値が高い順にソートして配列にする
  const sortedChangeDetails = Object.keys(changeDetails)
    .map(Number)
    .sort((a, b) => b - a);

  console.log(`お釣りは、${change.change}円です。`);
  sortedChangeDetails.forEach((denomination) => {
    console.log(`${denomination}円${JapaneseChange.moneyTypes[denomination]}が${changeDetails[denomination]}枚`);
  });
};

const input: string = require("fs").readFileSync("/dev/stdin", "utf8");
const [price, paid] = input.split(" ").map((item) => parseInt(item));

const change: JapaneseChange = new JapaneseChange(paid - price);
displayChange(change);
