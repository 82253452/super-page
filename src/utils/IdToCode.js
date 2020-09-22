const CHARS = ['F', 'L', 'G', 'W', '5', 'X', 'C', '3',
  '9', 'Z', 'M', '6', '7', 'Y', 'R', 'T', '2', 'H', 'S', '8', 'D', 'V', 'E', 'J', '4', 'K',
  'Q', 'P', 'U', 'A', 'N', 'B']

const CHARS_LENGTH = 32
/**
 * 邀请码长度
 */
const CODE_LENGTH = 6

/**
 * 随机数据
 */
const SLAT = 1234561

/**
 * PRIME1 与 CHARS 的长度 L互质，可保证 ( id * PRIME1) % L 在 [0,L)上均匀分布
 */
const PRIME1 = 3

/**
 * PRIME2 与 CODE_LENGTH 互质，可保证 ( index * PRIME2) % CODE_LENGTH  在 [0，CODE_LENGTH）上均匀分布
 */
const PRIME2 = 11

export function Gen(id) {
  const ij = id * PRIME1 + SLAT
  // 这是邀请码长度 6位数组
  const b = [ij]

  for (let i = 0; i < CODE_LENGTH - 1; i++) {
    b[i + 1] = parseInt(b[i] / CHARS_LENGTH)
    b[i] = (b[i] + i * b[0]) % CHARS_LENGTH
  }
  b[5] = (b[0] + b[1] + b[2] + b[3] + b[4]) * PRIME1 % CHARS_LENGTH
  const codeIndexArray = []
  for (let i = 0; i < CODE_LENGTH; i++) {
    codeIndexArray[i] = b[i * PRIME2 % CODE_LENGTH]
  }
  return codeIndexArray.map(t => CHARS[t]).join('')
}
