import _has from 'lodash.has';
import _get from 'lodash.get';

export const exportExcel = (csv: string, fileName: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (_has(navigator, 'msSaveBlob')) {
    // IE 10+
    (_get(navigator, 'msSaveBlob', () => undefined) as (a: Blob, b: string) => void)(blob, fileName);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
