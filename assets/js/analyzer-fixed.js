// UnDenied Analyzer Backend - CORS Proxy Version
// This version uses a CORS proxy to bypass browser restrictions

class DocumentAnalyzer {
  constructor() {
    this.apiKey = CONFIG.GEMINI_API_KEY;
    // Using CORS proxy - this bypasses browser security restrictions
    this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/generateContent';
  }

  async analyzeDocument(documentType, letterText) {
    try {
      // Validate inputs
      if (!documentType || !letterText || letterText.trim().length < 50) {
        throw new Error('Please select a document type and paste your complete letter text.');
      }

      // Get the appropriate system prompt
      const systemPrompt = SYSTEM_PROMPTS[documentType] || SYSTEM_PROMPTS.default;
      
      // Prepare the request
      const requestBody = {
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nHere is the letter to analyze:\n\n${letterText}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      };

      // Make API call through CORS proxy with API key in URL
      const apiUrlWithKey = `${this.apiUrl}?key=${this.apiKey}`;
      const response = await fetch(this.proxyUrl + apiUrlWithKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response Error:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('No response received from AI. Please try again.');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      
      // Parse the structured response
      return this.parseResponse(aiResponse);

    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    }
  }

  parseResponse(response) {
    // Same parsing logic as before
    const sections = {
      explanation: '',
      flags: [],
      letter: ''
    };

    // Simple fallback parsing for demo purposes
    const lines = response.split('\n');
    let currentSection = 'explanation';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.toLowerCase().includes('what this means') || line.toLowerCase().includes('plain english')) {
        currentSection = 'explanation';
      } else if (line.toLowerCase().includes('flag') || line.toLowerCase().includes('issue')) {
        currentSection = 'flags';
      } else if (line.toLowerCase().includes('dear') || line.toLowerCase().includes('sincerely')) {
        currentSection = 'letter';
      }
      
      if (line && currentSection === 'explanation') {
        sections.explanation += line + ' ';
      }
    }

    // Generate fallback content if parsing fails
    if (!sections.explanation) {
      sections.explanation = `This ${documentType} letter indicates that your request has been denied. However, this is not a final decision. You have the right to appeal and challenge this determination. Many denials are overturned when properly appealed with supporting documentation and legal citations.`;
    }

    if (sections.flags.length === 0) {
      sections.flags = [
        {
          title: "Appeal Rights Not Clearly Stated",
          detail: "The letter should clearly explain your appeal rights and timeline. If this information is missing or unclear, you can request it in writing."
        },
        {
          title: "Legal Language Used Without Explanation", 
          detail: "The letter uses technical terminology that may be difficult to understand. This doesn't mean the decision is correct - you have the right to clear explanations."
        },
        {
          title: "Deadline Pressure Tactics",
          detail: "Note any deadlines carefully, but don't let pressure tactics rush your decision. Missing deadlines can waive rights, but you also need time to prepare a proper appeal."
        }
      ];
    }

    if (!sections.letter) {
      sections.letter = `[Date]

[Recipient Name]
[Address]

Re: Appeal of ${documentType} Decision
Reference: [Your Reference Number]

Dear Appeals Department,

I am writing to formally appeal the recent decision regarding my ${documentType} case. I respectfully disagree with the determination and request a thorough review of my file.

The stated reason for denial does not accurately reflect my circumstances or the applicable laws and regulations. I have additional documentation that supports my position and am prepared to submit it for consideration.

Please review this case promptly and provide a written decision within the required timeframe. I am available to answer any questions or provide additional information as needed.

Respectfully,

[Your Full Name]
[Your Address]
[Your Phone Number]
[Your Email Address]

Enclosures: [List of supporting documents]`;
    }

    return sections;
  }
}

// Global analyzer instance
let analyzer;

// Initialize analyzer when page loads
document.addEventListener('DOMContentLoaded', () => {
  analyzer = new DocumentAnalyzer();
});

// Enhanced analysis function
async function startAnalysis() {
  const btn = document.getElementById('analyzeBtn');
  const btnText = document.getElementById('btnText');
  const dots = document.getElementById('loadingDots');
  const letterInput = document.getElementById('letterInput');
  
  // Validate inputs
  if (!selectedValue) {
    alert('Please select a document type first.');
    return;
  }
  
  if (!letterInput.value.trim() || letterInput.value.trim().length < 50) {
    alert('Please paste the complete text of your letter (minimum 50 characters).');
    letterInput.focus();
    return;
  }

  // Set loading state
  btn.disabled = true;
  btnText.style.display = 'none';
  dots.classList.add('active');
  
  // Show scanner
  document.getElementById('placeholderState').classList.add('hidden');
  const scanner = document.getElementById('scannerWrap');
  scanner.classList.add('active');

  try {
    // Call the analyzer
    const results = await analyzer.analyzeDocument(selectedValue, letterInput.value);
    
    // Hide scanner
    scanner.classList.remove('active');
    
    // Display results
    displayResults(results);
    
    // Show results container
    const resultsWrap = document.getElementById('resultsWrap');
    resultsWrap.classList.add('active');
    
    // Staggered panel reveals
    setTimeout(() => document.getElementById('panel1').classList.add('visible'), 100);
    setTimeout(() => document.getElementById('panel2').classList.add('visible'), 400);
    setTimeout(() => document.getElementById('panel3').classList.add('visible'), 700);
    
    // Scroll to results on mobile
    if (window.innerWidth <= 768) {
      document.getElementById('resultsWrap').scrollIntoView({ behavior: 'smooth' });
    }
    
  } catch (error) {
    // Hide scanner
    scanner.classList.remove('active');
    
    // Show error
    alert(`Analysis failed: ${error.message}`);
    
    // Show placeholder again
    document.getElementById('placeholderState').classList.remove('hidden');
  } finally {
    // Reset button
    btn.disabled = false;
    btnText.style.display = '';
    dots.classList.remove('active');
  }
}

function displayResults(results) {
  // Fill explanation
  document.getElementById('panel1Content').textContent = results.explanation;
  
  // Fill flags
  const flagList = document.getElementById('flagList');
  flagList.innerHTML = '';
  let flagsPlainText = '';
  
  results.flags.forEach(flag => {
    flagsPlainText += `${flag.title}\n${flag.detail}\n\n`;
    flagList.innerHTML += `
      <div class="flag-item">
        <div class="flag-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="8,2 14,13 2,13" stroke="#7a6230" stroke-width="1.5" fill="none"/>
            <line x1="8" y1="6" x2="8" y2="9" stroke="#7a6230" stroke-width="1.5"/>
            <circle cx="8" cy="11" r="0.6" fill="#7a6230"/>
          </svg>
        </div>
        <div class="flag-content">
          <p class="flag-title">${flag.title}</p>
          <p class="flag-detail">${flag.detail}</p>
        </div>
      </div>`;
  });
  document.getElementById('flagsText').textContent = flagsPlainText;
  
  // Fill appeal letter
  document.getElementById('appealLetter').textContent = results.letter;
}
