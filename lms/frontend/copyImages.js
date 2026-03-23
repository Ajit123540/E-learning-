const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ajitb\\.gemini\\antigravity\\brain\\2469217f-0713-4544-8cae-ccc1f2e701c3';
const destDir = path.join(__dirname, 'public', 'images', 'courses');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const mappings = {
  'course_1_webdev': '1.png',
  'course_2_datascience': '2.png',
  'course_3_js': '3.png',
  'course_4_advjs': '4.png',
  'course_5_uiux': '5.png',
  'course_6_marketing': '6.png',
  'course_7_python': '7.png',
  'course_8_photo': '8.png',
  'course_9_business': '9.png'
};

files.forEach(file => {
  if (file.endsWith('.png')) {
    for (const [key, destName] of Object.entries(mappings)) {
      if (file.startsWith(key)) {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, destName));
        console.log(`Copied ${file} to ${destName}`);
      }
    }
  }
});
