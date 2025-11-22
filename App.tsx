import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { StyleOption, GeneratedImage } from './types';
import { LandingScreen } from './components/LandingScreen';
import { StyleSelectionScreen } from './components/StyleSelectionScreen';
import { ResultsScreen } from './components/ResultsScreen';

// --- Context ---
interface AppState {
  uploadedImage: string | null;
  setUploadedImage: (img: string | null) => void;
  selectedStyle: StyleOption | null;
  setSelectedStyle: (style: StyleOption | null) => void;
  generatedImages: GeneratedImage[];
  setGeneratedImages: (imgs: GeneratedImage[]) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within an AppProvider");
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  return (
    <AppContext.Provider value={{
      uploadedImage, setUploadedImage,
      selectedStyle, setSelectedStyle,
      generatedImages, setGeneratedImages
    }}>
      {children}
    </AppContext.Provider>
  );
};

// --- Layout Wrappers ---
const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/style-selection" element={<ProtectedRoute><StyleSelectionScreen /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><ResultsScreen /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { uploadedImage } = useAppState();
  if (!uploadedImage) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default App;