import XLSX from 'xlsx';
import moment from 'moment';

export default class Export {
  constructor(props) {
    this.data = props.data || [];
    this.filename = props.filename || '';
    this.mode = props.mode || '';
  }

  // 将workbook装化成blob对象
  workbook2blob = workbook => {
    // 生成excel的配置项
    var wopts = {
      // 要生成的文件类型
      bookType: 'xlsx',
      // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      bookSST: false,
      type: 'binary',
    };
    var wbout = XLSX.write(workbook, wopts);
    // 将字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    var blob = new Blob([s2ab(wbout)], {
      type: 'application/msexcel',
    });
    return blob;
  };

  // 将blob对象创建bloburl，然后用a标签实现弹出下载框
  openDownloadDialog = (blob, fileName) => {
    if (typeof blob === 'object' && blob instanceof Blob) {
      blob = URL.createObjectURL(blob); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = blob;
    // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
    aLink.download = fileName || '';
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    //   移动端
    else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null,
      );
    }
    aLink.dispatchEvent(event);
  };
  // 导出
  handleExport = () => {
    const exportFileName = this.filename.endsWith('.xlsx')
      ? this.filename
      : `${this.filename}-${moment().format('YYYYMMDDHHmmss')}.xlsx`;

    if (this.mode && this.mode === 'multiple') {
      this.exportMultipleSheet(this.data, exportFileName);
    } else {
      this.exportSingleSheet(this.data, exportFileName);
    }
  };

  // 多个 sheet 导出
  exportMultipleSheet = (data, fileName) => {
    const wb = XLSX.utils.book_new();
    data.forEach(value => {
      const sheet = XLSX.utils.json_to_sheet(value.data);
      XLSX.utils.book_append_sheet(wb, sheet, value.sheet);
    });

    const workBlob = this.workbook2blob(wb);

    this.openDownloadDialog(workBlob, fileName);
  };

  // 单个sheet导出
  exportSingleSheet = (data, fileName) => {
    const sheet1 = XLSX.utils.json_to_sheet(data);
    /* create a new blank workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet1, '产品列表');
    const workBlob = this.workbook2blob(wb);

    this.openDownloadDialog(workBlob, fileName);
  };
}
