# UnDenied Analyzer Backend Setup

## Overview
The UnDenied analyzer page now uses Google's Gemini AI API to provide real-time analysis of denial letters. This setup guide explains how to configure and use the backend functionality.

## Files Created
- `config.js` - Configuration file with API settings and system prompts
- `analyzer-backend.js` - Main backend logic for API communication
- `annalyzer.html` - Updated analyzer page with real API integration

## Setup Instructions

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure the API Key
1. Open `config.js`
2. Replace `YOUR_GEMINI_API_KEY` with your actual API key:
```javascript
const CONFIG = {
  GEMINI_API_KEY: 'your-actual-api-key-here',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
};
```

### 3. Test the Integration
1. Open `annalyzer.html` in your browser
2. Select a document type from the dropdown
3. Paste a denial letter (minimum 50 characters)
4. Click "Analyze My Letter"

## Document Types Supported

### 1. Insurance Denial
- **System Prompt**: Specialized in insurance law, ERISA, ACA compliance
- **Analysis Focus**: Medical necessity, coverage exclusions, appeal rights
- **Legal Framework**: ERISA, Affordable Care Act, state insurance regulations

### 2. Eviction Notice
- **System Prompt**: Tenant rights attorney specialization
- **Analysis Focus**: Proper service, cure periods, notice validity
- **Legal Framework**: State landlord-tenant laws, due process requirements

### 3. Benefits Rejection
- **System Prompt**: Government assistance program advocate
- **Analysis Focus**: Due process, program rules, factual errors
- **Legal Framework**: Administrative law, program-specific regulations

### 4. School Suspension
- **System Prompt**: Education law specialist
- **Analysis Focus**: Due process rights, IDEA compliance, disciplinary procedures
- **Legal Framework**: IDEA, Section 504, state education laws

### 5. Medical Bill
- **System Prompt**: Medical billing advocate
- **Analysis Focus**: Billing errors, coding issues, consumer protections
- **Legal Framework**: Healthcare billing regulations, consumer protection laws

### 6. Credit Dispute
- **System Prompt**: Consumer credit attorney
- **Analysis Focus**: FCRA violations, reporting accuracy, dispute procedures
- **Legal Framework**: Fair Credit Reporting Act, consumer credit laws

## Response Structure

The AI returns three distinct parts for each analysis:

### 1. Plain English Translation
- Simple explanation of what the letter means
- Removal of legal jargon and technical terms
- Practical implications for the recipient

### 2. Flagged Areas
- 3-5 specific issues worth questioning
- Each includes title, detailed explanation, and legal basis
- Actionable advice for addressing each issue

### 3. Draft Appeal Letter
- Professional, ready-to-send appeal letter
- Proper legal formatting and citations
- Placeholders for personalization

## Privacy & Security

- **Client-Side Only**: All processing happens in the browser
- **No Data Storage**: Letters are not saved or transmitted beyond the API call
- **API Key Security**: Key is only used for Gemini API calls
- **Temporary Processing**: Text exists only during analysis

## Error Handling

The system includes comprehensive error handling for:
- Missing or invalid API keys
- Network connectivity issues
- API rate limits
- Invalid input data
- Malformed API responses

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Required Features**: Fetch API, ES6 classes, async/await
- **Mobile Support**: Fully responsive with touch interactions

## Cost Considerations

- **Gemini API**: Uses Gemini 1.5 Flash model (cost-effective)
- **Usage-Based**: Pay per token, typical analysis costs <$0.01
- **No Subscription**: No recurring costs beyond API usage
- **Rate Limits**: Standard Gemini API rate limits apply

## Troubleshooting

### Common Issues

**"API key not configured"**
- Check that you replaced `YOUR_GEMINI_API_KEY` in `config.js`
- Ensure no extra spaces or characters in the API key

**"Analysis failed" errors**
- Verify internet connection
- Check Gemini API service status
- Ensure API key has sufficient quota

**No response received**
- Try shorter letter text for testing
- Check browser console for specific error details
- Verify CORS settings if running locally

### Debug Mode
Open browser developer console to see:
- API request details
- Response parsing information
- Error messages and stack traces

## Production Deployment

For production use:
1. Use environment variables for API keys
2. Implement rate limiting on your server
3. Add analytics for usage monitoring
4. Consider caching for common letter types

## Support

- **Documentation**: Check inline code comments
- **API Reference**: [Gemini API Documentation](https://ai.google.dev/docs)
- **Issues**: Report bugs with browser console errors

---

**Legal Notice**: This tool provides legal information and educational content. It is not a substitute for professional legal advice. Users should consult qualified attorneys for specific legal situations.
