import os

files = ['head.txt', 'css1.css', 'css2.css', 'css3.css', 'css_end.txt', 'body.txt', 'js1.js', 'js2.js', 'js_end.txt']

with open('index.html', 'w', encoding='utf-8') as outfile:
    for fname in files:
        if os.path.exists(fname):
            with open(fname, 'r', encoding='utf-8') as infile:
                outfile.write(infile.read() + '\n')
