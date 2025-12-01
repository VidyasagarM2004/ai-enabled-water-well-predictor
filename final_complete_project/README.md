# AI-Enabled Water Well Predictor

A production-grade React application for AI-powered groundwater prediction and water well site analysis.

## 🚀 Features

### Authentication & Security
- Secure JWT-based authentication
- Role-based access control (Admin/User)
- Strong password validation
- Session management with auto-logout

### Core Functionality
- **AI Groundwater Prediction**: ML-powered analysis of optimal drilling locations
- **GPS & Map Integration**: Real-time location tracking with interactive maps
- **Soil & Rock Database**: Comprehensive geological data explorer
- **Weather Integration**: Current conditions and historical weather data
- **AI Chat Assistant**: Conversational interface for expert guidance

### Technical Features
- **Dark Mode Support**: System-wide theme switching
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Offline Support**: Service worker caching for predictions
- **PDF Export**: Generate detailed prediction reports
- **Real-time Updates**: Live weather and location data

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts
- **Maps**: Leaflet + React Leaflet
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-water-well-predictor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Add your API keys to `.env`:
   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_OPENAI_API_KEY=your_openai_api_key (optional)
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Accounts

For testing purposes, use these demo accounts:

- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.jsx      # Main layout wrapper
│   └── ProtectedRoute.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Login.jsx       # Authentication
│   ├── Prediction.jsx  # AI prediction interface
│   ├── MapView.jsx     # GPS & mapping
│   ├── SoilData.jsx    # Geological database
│   ├── Weather.jsx     # Weather insights
│   └── Chat.jsx        # AI assistant
├── store/              # Redux store & slices
│   ├── authSlice.js    # Authentication state
│   ├── predictionSlice.js # Prediction data
│   ├── weatherSlice.js # Weather data
│   └── themeSlice.js   # Theme management
├── services/           # API services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── App.jsx            # Main app component
```

## 🌟 Key Features Explained

### AI Prediction Engine
- Analyzes soil type, rock formation, and depth parameters
- Generates confidence scores and water level predictions
- Provides drilling recommendations and optimal timing
- Exports detailed PDF reports

### Interactive Mapping
- Real-time GPS location tracking
- Multiple map layers (street, satellite, terrain)
- Click-to-mark potential drilling sites
- Distance calculations between locations

### Weather Integration
- Current weather conditions via OpenWeatherMap API
- 7-day historical weather charts
- Impact analysis on groundwater levels
- Drilling condition recommendations

### AI Chat Assistant
- Natural language processing for user queries
- Pre-built FAQ responses
- Context-aware recommendations
- Real-time conversation interface

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Configuration

### API Keys Setup
- **OpenWeatherMap**: Get free API key at [openweathermap.org](https://openweathermap.org/api)
- **OpenAI** (Optional): For enhanced AI chat features

### Environment Variables
```env
# Required for weather features
VITE_OPENWEATHER_API_KEY=your_key_here

# Optional for enhanced AI chat
VITE_OPENAI_API_KEY=your_key_here

# Optional Firebase config
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
```

## 🧪 Testing

Run the development server and test with demo accounts:

```bash
npm run dev
```

### Test Scenarios
1. **Authentication**: Login/logout with demo accounts
2. **Prediction**: Generate predictions with different parameters
3. **Mapping**: Test GPS location and site marking
4. **Weather**: Verify weather data loading
5. **Chat**: Interact with AI assistant
6. **Responsive**: Test on different screen sizes

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- JWT token-based authentication
- Role-based route protection
- Input validation and sanitization
- Secure API key handling
- XSS protection

## 🎨 Customization

### Theme Customization
Edit `tailwind.config.js` to customize colors and styling:

```javascript
theme: {
  extend: {
    colors: {
      primary: "your-primary-color",
      // ... other customizations
    }
  }
}
```

### Adding New Features
1. Create new page in `src/pages/`
2. Add route in `App.jsx`
3. Create Redux slice if needed
4. Add navigation link in `Layout.jsx`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the demo account features

## 🔄 Updates

The application includes:
- Automatic dependency updates
- Security patches
- Feature enhancements
- Performance optimizations

---

**Built with ❤️ for sustainable water resource management**