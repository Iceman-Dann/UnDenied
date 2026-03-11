# UnDenied Quick Setup Guide

## Problem: "Analyze my letter doesn't work"

### Step 1: Get Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (it looks like: AIzaSyD...xyz)

### Step 2: Configure the Key
1. Open `config.js` file
2. Find line 4: `GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY'`
3. Replace `YOUR_GEMINI_API_KEY` with your actual key:
```javascript
GEMINI_API_KEY: 'AIzaSyD...your-actual-key-here'
```

### Step 3: Test the Analyzer
1. Open `annalyzer.html` in your browser
2. Select a document type (e.g., "Insurance Denial")
3. Paste a denial letter (at least 50 characters)
4. Click "Analyze My Letter"

## Common Issues & Fixes

### Issue: "API key not configured" Error
**Fix**: Make sure you replaced `YOUR_GEMINI_API_KEY` in config.js with your actual key

### Issue: "Analysis failed" Error
**Fixes**:
- Check internet connection
- Verify API key is correct
- Make sure letter text is at least 50 characters

### Issue: Nothing happens when clicking Analyze
**Fixes**:
- Open browser developer console (F12)
- Look for error messages
- Make sure you selected a document type

### Issue: CORS errors in console
**Fix**: Use a simple local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server)
npx http-server

# Then open: http://localhost:8000/annalyzer.html
```

## Testing with Sample Data

You can test with this sample insurance denial text:

```
Dear John Smith,

We are writing to inform you that your claim for the MRI performed on June 15, 2024, has been denied. The reason for denial is that the MRI was not medically necessary according to our coverage guidelines.

You have the right to appeal this decision within 30 days of receiving this notice.

Sincerely,
Health Insurance Company
```

## Debug Mode

Open browser console (F12) to see:
- API request details
- Error messages
- Response parsing information

## Still Not Working?

1. Check that your API key has quota remaining
2. Try a different browser
3. Clear browser cache
4. Contact Google AI support if API key issues persist
