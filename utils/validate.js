// 手机/电话验证
export function isvalidPhone(str) {
  // const reg = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
  const reg = /^1[345789][0-9]{9}$/;
  return reg.test(str)
}

// 密码验证
export function ispwd(str) {
  const reg = /^[a-zA-Z0-9]{6,18}$/
  return reg.test(str)
}

//邮箱验证
export function isvalidMail(str) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
  return reg.test(str)
}
// 手机/电话验证
export function isvalidTel(str) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/;
  return reg.test(str)
}
//正整数
export function isPositiveInteger(str) {
  const reg = /^[1-9]+$/ ;
  return reg.test(str)
}
//是否为空
export function isNullOrEmpty(value) {
  return (value === null || value === '' || value === undefined) ? true : false;
}
//去空格
export function trim(value) {
  return value.replace(/(^\s*)|(\s*$)/g, "");
}
