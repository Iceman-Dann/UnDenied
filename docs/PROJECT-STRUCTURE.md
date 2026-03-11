# UnDenied - Project Structure Guide

## 📁 Folder Organization

This document explains the reorganized folder structure designed for maximum clarity and maintainability.

## 🎯 Design Principles

1. **Separation of Concerns** - Different file types in dedicated folders
2. **Scalability** - Easy to add new features and content
3. **Professional Presentation** - Clean structure for judges and reviewers
4. **Developer Experience** - Intuitive navigation and organization

## 📂 Detailed Structure

### `/src/` - Main Application Files
**Purpose:** Core application pages and configuration
```
src/
├── index.html              # Landing page - first impression
├── annalyzer.html          # Main feature - document analyzer
├── TheDenialMachine.html   # Interactive data visualization
├── stories.html            # User testimonials and success stories
├── knowrights.html         # Educational rights database
├── about.html              # Mission and team information
├── config.js               # Application configuration
├── test-api.html           # API testing tool
└── test-api-v2.html        # Advanced API diagnostics
```

### `/assets/` - Static Resources
**Purpose:** All static assets organized by type
```
assets/
├── css/                    # Stylesheets
│   ├── css1.css
│   ├── css2.css
│   └── css3.css
├── js/                     # JavaScript libraries and utilities
│   ├── analyzer-backend.js
│   ├── analyzer-fixed.js
│   ├── analyzer-server.js
│   ├── analyzer-simple.js
│   ├── js1.js
│   └── js2.js
├── images/                 # Images, icons, graphics
│   └── favicon_64.png
└── fonts/                  # Custom fonts (empty - uses Google Fonts)
```

### `/server/` - Backend Infrastructure
**Purpose:** Server-side files and startup scripts
```
server/
├── server.py               # Main Python web server
├── start-server.py         # Server startup script
└── start.bat               # Windows batch file for easy startup
```

### `/docs/` - Documentation
**Purpose:** Project documentation and guides
```
docs/
├── README.md               # Main project documentation
├── README-ANALYZER.md      # Analyzer feature documentation
├── SETUP.md                # Detailed setup instructions
└── QUICK-START.md          # Quick start guide
```

### `/scripts/` - Utility Scripts
**Purpose:** Development and maintenance scripts
```
scripts/
├── body.txt                # HTML body template
├── concat.py               # File concatenation utility
├── css_end.txt             # CSS template ending
├── head.txt                # HTML head template
└── js_end.txt              # JavaScript template ending
```

### `/tests/` - Testing Framework
**Purpose:** Test files and validation tools
```
tests/                      # Currently empty - ready for test expansion
```

## 🔄 File Path Updates

All HTML files have been updated to use relative paths:
- **CSS files:** `../assets/css/`
- **JavaScript files:** `../assets/js/`
- **Images:** `../assets/images/`
- **Config files:** `../src/`

## 🚀 Benefits of This Structure

### For Judges and Reviewers
✅ **Professional Appearance** - Clean, organized layout  
✅ **Easy Navigation** - Logical folder structure  
✅ **Clear Separation** - Different file types in appropriate locations  
✅ **Scalable Design** - Shows thoughtful project planning  

### For Developers
✅ **Maintainability** - Easy to find and update files  
✅ **Collaboration** - Clear structure for team development  
✅ **Testing** - Dedicated space for test files  
✅ **Documentation** - Comprehensive docs folder  

### For Users
✅ **Performance** - Optimized asset organization  
✅ **Reliability** - Clear structure reduces broken links  
✅ **Accessibility** - Well-organized content delivery  

## 🛠 Maintenance Guidelines

### Adding New Pages
1. Create HTML file in `/src/`
2. Add any CSS to `/assets/css/`
3. Add JavaScript to `/assets/js/`
4. Update documentation in `/docs/`

### Adding New Features
1. Create feature-specific files in appropriate folders
2. Update `config.js` if needed
3. Add tests to `/tests/`
4. Document in `/docs/`

### Asset Management
1. Images go in `/assets/images/`
2. Stylesheets in `/assets/css/`
3. JavaScript in `/assets/js/`
4. Update file paths in HTML files

## 📊 Organization Metrics

- **Files moved:** 31 files reorganized
- **Folders created:** 6 main folders + 4 subfolders
- **Path updates:** 8 HTML files updated
- **Documentation:** 4 comprehensive docs created

This organization transforms a chaotic single-folder project into a professional, scalable application structure that impresses judges and facilitates future development.
