// Extra calculator vocabulary and shapes kept separate so the core screen stays small.
calc = function (raw) {
  let s = raw.toLowerCase().replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-').replaceAll('π', 'pi').replaceAll('√', 'sqrt');
  if (!s.trim()) return 0;
  if (!/^[0-9+\-*/^().!,\s_a-z]+$/.test(s)) throw Error('อักขระไม่ถูกต้อง');
  s = s.replaceAll(',', '').replace(/(\d|\)|pi|e)(?=\s*\()/g, '$1*').replace(/(\d|\))(?=\s*(pi|e|sqrt|sin|cos|tan|log|ln))/g, '$1*');
  let depth = 0;
  for (const char of s) { if (char === '(') depth++; if (char === ')') depth--; if (depth < 0) throw Error('วงเล็บปิดเกิน'); }
  s += ')'.repeat(depth);
  s = s.replace(/(\d+(?:\.\d+)?)!/g, (_, n) => 'fact(' + n + ')').replace(/\bpi\b/g, 'Math.PI').replace(/\be\b/g, 'Math.E').replace(/\bsqrt\s*\(/g, 'Math.sqrt(').replace(/\bln\s*\(/g, 'Math.log(').replace(/\blog\s*\(/g, 'Math.log10(').replace(/\bsin\s*\(/g, 'Math.sin(Math.PI/180*').replace(/\bcos\s*\(/g, 'Math.cos(Math.PI/180*').replace(/\btan\s*\(/g, 'Math.tan(Math.PI/180*').replaceAll('^', '**');
  const value = Function('fact', '"use strict"; return (' + s + ')')(fact);
  if (!Number.isFinite(value)) throw Error('คำนวณไม่ได้');
  return value;
};

Object.assign(shapes, {
  pyramidFrustum: ['พีระมิดตัด', [['b', 'ด้านฐานล่าง'], ['t', 'ด้านบน'], ['h', 'สูง']], v => {
    const slant = Math.hypot(v.h, (v.b - v.t) / 2);
    return [['พื้นที่ผิวข้าง', 2 * (v.b + v.t) * slant], ['พื้นที่ผิวทั้งหมด', v.b ** 2 + v.t ** 2 + 2 * (v.b + v.t) * slant], ['ปริมาตร', v.h * (v.b ** 2 + v.b * v.t + v.t ** 2) / 3]];
  }],
  sphereCap: ['ส่วนของทรงกลม', [['r', 'รัศมีฐาน'], ['h', 'ความสูง']], v => [['ปริมาตร', Math.PI * v.h ** 2 * (3 * v.r - v.h) / 3]]]
});

Object.assign(groups, {
  'อุปกรณ์ทำอาหาร': { tsp: 1, tbsp: 3, cup: 48, ml: 0.202884, l: 202.884 },
  'การถ่ายโอนข้อมูล': { bps: 1, kbps: 1e3, Mbps: 1e6, Gbps: 1e9, Bps: 8, MBps: 8e6 },
  'ที่จัดเก็บข้อมูล': { B: 1, KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12, KiB: 1024, MiB: 1048576, GiB: 1073741824 }
});
    
