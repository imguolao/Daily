/**
 * 返回两数之间随机数
 * @param {number} min 
 * @param {number} max 
 */
export function getRandomInt(min, max) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}