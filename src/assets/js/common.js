//处理时间
export function getdate(time, type) {
  var result = new Date(time),
    y = result.getFullYear(),
    m = result.getMonth() + 1,
    d = result.getDate();
  if (type) {
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + result.toTimeString().substr(0, 8);
  } else {
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
  }
}