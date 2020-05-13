module.exports = {
  //주민번호 유효성확인
  checkIdNumber: (serialNumber) => {
    if (serialNumber.length !== 13) {
      return false;
    }
    let checkArray = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    let numbers = serialNumber.split("");
    for (let i = 0; i < numbers.length - 1; i++) {
      sum += numbers[i] * checkArray[i];
    }
    let extraNumber = sum % 11;
    let lastNumber = (11 - extraNumber) % 10;
    if (Number(numbers[numbers.length - 1]) === lastNumber) {
      return true;
    } else {
      return false;
    }
  },
};
