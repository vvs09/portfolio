import React from 'react';
import ReactDOM from 'react-dom/client';
import Portfolio from './Portfolio.jsx';

// Set favicon dynamically. Embeds a base64-encoded PNG so no extra file is required.
// This runs before the React app is mounted.
(() => {
  try {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    // 32x32 swirling gradient icon encoded as base64.
    link.href =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEbklEQVR4nNVWTWxUVRT+vnvfnf8ZOoWWlramiIZqMAExGsAgGKAxpoBRF2h0IeyNJi6NGHSlGxITTZDERBfGlRoTEFAXTQRKIoZfo9SUFoSWwrS0nZk37917XLSFmelAB3Z8eZt33znnu98595x36Xlx1AUBWJ9lBdR9+DyoBPeTn3siuE949Rg5OicWdAAAAkpDU+rSNA+BRSiULJo60NniWuOIFTB1hZcHOTDOcS2a86WOs8dUZnd3GyFLbbJ0s9u60q1eiMYJ5Ab57yiHSyiFDAY5cIanJjB5dym3FFQaUUKEa133DvtmFg1jGP1W7z+qenO4IQgAEGyUxqw0Wro88xU6pA4FIUvr3As77S4D/sehz/XeAV4AqKATaIurDsW4z5tFN2jtqIMjTc3oVQpmPloGD8nyN+zrEQR5TO3Tnw2wX4ENWLFM3mrQT8FkQqNKxhX0WM6dGJn8quifJaM1U6RmeW9NAgHUVrctC2Nge/UvF/i3Alply5pwXxt6lJcNDYKoCmKei2eTC15c0v5lqmG7OP/uNZgOTUvbJG2r3HKg4BAc5wlAUnhkVbjbafeP2j9q+4LilGcXp9TGWGpDYMJAJVOpDwKM+7nf5uqoPqYC1ykdWRgHfwLjoxwFpMP1lHizT709LudpFUAEdjT/Q9rvXrB0dxjLBJ7nPfpO6eQfCPNVzVujkxuRNrAK051FgFFZdFp/PI7zGnGFqBIvajqNbprIHbx+aY+fgJ90QWsXF6+BC2rWgLPPtIiiQuhgE0wuwkKAV9XhHE9rxGacCJGgIfOy0lH/2sHiRG+YjAYp41qehLiaBBUrl3klgC90mmYtngYwwqMhCmW9wtBej8VXRiIPi7PByOEwpmxCScPiuQGr3zV0P4cu8rKC9hms4brVfCZE0cHeKpJAyKgx7SbSAcDlL4YxK0kDXZrbCNUEBAsofqcPWQWhIs1reucm/UqKWYETuCQXRRCJRVcY85BjCAB0ktBIGkwMQKoJagw7D+Z3nlzI71/idsLzoLvVjlW656rcmKTtd8f/Cg+1pHdZVQpKQwQk0yapJDyfQ8dAPR+BAISC/hFHLmBoPZ5vxjKHZCAuj7E/wwOD7mRL6r1E8tlc8efQvwiBLNuATJr9B3jpFLS5E0HZLBKQ9OCdk3Pn5GxS0gYRX/IF5A1b2xIfZRI9RVzNXftCwhKbutwT22DH1ZFPYEN4kaoqlCuonIhEAl1KkqHkLGHQtUStS0e7TbS9oAaHRz4sTZ2hSdlNe5Bt1j+9y/5jMLG5w256ms5ZBgBRzKTdlrRsjKJT6wZEWDLDk+wdK3wT+ENMtLjNn7rH1utf32ff19CRsonJKoI7gE4QKCQ8NClmhEGIa1YmGG1G63Pu8Vchw+zbyytn4UXLgkrdBDMmImJBKp2haWa8XZJNjj7GTmGsHyC0KUvBPSlAmbFgdqoLxEIE1KBX9h+pjTpuFbf9OZNl6op81HC4rUDdxfAOmPe2UmGgaq7WQv07qMCDf3X8H0RF3lEYYecnAAAAAElFTkSuQmCC';
    document.head.appendChild(link);
  } catch (err) {
    // Ignore any errors (e.g., document undefined during SSR)
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);
