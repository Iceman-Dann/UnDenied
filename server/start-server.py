#!/usr/bin/env python3
"""
Simple HTTP server for UnDenied analyzer
Run this to avoid CORS issues when testing locally
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        # Route HTML files to /src/ directory
        if self.path == '/':
            self.path = '/src/index.html'
        elif self.path.endswith('.html') and not self.path.startswith('/src/'):
            self.path = '/src' + self.path
        return super().do_GET()

if __name__ == "__main__":
    # Change to project root directory
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 UnDenied server running at http://localhost:{PORT}")
        print("📄 Open main page at: http://localhost:8000")
        print("🛑 Press Ctrl+C to stop server")
        
        # Auto-open browser to root
        webbrowser.open(f'http://localhost:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
