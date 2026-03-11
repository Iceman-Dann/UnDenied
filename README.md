# UnDenied - Fight Back Against Wrongful Official Letters

🏆 **Award-winning project that helps people understand and appeal wrongful official letters**

## 📋 Project Overview

Every year, hundreds of millions of official letters are sent to ordinary people — insurance denials, eviction notices, benefits rejections, school suspensions, medical bills, credit disputes. These letters are intentionally written by lawyers to confuse people into giving up.

**The shocking statistics:**
- 📊 80% of people never appeal wrongful decisions
- 🎯 Of those who do appeal, 80% win
- 💔 Most denials are wrongful, but people give up not because they're wrong — because they couldn't understand the letter

**Who gets hurt most:**
- Low-income families
- Elderly people  
- Immigrants
- Single mothers

UnDenied is a comprehensive web application that empowers ordinary people to fight back against intimidating official letters.

## 🚀 Features

### 📄 Document Analyzer
- AI-powered analysis of official letters
- Plain-language explanations of legal jargon
- Identification of appeal rights and deadlines
- Personalized appeal strategy generation

### 🎯 The Denial Machine
- Interactive visualization of the systemic denial problem
- Data-driven insights into denial patterns
- Educational content about rights and procedures

### 💡 Knowledge Center
- Comprehensive rights database
- Step-by-step appeal guides
- Success stories and testimonials
- Legal resource directory

### 🛠 Technical Features
- Modern, responsive web design
- AI-powered document analysis
- Interactive data visualizations
- Secure user data handling
- Cross-platform compatibility

## 📁 Project Structure

```
UnDenied/
├── 📂 src/                    # Main application files
│   ├── index.html            # Landing page
│   ├── annalyzer.html        # Document analyzer
│   ├── TheDenialMachine.html # Data visualization
│   ├── stories.html          # Success stories
│   ├── knowrights.html       # Rights database
│   ├── about.html            # About page
│   ├── config.js             # Application configuration
│   └── test-api*.html        # API testing tools
├── 📂 assets/                 # Static resources
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript libraries
│   ├── images/               # Images and icons
│   └── fonts/                # Custom fonts
├── 📂 server/                 # Backend server files
│   ├── server.py             # Main Python server
│   ├── start-server.py       # Server startup script
│   └── start.bat             # Windows batch file
├── 📂 docs/                   # Documentation
│   ├── README.md             # This file
│   ├── README-ANALYZER.md    # Analyzer documentation
│   ├── SETUP.md              # Setup instructions
│   └── QUICK-START.md        # Quick start guide
├── 📂 scripts/                # Utility scripts
├── 📂 tests/                  # Test files
└── .env                      # Environment variables
```

## 🛠 Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **GSAP** - Advanced animations
- **D3.js** - Data visualizations

### Backend
- **Python** - Server-side logic
- **Flask/FastAPI** - Web framework
- **Google Gemini API** - AI document analysis

### Design
- **Responsive Design** - Works on all devices
- **Modern UI/UX** - User-friendly interface
- **Accessibility** - WCAG compliant
- **Performance** - Optimized loading

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Modern web browser
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UnDenied
   ```

2. **Set up environment**
   ```bash
   # Copy .env file and add your API key
   cp .env.example .env
   # Edit .env with your Gemini API key
   ```

3. **Start the server**
   ```bash
   # Windows
   server\start.bat
   
   # Or manually:
   python server/start-server.py
   ```

4. **Open in browser**
   ```
   http://localhost:8000/src/index.html
   ```

## 📖 Usage Guide

### Using the Document Analyzer
1. Navigate to the Analyzer page
2. Upload your official letter (PDF, JPG, PNG)
3. Wait for AI analysis
4. Review plain-language explanation
5. Follow personalized appeal steps

### Understanding Your Rights
1. Visit the Know Your Rights section
2. Browse by letter type or jurisdiction
3. Read step-by-step guides
4. Access legal resources

### Viewing Success Stories
1. Explore the Stories section
2. Filter by case type
3. Read real appeal success examples
4. Get inspired to take action

## 🧪 Testing

### API Testing
- `test-api.html` - Basic API connectivity test
- `test-api-v2.html` - Comprehensive API diagnostic tool

### Manual Testing
1. Test document upload and analysis
2. Verify all page navigation
3. Check responsive design on different devices
4. Validate form submissions

## 🔧 Configuration

### Environment Variables
Set these in your `.env` file:
```
GEMINI_API_KEY=your_google_gemini_api_key
PORT=8000
DEBUG=false
```

### Customization
- Modify `src/config.js` for application settings
- Update `assets/css/` for styling changes
- Add new content in respective HTML files

## 🏆 Impact & Recognition

### Social Impact
- 💪 Empowers vulnerable populations
- ⚖️ Increases access to justice
- 📚 Improves legal literacy
- 🎯 Reduces wrongful denials

### Technical Achievement
- 🤖 Advanced AI integration
- 📊 Interactive data visualization
- 🎨 Modern web design
- 🔒 Secure data handling

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Check the documentation in `docs/`
- Review `QUICK-START.md` for basic setup
- Use the test tools to verify functionality

## 📄 License

This project is dedicated to public service. Please see license file for details.

---

**Built with ❤️ for the people who need it most**
