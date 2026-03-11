// UnDenied Analyzer - Server Version
// This version calls our local Python server to handle Gemini API requests

class DocumentAnalyzer {
  constructor() {
    this.serverUrl = 'http://localhost:8000/api/analyze';
  }

  async analyzeDocument(documentType, letterText) {
    try {
      // Validate inputs
      if (!documentType || !letterText || letterText.trim().length < 50) {
        throw new Error('Please select a document type and paste your complete letter text.');
      }

      // Simulate processing delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Call our local server
      const response = await fetch(this.serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType: documentType,
          letterText: letterText
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Response Error:', errorText);
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }

      const results = await response.json();
      
      // Ensure we have all required sections
      return {
        explanation: results.explanation || 'Analysis could not be completed. Please try again.',
        flags: Array.isArray(results.flags) ? results.flags : [],
        letter: results.letter || 'Appeal letter could not be generated. Please try again.'
      };

    } catch (error) {
      console.error('Analysis error:', error);
      
      // If server is not running, provide helpful message
      if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        throw new Error('Server is not running. Please start the server by running: python server.py');
      }
      
      throw error;
    }
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
