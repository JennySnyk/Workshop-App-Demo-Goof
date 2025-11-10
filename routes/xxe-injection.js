const express = require('express');
const router = express.Router();
const libxmljs = require('libxmljs');
const fs = require('fs');

/**
 * XXE (XML External Entity) Injection Vulnerability
 * 
 * This endpoint is vulnerable to XXE attacks because it parses
 * XML input without properly disabling external entity processing.
 * 
 * Attack Example:
 * POST /xxe/parse with XML body:
 * <?xml version="1.0"?>
 * <!DOCTYPE foo [
 *   <!ENTITY xxe SYSTEM "file:///etc/passwd">
 * ]>
 * <root>&xxe;</root>
 * 
 * This can lead to:
 * - Disclosure of confidential data (reading local files)
 * - Server-Side Request Forgery (SSRF)
 * - Denial of Service attacks
 * - Port scanning from the server's perspective
 */

// Vulnerable XML parsing endpoint
router.post('/xxe/parse', (req, res) => {
  try {
    const xmlInput = req.body.xml || req.body;
    
    // VULNERABILITY: Parsing XML with external entities enabled
    // This allows attackers to read files, perform SSRF, etc.
    const xmlDoc = libxmljs.parseXml(xmlInput, {
      noent: true,  // DANGEROUS: Enables entity substitution
      dtdload: true, // DANGEROUS: Allows DTD loading
      dtdvalid: true // DANGEROUS: Enables DTD validation
    });

    const result = xmlDoc.toString();
    
    res.json({
      message: 'XML parsed successfully',
      parsedContent: result,
      warning: '⚠️ This endpoint is vulnerable to XXE attacks!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Invalid XML',
      details: error.message
    });
  }
});

// Alternative vulnerable endpoint using string-based XML processing
router.post('/xxe/process', (req, res) => {
  try {
    const xmlString = req.body.xml;
    
    if (!xmlString) {
      return res.status(400).json({ error: 'No XML provided' });
    }

    // VULNERABILITY: No sanitization before parsing
    const doc = libxmljs.parseXmlString(xmlString, {
      noent: true,    // Entity substitution enabled
      dtdload: true,  // DTD loading enabled
      dtdvalid: true, // DTD validation enabled
      nocdata: false
    });

    // Extract and return all text content
    const rootNode = doc.root();
    const textContent = rootNode ? rootNode.text() : '';

    res.json({
      success: true,
      content: textContent,
      warning: '⚠️ XXE vulnerability present!'
    });
  } catch (error) {
    res.status(500).json({
      error: 'XML processing failed',
      message: error.message
    });
  }
});

// Endpoint to demonstrate the vulnerability with file reading
router.get('/xxe/demo', (req, res) => {
  const demoPage = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>XXE Vulnerability Demo</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .warning { background: #ff4444; color: white; padding: 15px; border-radius: 5px; }
        .example { background: #f4f4f4; padding: 15px; margin: 20px 0; border-radius: 5px; }
        code { background: #333; color: #0f0; padding: 2px 5px; border-radius: 3px; }
        pre { background: #333; color: #0f0; padding: 15px; overflow-x: auto; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h1>⚠️ XXE (XML External Entity) Injection Vulnerability</h1>
      
      <div class="warning">
        <strong>WARNING:</strong> This endpoint demonstrates a critical security vulnerability!
      </div>
      
      <h2>What is XXE?</h2>
      <p>XML External Entity (XXE) injection is a web security vulnerability that allows an attacker to interfere with an application's processing of XML data. It can lead to disclosure of confidential data, server-side request forgery (SSRF), and denial of service attacks.</p>
      
      <h2>Example Attack:</h2>
      <div class="example">
        <h3>1. Read Local File (e.g., /etc/passwd)</h3>
        <pre>
POST /xxe/parse
Content-Type: application/json

{
  "xml": "<?xml version=\\"1.0\\"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM \\"file:///etc/passwd\\">]><root>&xxe;</root>"
}
        </pre>
      </div>
      
      <div class="example">
        <h3>2. Server-Side Request Forgery (SSRF)</h3>
        <pre>
POST /xxe/parse
Content-Type: application/json

{
  "xml": "<?xml version=\\"1.0\\"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM \\"http://internal-server/admin\\">]><root>&xxe;</root>"
}
        </pre>
      </div>
      
      <div class="example">
        <h3>3. Denial of Service (Billion Laughs Attack)</h3>
        <pre>
POST /xxe/parse
Content-Type: application/json

{
  "xml": "<?xml version=\\"1.0\\"?><!DOCTYPE lolz [<!ENTITY lol \\"lol\\"><!ENTITY lol2 \\"&lol;&lol;\\"><!ENTITY lol3 \\"&lol2;&lol2;\\">]><root>&lol3;</root>"
}
        </pre>
      </div>
      
      <h2>How to Fix:</h2>
      <ul>
        <li>Disable XML external entity processing</li>
        <li>Use less complex data formats like JSON when possible</li>
        <li>Patch or upgrade XML processors and libraries</li>
        <li>Implement proper input validation</li>
        <li>Use XML parsers with secure defaults</li>
      </ul>
      
      <h2>Test the Vulnerability:</h2>
      <p>Use curl to test:</p>
      <pre>
curl -X POST http://localhost:3000/xxe/parse \\
  -H "Content-Type: application/json" \\
  -d '{"xml":"<?xml version=\\"1.0\\"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM \\"file:///etc/passwd\\">]><root>&xxe;</root>"}'
      </pre>
    </body>
    </html>
  `;
  
  res.send(demoPage);
});

module.exports = router;

