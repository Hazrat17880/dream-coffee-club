'use client';

import { useRef, useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function AdvancedQRCode() {
  // Set your menu URL as default
  const MENU_URL = 'https://dream-coffee-club.vercel.app/menu-list';
  
  const [text, setText] = useState(MENU_URL);
  const [qrValue, setQrValue] = useState(MENU_URL);
  const [showCustom, setShowCustom] = useState(false);
  const qrRef = useRef(null);

  // Auto-generate QR on page load
  useEffect(() => {
    setQrValue(MENU_URL);
  }, []);

  const generateQR = () => {
    if (text.trim()) {
      setQrValue(text);
    }
  };

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'menu-qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const resetToMenu = () => {
    setText(MENU_URL);
    setQrValue(MENU_URL);
    setShowCustom(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Menu QR Code Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">🍕 Menu QR Code</h1>
            <p className="text-gray-500 text-sm mt-1">Scan to view our full menu</p>
          </div>
          
          {/* QR Code Display */}
          <div className="flex justify-center mb-6">
            <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-inner">
              <QRCodeCanvas 
                value={qrValue}
                size={220}
                level="H"
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            </div>
          </div>
          
          {/* URL Display */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-500 mb-1">📱 When scanned, opens:</p>
            <p className="text-sm font-mono text-blue-600 break-all">{qrValue}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={downloadQR}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              📥 Download QR Code
            </button>
            <button
              onClick={() => setShowCustom(!showCustom)}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              ✏️ Custom URL
            </button>
          </div>
        </div>

        {/* Custom URL Section (Expandable) */}
        {showCustom && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Custom QR Code</h3>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter any URL or text..."
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
            />
            
            <div className="flex gap-3">
              <button
                onClick={generateQR}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Generate Custom QR
              </button>
              <button
                onClick={resetToMenu}
                className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Reset to Menu
              </button>
            </div>
          </div>
        )}

        {/* Instructions Card */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            📌 How to use this QR code:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click "Download QR Code" to save the image</li>
            <li>• Print and display at your restaurant tables</li>
            <li>• Customers scan with their phone camera</li>
            <li>• Automatically opens your menu at: {MENU_URL}</li>
          </ul>
        </div>

        {/* Preview for Testing */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Current menu URL: <span className="font-mono">{MENU_URL}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            ⚠️ For production, change to your actual domain (e.g., https://yourdomain.com/menu-list)
          </p>
        </div>
      </div>
    </div>
  );
}