# Vipraghna Srikakulapu - Portfolio

A modern, accessible, and performant portfolio website built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎨 Design & UX
- **Responsive Design**: Optimized for all device sizes with mobile-first approach
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Smooth Animations**: Framer Motion animations with reduced motion support
- **Modern UI**: Clean, professional design using shadcn/ui components
- **Scroll Progress**: Visual progress indicator showing page scroll position

### ♿ Accessibility
- **WCAG 2.2 AA Compliant**: Full accessibility support
- **Keyboard Navigation**: Complete keyboard navigation support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Reduced Motion**: Respects user's motion preferences

### 📱 Mobile Experience
- **Mobile Navigation**: Collapsible hamburger menu for mobile devices
- **Touch-Friendly**: Optimized touch targets and gestures
- **Responsive Typography**: Scales appropriately across devices
- **Mobile-First**: Designed with mobile users in mind

### 🚀 Performance
- **Fast Loading**: Optimized bundle size and loading times
- **Lazy Loading**: Components load as needed
- **Code Splitting**: Efficient code organization
- **Loading States**: Smooth loading experiences with spinners
- **Error Handling**: Graceful error states and recovery

### 🔍 SEO & Analytics
- **Meta Tags**: Comprehensive Open Graph and Twitter Card support
- **Structured Data**: JSON-LD schema for better search visibility
- **Semantic HTML**: Proper heading hierarchy and content structure
- **Performance Optimized**: Fast Core Web Vitals scores

### 📧 Contact Form
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during form submission
- **Success/Error Handling**: Clear feedback for form submissions
- **Accessible Forms**: Proper labels and error associations

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Optimized for static hosting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── tooltip.jsx
│   │   └── index.js
│   └── LoadingSpinner.jsx  # Loading component
├── Portfolio.jsx           # Main portfolio component
└── main.jsx               # App entry point
```

## 🎯 Key Improvements Made

### 1. **Accessibility Enhancements**
- Added proper ARIA labels and roles
- Implemented keyboard navigation
- Added focus management
- Screen reader optimizations

### 2. **Mobile Experience**
- Responsive navigation menu
- Touch-friendly interactions
- Mobile-optimized layouts

### 3. **Performance Optimizations**
- Lazy loading implementation
- Code splitting
- Reduced motion support
- Optimized animations

### 4. **User Experience**
- Loading states and error handling
- Form validation and feedback
- Smooth scrolling and navigation
- Active section highlighting

### 5. **SEO & Discoverability**
- Comprehensive meta tags
- Structured data markup
- Semantic HTML structure
- Open Graph and Twitter Cards

## 🔧 Customization

### Updating Content
Edit the data objects in `src/Portfolio.jsx`:
- `profile`: Personal information
- `experiences`: Work experience
- `projects`: Portfolio projects
- `skills`: Technical skills
- `education`: Educational background

### Styling
- Colors and themes are defined in `index.html`
- Component styles use Tailwind CSS classes
- Custom CSS can be added to the `<style>` section

### Adding New Sections
1. Add section data to the appropriate object
2. Create a new `Section` component in the JSX
3. Add navigation link to the header

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
