import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../App';
import { VIEWPOINTS, GeneratedImage } from '../types';
import { generateStylizedImage } from '../services/geminiService';

export const ResultsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { uploadedImage, selectedStyle, generatedImages, setGeneratedImages } = useAppState();
  const hasInitiatedGeneration = useRef(false);

  useEffect(() => {
    if (!uploadedImage || !selectedStyle) {
      navigate('/');
      return;
    }

    // If we already have images or started generation, don't restart
    if (generatedImages.length > 0 || hasInitiatedGeneration.current) return;

    hasInitiatedGeneration.current = true;

    // Initialize placeholders
    const initialPlaceholders: GeneratedImage[] = VIEWPOINTS.map(vp => ({
      id: vp.id,
      viewpoint: vp.name,
      url: '',
      isLoading: true
    }));
    setGeneratedImages(initialPlaceholders);

    // Trigger generation for each viewpoint
    // We'll do them in parallel batches to not overwhelm browser/api limits if real
    // For demo with Gemini Flash, 8 parallel might be okay, but let's do simple loop
    const generateAll = async () => {
      // Create a copy to update
      let currentImages = [...initialPlaceholders];

      // Use a loop to update one by one or in small groups for visual progress
      for (let i = 0; i < initialPlaceholders.length; i++) {
        const item = initialPlaceholders[i];
        
        try {
          const resultUrl = await generateStylizedImage(
            uploadedImage, 
            selectedStyle.promptModifier, 
            item.viewpoint
          );

          // Update state
          setGeneratedImages(prev => prev.map(img => 
            img.id === item.id ? { ...img, url: resultUrl, isLoading: false } : img
          ));
        } catch (e) {
          console.error(`Failed to generate ${item.viewpoint}`, e);
          setGeneratedImages(prev => prev.map(img => 
             img.id === item.id ? { ...img, isLoading: false } : img // Leave url empty or set error placeholder
          ));
        }
      }
    };

    generateAll();
  }, [uploadedImage, selectedStyle, generatedImages.length, navigate, setGeneratedImages]);

  const handleDownload = () => {
    alert("Downloading functionality would zip these images!");
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-app-bg-light dark:bg-app-bg-dark font-display">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-white/10 px-6 sm:px-10 lg:px-16 py-4 sticky top-0 z-50 bg-app-bg-light/80 dark:bg-app-bg-dark/80 backdrop-blur-sm">
        <div className="flex items-center gap-4 text-slate-900 dark:text-white">
          <div className="size-6 text-brand-blue">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">nano banana pro</h2>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-brand-blue text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span className="truncate hidden sm:inline">Create New</span>
        </button>
      </header>

      <main className="layout-container flex h-full grow flex-col">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left Context Panel */}
          <aside className="w-full lg:w-1/3 lg:max-w-sm xl:max-w-md p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10 flex flex-col gap-8 bg-surface-light dark:bg-transparent">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => navigate('/')} className="text-slate-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-brand-blue transition-colors">Home</button>
              <span className="text-slate-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
              <button onClick={() => navigate('/style-selection')} className="text-slate-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-brand-blue transition-colors">Style Selection</button>
              <span className="text-slate-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
              <span className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Results</span>
            </div>
            
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Your Generation</h3>
              
              {/* Original Photo Card */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">YOUR PHOTO</h4>
                <div 
                  className="bg-cover bg-center rounded-2xl aspect-square w-full shadow-sm" 
                  style={{ backgroundImage: `url("${uploadedImage}")` }}
                ></div>
              </div>
              
              {/* Applied Style Card */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">APPLIED STYLE</h4>
                <div className="flex items-center gap-4 rounded-2xl bg-slate-100 dark:bg-white/5 p-4 border border-slate-200 dark:border-white/10">
                  <div 
                    className="bg-cover bg-center rounded-lg aspect-square w-16 h-16 shrink-0" 
                    style={{ backgroundImage: `url("${selectedStyle?.imageUrl}")` }}
                  ></div>
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-slate-900 dark:text-white">{selectedStyle?.name}</p>
                    <p className="text-sm text-slate-500 dark:text-gray-400 line-clamp-2">{selectedStyle?.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto pt-6 flex flex-col gap-3">
              <button 
                onClick={handleDownload}
                className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-brand-blue text-white text-base font-bold leading-normal tracking-[0.015em] gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-brand-blue/20"
              >
                <span className="material-symbols-outlined">download</span>
                <span className="truncate">Download All (.zip)</span>
              </button>
              <button className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined">share</span>
                <span className="truncate">Share Collection</span>
              </button>
            </div>
          </aside>

          {/* Right Main Gallery */}
          <section className="w-full lg:w-2/3 p-6 lg:p-8 flex-1">
            <div className="flex flex-wrap justify-between items-baseline gap-4 mb-6">
              <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                Your '{selectedStyle?.name}' Style Photos
              </h1>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {generatedImages.map((img) => (
                <div 
                  key={img.id}
                  className="group relative bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden aspect-[3/4] shadow-sm transition-transform hover:scale-[1.02]"
                >
                  {img.isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse">
                      <div className="size-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin"></div>
                      <p className="text-xs font-bold text-brand-blue uppercase tracking-widest">Generating</p>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ 
                          backgroundImage: `url("${img.url}")` 
                        }}
                      >
                        {/* Gradient Overlay for Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                      </div>
                      
                      {/* Label */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-bold leading-tight shadow-black drop-shadow-md">{img.viewpoint}</p>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                         <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg">fullscreen</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};