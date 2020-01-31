export function saveData(name: string, value: string): void {
  // const exdate = new Date();
  // const expiredays = 30;
  // exdate.setDate(exdate.getDate() + expiredays);
  // document.cookie = name + "=" + escape(value) +
  //   ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString())
  localStorage.setItem(name, value)
}

export function getData(name: string): string {
  // if (document.cookie.length > 0) {
  //   let c_start = document.cookie.indexOf(name + "=");
  //   if (c_start !== -1) {
  //     c_start = c_start + name.length + 1;
  //     let c_end = document.cookie.indexOf(";", c_start);
  //     if (c_end === -1) {
  //       c_end = document.cookie.length;
  //     }

  //     return unescape(document.cookie.substring(c_start, c_end));
  //   }
  // }

  // return "";
  return localStorage.getItem(name) || ''
}