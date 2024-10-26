export const randomPass = function (len = 16, mode = ['Lower', 'Upper', 'Number', 'SpecialCharacters']) {
    if (len === 0 || mode.length === 0) {
        return ""
    }
    
    const lowerCaseArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
    const upperCaseArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const specialArr = ['!', '@', '-', '_', '=', '<', '>', '#', '*', '%', '+', '&', '^', '$'];
    const passArr = [];
    let password = '';
  
    //指定参数随机获取一个字符
    const specifyRandom = function (...arr: (string | number)[][]): string {
      let str = "";
      arr.forEach(item => {
        str += item[Math.floor(Math.random() * item.length)]
      });
      return str;
    }

    let arrList = []
    if (mode.indexOf("Lower") !== -1) {
        arrList.push(lowerCaseArr)
        passArr.push(...lowerCaseArr)
    }
    if (mode.indexOf("Upper") !== -1) {
        arrList.push(upperCaseArr)
        passArr.push(...upperCaseArr)
    }
    if (mode.indexOf("Number") !== -1) {
        arrList.push(numberArr)
        passArr.push(...numberArr)
    }
    if (mode.indexOf("SpecialCharacters") !== -1) {
        arrList.push(specialArr)
        passArr.push(...specialArr)
    }
  
    const forLen = len - password.length;
    for (let i = 0; i < forLen; i++) {
      password += specifyRandom(passArr);
    }
  
    return password;
  }