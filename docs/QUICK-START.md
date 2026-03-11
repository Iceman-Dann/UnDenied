# 🚀 Quick Start Guide - UnDenied Analyzer

## "Failed to fetch" Error Solution

The "Failed to fetch" error happens because browsers block direct API calls from local files. Here's how to fix it:

### Option 1: Use the Python Server (Recommended)

1. **Double-click `start.bat`** 
   - This automatically starts the server and opens the analyzer
   - Opens at: http://localhost:8000/annalyzer.html

2. **Or run manually:**
   ```bash
   python start-server.py
   ```

### Option 2: Use Node.js Server

If you have Node.js:
```bash
npx http-server
# Then open: http://localhost:8080/annalyzer.html
```

### Option 3: Live Server Extension

If you use VS Code:
1. Install "Live Server" extension
2. Right-click `annalyzer.html` → "Open with Live Server"

## Why This Happens

- **Security**: Browsers block `file://` from making API calls
- **CORS Policy**: Prevents cross-origin requests from local files
- **Solution**: Use a local HTTP server

## Testing the Fix

1. Start the server using any option above
2. The analyzer will open automatically in your browser
3. Select document type and paste your letter
4. Click "Analyze My Letter"

**Should work perfectly now!** 🎉

## Server Features

- **Auto-opens browser** to the correct URL
- **CORS headers** included for API calls
- **Shows console output** for debugging
- **Press Ctrl+C** to stop server

## Troubleshooting

If still getting "Failed to fetch":

1. **Check internet connection**
2. **Verify API key** in `config.js`
3. **Open browser console** (F12) for specific errors
4. **Try a different browser** (Chrome, Firefox, Edge)

The server solves 99% of "Failed to fetch" issues!
