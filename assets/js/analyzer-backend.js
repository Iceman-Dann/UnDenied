// UnDenied Analyzer Backend - Gemini API Integration
// This file handles all API communication and document analysis

class DocumentAnalyzer {
  constructor() {
    this.apiKey = CONFIG.GEMINI_API_KEY ? CONFIG.GEMINI_API_KEY.trim() : '';
    this.apiUrl = CONFIG.GEMINI_API_URL;
  }

  async analyzeDocument(documentType, letterText, fileData = null) {
    try {
      // Validate inputs
      if (!documentType || (!letterText && !fileData)) {
        throw new Error('Please select a document type and provide your letter.');
      }

      if (!fileData && letterText.trim().length < 50) {
        throw new Error('Please paste the complete text of your letter (minimum 50 characters).');
      }

      // Get the appropriate system prompt
      const systemPrompt = SYSTEM_PROMPTS[documentType] || SYSTEM_PROMPTS.default;

      // Calculate deadline and today's date for the AI
      const today = new Date();
      const todayStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const deadline30 = new Date(today);
      deadline30.setDate(deadline30.getDate() + 30);
      const deadline30Str = deadline30.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const deadline15 = new Date(today);
      deadline15.setDate(deadline15.getDate() + 15);
      const deadline15Str = deadline15.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

      // Inject date context into the prompt
      const dateContext = `\n\nCRITICAL DATE INFORMATION:
- Today's date is: ${todayStr}
- 30 days from today is: ${deadline30Str}
- 15 days from today is: ${deadline15Str}

DATE RULES:
- Use TODAY'S DATE (${todayStr}) for the appeal letter date and all deadline calculations
- Extract the denial letter's date from the user's letter text and reference it only when describing when the denial was issued
- NEVER use dates from any previous examples or cached responses
- If the denial letter mentions an appeal deadline window (e.g., "180 days"), calculate the actual deadline from the letter date found in the text
- All deadlines in your appeal letter MUST use the exact dates provided above`;

      const parts = [
        { text: `${systemPrompt}${dateContext}\n\nHere is the document to analyze:\n\n${letterText}` }
      ];

      if (fileData) {
        parts.push({
          inlineData: {
            mimeType: fileData.mimeType,
            data: fileData.data
          }
        });
      }

      // Prepare the request
      const requestBody = {
        contents: [{
          parts: parts
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
        model: "models/gemini-2.5-flash"
      };

      // Make the API call
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response Error:', errorText);
        throw new Error(this.getErrorMessage(JSON.parse(errorText || '{}')));
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
    console.log('Raw AI Response:', response);

    try {
      // Clean markdown if present
      let cleanResponse = response.trim();
      if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```[a-z]*\n/i, '').replace(/\n```$/m, '');
      }

      const data = JSON.parse(cleanResponse);

      return {
        translation: data.translation || data.explanation || 'Failed to generate explanation.',
        flags: Array.isArray(data.flags) ? data.flags : [],
        appeal: data.appeal || data.letter || 'Failed to generate appeal letter.',
        badges: data.badges || null,
        denial_type: data.denial_type || null,
        deadline: data.deadline || null
      };
    } catch (e) {
      console.warn('JSON Parse Error, attempting regex fallback...', e);

      // Fallback: Attempt to extract sections using regex
      const translationMatch = response.match(/"translation":\s*"([^"]+)"/) || response.match(/translation:\s*([^\n]+)/i);
      const appealMatch = response.match(/"appeal":\s*"([\s\S]*?)"/) || response.match(/appeal:\s*([\s\S]+)/i);

      // Extract flags (look for an array or a list)
      let flags = [];
      const flagsMatch = response.match(/"flags":\s*\[([\s\S]*?)\]/);
      if (flagsMatch) {
        // Extract quoted strings, allowing for multiline content
        const flagStrings = flagsMatch[1].match(/"([^"\\]*(\\.[^"\\]*)*)"/g);
        if (flagStrings) {
          flags = flagStrings.map(s => {
            // Remove quotes and unescape
            let cleaned = s.slice(1, -1);
            cleaned = cleaned.replace(/\\"/g, '"').replace(/\\n/g, '\n');
            return cleaned;
          });
        }
      }

      return {
        translation: translationMatch ? translationMatch[1] : "The analysis was completed, but there was a formatting issue.",
        flags: flags.length > 0 ? flags : ["Check for missing information", "Verify appeal deadlines", "Request specific evidence", "Confirm legal authority"],
        appeal: appealMatch ? appealMatch[1] : response,
        badges: null,
        denial_type: null,
        deadline: null
      };
    }
  }


  getErrorMessage(errorData) {
    if (errorData.error) {
      switch (errorData.error.code) {
        case 400:
          return 'Invalid request. Please check your input and try again.';
        case 401:
          return 'API key is invalid. Please check your configuration.';
        case 403:
          return 'API key does not have permission to access this service.';
        case 429:
          return 'Too many requests. Please wait a moment and try again.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return errorData.error.message || 'An unknown error occurred.';
      }
    }
    return 'Failed to analyze document. Please try again.';
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
  const fileInput = document.getElementById('fileInput');

  const file = fileInput && fileInput.files ? fileInput.files[0] : null;
  const letterText = letterInput ? letterInput.value.trim() : '';

  // Validate inputs
  if (!selectedValue) {
    alert('Please select a document type first.');
    return;
  }

  if (!file && letterText.length < 50) {
    alert('Please upload a document or paste the complete text of your letter (minimum 50 characters).');
    if (letterInput) letterInput.focus();
    return;
  }

  // Check API key
  if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
    alert('API key not configured. Please edit config.js and add your Gemini API key.');
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
    console.log('Starting analysis...');
    
    let fileData = null;
    if (file) {
      try {
        const base64Str = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        fileData = {
          data: base64Str.split(',')[1],
          mimeType: file.type || 'application/pdf'
        };
      } catch (err) {
        alert('Failed to read the uploaded document.');
        scanner.classList.remove('active');
        document.getElementById('placeholderState').classList.remove('hidden');
        btn.disabled = false;
        btnText.style.display = '';
        dots.classList.remove('active');
        return;
      }
    }

    // Call the analyzer
    const results = await analyzer.analyzeDocument(selectedValue, letterText, fileData);
    console.log('Analysis completed, results:', results);

    // Hide scanner
    scanner.classList.remove('active');

    // Display results
    console.log('Calling displayResults...');
    displayResults(results);
    console.log('displayResults completed');

    // Show results container
    const resultsWrap = document.getElementById('resultsWrap');
    resultsWrap.classList.add('active');

    // Staggered panel reveals
    setTimeout(() => revealPanels(), 100);

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
  console.log('displayResults called with:', results);
  
  const resultsWrap = document.getElementById('resultsWrap');
  if (!resultsWrap) {
    console.error('resultsWrap element not found');
    return;
  }
  
  // Get user's letter for quoting
  const userLetter = document.getElementById('letterInput').value;
  
  // Calculate deadline from letter content
  const deadline = extractDeadline(userLetter, selectedValue);
  
  // Create dynamic badges from Gemini response
  const badgesContainer = document.getElementById('resultBadges');
  if (badgesContainer) {
    badgesContainer.innerHTML = '';
    
    // Use Gemini's deadline for deadline badge, violations count for issues badge
    const violationCount = results.flags ? results.flags.length : 0;
    if (violationCount > 0) {
      badgesContainer.innerHTML += `<div class="result-badge violations">${violationCount} Issues Found</div>`;
    }
    
    // Use deadline from Gemini response ONLY - no frontend calculation
    if (results.deadline && results.deadline !== 'Unknown – check envelope postmark') {
      const daysLeft = results.deadline.match(/\((\d+) days\)/);
      const isUrgent = daysLeft && parseInt(daysLeft[1]) <= 7;
      badgesContainer.innerHTML += `<div class="result-badge ${isUrgent ? 'urgent' : 'deadline'}">Deadline: ${results.deadline}</div>`;
    } else if (results.deadline === 'Unknown – check envelope postmark') {
      // Show unknown deadline badge
      badgesContainer.innerHTML += `<div class="result-badge deadline">Deadline: Unknown – check envelope postmark</div>`;
    }
  }
  
  // Create expert context section if it doesn't exist
  let contextGrid = document.getElementById('contextGrid');
  let expertIntro = document.getElementById('expertIntro');
  
  if (!contextGrid || !expertIntro) {
    const expertSection = document.createElement('div');
    expertSection.innerHTML = `
      <div style="margin-bottom: 32px;">
        <div class="expert-badge">Expert Analysis</div>
        <p class="expert-intro" id="expertIntro"></p>
        <div class="context-grid" id="contextGrid"></div>
      </div>
    `;
    resultsWrap.insertBefore(expertSection.firstElementChild, resultsWrap.firstElementChild);
    contextGrid = document.getElementById('contextGrid');
    expertIntro = document.getElementById('expertIntro');
  }
  
  contextGrid.innerHTML = '';

  // Use Gemini's badges for context if available, otherwise use fallback
  if (results.badges && Array.isArray(results.badges)) {
    expertIntro.textContent = "Analyzed under applicable federal and state guidelines for your rights.";
    results.badges.forEach(badge => {
      contextGrid.innerHTML += `
        <div class="context-item">
          <div class="context-key">${badge.label}</div>
          <div class="context-val">${badge.value}</div>
        </div>`;
    });
  } else {
    // Fallback to hardcoded frameworks
    const isSurpriseBill = detectSurpriseBill(userLetter);
    const denialType = detectDenialType(userLetter);
    
    const frameworks = {
      insurance: { 
        intro: "Analyzed under federal ERISA and ACA guidelines for patient rights.", 
        items: [
          { k: "Primary Law", v: "ERISA §503" }, 
          { k: "Review Right", v: "45 CFR §147.136" }, 
          { k: "Denial Type", v: denialType.type }, 
          { k: "Category", v: denialType.category }
        ] 
      },
      eviction: { 
        intro: "Evaluated based on state-specific Landlord-Tenant procedural requirements.", 
        items: [
          { k: "Notice Type", v: "Right to Cure" }, 
          { k: "Service", v: "Proper Delivery" }, 
          { k: "Defense", v: "Warranty of Habitability" }, 
          { k: "Timeline", v: "Cure Period" }
        ] 
      },
      benefits: { 
        intro: "Reviewed against Administrative Law and agency-specific policy manuals.", 
        items: [
          { k: "Framework", v: "20 CFR §416" }, 
          { k: "Due Process", v: "42 USC §405" }, 
          { k: "Evidence", v: "Factual Basis" }, 
          { k: "Standard", v: "De Novo Review" }
        ] 
      },
      school: { 
        intro: "Analyzed using IDEA and Section 504 educational equity standards.", 
        items: [
          { k: "Primary Law", v: "20 USC §1415" }, 
          { k: "Due Process", v: "34 CFR §104.35" }, 
          { k: "Right", v: "Alternative Ed" }, 
          { k: "Standard", v: "Substantial Evidence" }
        ] 
      },
      medical: { 
        intro: isSurpriseBill 
          ? "Surprise bill detected. No Surprises Act protections apply." 
          : "Audited using consumer protection and medical billing transparency laws.", 
        items: isSurpriseBill
          ? [
              { k: "Primary Law", v: "No Surprises Act" }, 
              { k: "Protection", v: "Balance Billing Ban" }, 
              { k: "Cap", v: "In-Network Rate" }, 
              { k: "Right", v: "Independent Dispute" }
            ]
          : [
              { k: "Primary Law", v: "26 USC §501(r)" }, 
              { k: "Billing", v: "Itemized Audit" }, 
              { k: "Right", v: "Charity Care" }, 
              { k: "Standard", v: "Medicare Rate" }
            ]
      },
      credit: { 
        intro: "Analyzed under the Fair Credit Reporting Act (FCRA) consumer protections.", 
        items: [
          { k: "Primary Law", v: "15 USC §1681" }, 
          { k: "Duty", v: "§1681i Reinvestigation" }, 
          { k: "Right", v: "§1681g Documentation" }, 
          { k: "Damages", v: "§1681o Statutory" }
        ] 
      }
    };

    const context = frameworks[selectedValue] || frameworks.insurance;
    expertIntro.textContent = context.intro;
    context.items.forEach(item => {
      contextGrid.innerHTML += `
        <div class="context-item">
          <div class="context-key">${item.k}</div>
          <div class="context-val">${item.v}</div>
        </div>`;
    });
  }

  // Fill explanation
  const panel1Content = document.getElementById('panel1Content');
  if (panel1Content) {
    panel1Content.textContent = results.translation || results.explanation;
  }

  // Fill flags with quoted text from user's letter
  const flagList = document.getElementById('flagList');
  if (!flagList) return;
  flagList.innerHTML = '';
  let flagsPlainText = '';

  results.flags.forEach(flagText => {
    flagsPlainText += `${flagText}\n\n`;
    // Check if AI already included a quote in the flag text
    const hasExistingQuote = flagText.includes('"') && flagText.includes('—');
    // Only find additional quote if AI didn't already include one
    const quote = !hasExistingQuote ? findRelevantQuote(userLetter, flagText) : null;
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
          <p class="flag-detail">${flagText}</p>
        </div>
      </div>`;
  });
  
  const flagsText = document.getElementById('flagsText');
  if (flagsText) {
    flagsText.textContent = flagsPlainText;
  }

  // Fill appeal letter
  const appealLetter = document.getElementById('appealLetter');
  if (appealLetter) {
    appealLetter.textContent = results.appeal || results.letter;
  }
}

// Extract deadline from letter text
function extractDeadline(letter, docType) {
  if (!letter) return null;
  
  const lowerLetter = letter.toLowerCase();
  
  // First, try to extract the letter date
  const datePatterns = [
    /(\w+\s+\d{1,2},?\s+\d{4})/i,
    /(\d{1,2}\/\d{1,2}\/\d{4})/i,
    /(\d{1,2}-\d{1,2}-\d{4})/i
  ];
  
  let letterDate = null;
  for (const pattern of datePatterns) {
    const match = letter.match(pattern);
    if (match) {
      letterDate = new Date(match[1]);
      if (!isNaN(letterDate.getTime())) {
        break;
      }
    }
  }
  
  // Common deadline patterns
  const patterns = [
    /(\d+)\s*days?\s*(to|from|within|before|after)/i,
    /within\s*(\d+)\s*days?/i,
    /(\d+)\s*day\s*notice/i,
    /before\s*(\d+)/i,
    /by\s*(\w+\s*\d{1,2},?\s*\d{4})/i,
    /due\s*(\w+\s*\d{1,2},?\s*\d{4})/i,
    /(\d+)\s*business\s*days?/i
  ];
  
  for (const pattern of patterns) {
    const match = letter.match(pattern);
    if (match) {
      const days = parseInt(match[1]);
      if (!isNaN(days) && days > 0 && days < 365) {
        // Calculate actual deadline date FROM THE LETTER DATE, not today
        const deadlineDate = letterDate || new Date(); // Fallback to today if no letter date found
        deadlineDate.setDate(deadlineDate.getDate() + days);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return {
          text: deadlineDate.toLocaleDateString('en-US', options),
          daysLeft: days
        };
      }
      return { text: match[0], daysLeft: null };
    }
  }
  
  // Default deadlines by document type - only use if no deadline found in letter
  const defaults = {
    insurance: { text: 'Deadline unknown – check letter date', daysLeft: null },
    eviction: { text: 'Deadline unknown – check notice date', daysLeft: null },
    benefits: { text: 'Deadline unknown – check letter date', daysLeft: null },
    school: { text: 'Deadline unknown – check letter date', daysLeft: null },
    medical: { text: 'Deadline unknown – check bill date', daysLeft: null },
    credit: { text: 'Deadline unknown – check letter date', daysLeft: null }
  };
  
  return defaults[docType] || { text: 'Deadline unknown', daysLeft: null };
}

// Find relevant quote from user's letter
function findRelevantQuote(letter, flagText) {
  if (!letter || letter.length < 20) return null;
  
  // Extract key terms from flag (longer words, more specific)
  const keyTerms = flagText.toLowerCase().match(/\b[a-z]{5,}\b/g);
  if (!keyTerms || keyTerms.length < 2) return null;
  
  // Split letter into sentences (proper sentence boundaries)
  const sentences = letter.split(/(?<=[.!?])\s+/);
  if (!sentences || sentences.length < 2) return null;
  
  // Skip header lines (first sentence often contains title/address)
  const contentSentences = sentences.slice(1);
  
  // Find sentence with most matching terms
  let bestMatch = null;
  let bestScore = 0;
  
  for (const sentence of contentSentences) {
    const lowerSentence = sentence.toLowerCase();
    let score = 0;
    for (const term of keyTerms) {
      if (lowerSentence.includes(term)) score++;
    }
    // Require higher score and reasonable sentence length
    if (score > bestScore && score >= 2 && sentence.length > 30 && sentence.length < 200) {
      bestScore = score;
      bestMatch = sentence.trim();
    }
  }
  
  // Only return if we found a good match
  if (bestScore >= 2) {
    return bestMatch;
  }
  return null;
}

// Detect if this is a surprise bill (out-of-network emergency or unexpected)
function detectSurpriseBill(letter) {
  if (!letter) return false;
  
  const lowerLetter = letter.toLowerCase();
  
  // Indicators this is NOT a surprise bill (scheduled, elective, in-network)
  const scheduledIndicators = [
    'scheduled',
    'elective',
    'planned',
    'in-network',
    'prior authorization',
    'pre-authorized',
    'approved procedure',
    'knee surgery',
    'hip replacement',
    'cataract surgery',
    'outpatient surgery',
    'procedure code',
    'cpt code'
  ];
  
  // Check if this is a scheduled/elective procedure
  for (const indicator of scheduledIndicators) {
    if (lowerLetter.includes(indicator)) {
      return false;
    }
  }
  
  // Indicators this IS a surprise bill (emergency, out-of-network)
  const surpriseIndicators = [
    'emergency',
    'urgent',
    'out-of-network',
    'out of network',
    'non-network',
    'balance bill',
    'surprise bill',
    'unexpected',
    'unforeseen',
    'ambulance',
    'emergency room',
    'emergency department',
    'er visit',
    'anesthesiologist',
    'assistant surgeon',
    'on-call'
  ];
  
  // Check for surprise bill indicators
  for (const indicator of surpriseIndicators) {
    if (lowerLetter.includes(indicator)) {
      return true;
    }
  }
  
  return false;
}

// Detect insurance denial type from letter content
function detectDenialType(letter) {
  if (!letter) {
    return { type: "Claim Denial", category: "Medical Necessity" };
  }
  
  const lowerLetter = letter.toLowerCase();
  
  // Prior authorization / pre-auth indicators
  const priorAuthIndicators = [
    'prior authorization',
    'pre-authorization',
    'preauthorization',
    'pre-auth',
    'prior auth',
    'pre-certification',
    'precertification',
    'prior approval',
    'pre-approval',
    'not authorized',
    'authorization denied',
    'auth denial',
    'requested authorization',
    'authorization request'
  ];
  
  // Check for prior auth
  for (const indicator of priorAuthIndicators) {
    if (lowerLetter.includes(indicator)) {
      return { type: "Prior Authorization", category: "Administrative Denial" };
    }
  }
  
  // Medical necessity indicators
  const medicalNecessityIndicators = [
    'not medically necessary',
    'medical necessity',
    'medically necessary',
    'no medical necessity',
    'lacks medical necessity',
    'insufficient medical evidence',
    'clinical guidelines',
    'standard of care'
  ];
  
  // Check for medical necessity denial
  for (const indicator of medicalNecessityIndicators) {
    if (lowerLetter.includes(indicator)) {
      return { type: "Claim Denial", category: "Medical Necessity" };
    }
  }
  
  // Experimental/investigational indicators
  const experimentalIndicators = [
    'experimental',
    'investigational',
    'not proven',
    'insufficient evidence',
    'unproven treatment',
    'research protocol'
  ];
  
  for (const indicator of experimentalIndicators) {
    if (lowerLetter.includes(indicator)) {
      return { type: "Claim Denial", category: "Experimental/Investigational" };
    }
  }
  
  // Out of network indicators
  const outOfNetworkIndicators = [
    'out of network',
    'out-of-network',
    'non-network',
    'non participating',
    'non-participating',
    'not in network',
    'network status'
  ];
  
  for (const indicator of outOfNetworkIndicators) {
    if (lowerLetter.includes(indicator)) {
      return { type: "Network Denial", category: "Out-of-Network" };
    }
  }
  
  // Default
  return { type: "Claim Denial", category: "Coverage Determination" };
}
