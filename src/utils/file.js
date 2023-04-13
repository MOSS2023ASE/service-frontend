export function readAsBlob(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      resolve(event.target.result);
    };
  });
}

export async function readXlsxFile(file) {
  const XLSX = require('xlsx');
  const dataBinary = await readAsBlob(file);
  const workBook = XLSX.read(dataBinary, { type: 'binary', cellDates: true });
  const Sheet1 = workBook.Sheets.Sheet1;
  let i = 1;
  let colMap = new Map();

  for (let j = 0; j < 26; j++) {
    const ch = String.fromCharCode(65 + j);
    if (ch + i.toString() in Sheet1) {
      const colName = Sheet1[ch + i.toString()].v;
      if (typeof colName === 'string') {
        colMap.set(colName.trim(), ch);
      }
    }
  }

  i++;
  let table = {
    name_list: [],
    student_id_list: [],
    password_list: [],
    role_list: []
  };
  while ('A' + i.toString() in Sheet1) {
    table.student_id_list.push(Sheet1[colMap.get('学号') + i.toString()].v);
    table.name_list.push(Sheet1[colMap.get('用户名') + i.toString()].v);
    table.password_list.push(Sheet1[colMap.get('用户密码') + i.toString()].v);
    table.role_list.push(Sheet1[colMap.get('用户类型') + i.toString()].v);
    i++;
  }
  return table;
}
