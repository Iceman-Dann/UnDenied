const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src', 'config.js');
console.log(`Checking for config file at: ${configPath}`);

try {
  let configContent = fs.readFileSync(configPath, 'utf8');

  if (process.env.GEMINI_API_KEY) {
    console.log('Found GEMINI_API_KEY in environment variables.');
    // Replace the default or empty key with the one from the environment
    configContent = configContent.replace(
      /GEMINI_API_KEY:\s*['"](.*?)['"]/,
      `GEMINI_API_KEY: '${process.env.GEMINI_API_KEY}'`
    );
    
    fs.writeFileSync(configPath, configContent);
    console.log('Successfully injected GEMINI_API_KEY into config.js');
  } else {
    console.warn('Warning: GEMINI_API_KEY not found in environment variables. Using default key in config.js.');
  }
} catch (error) {
  console.error('Error during build step:', error);
  process.exit(1);
}
