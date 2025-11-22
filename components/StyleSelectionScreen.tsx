import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../App';
import { STYLES, StyleOption } from '../types';

export const StyleSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { uploadedImage, selectedStyle, setSelectedStyle, setGeneratedImages } = useAppState();

  // Reset generation state when entering style selection
  useEffect(() => {
    setGeneratedImages([]);
  }, [setGeneratedImages]);

  const handleGenerate = () => {
    if (selectedStyle) {
      navigate('/results');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-app-bg-light dark:bg-app-bg-dark font-display group/design-root">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 sm:px-6 lg:px-8 xl:px-40">
          <div className="layout-content-container flex max-w-5xl flex-1 flex-col gap-8">
            
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 sm:px-6 lg:px-10 py-3">
              <div className="flex items-center gap-4 text-white">
                <div className="size-5 text-brand-blue">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">nano banana pro</h2>
              </div>
              <div className="flex flex-1 justify-end">
                <button className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium leading-normal text-slate-500 dark:text-white/80 transition hover:bg-white/10 hover:text-white">
                  <span className="material-symbols-outlined !text-xl">help</span>
                  Help
                </button>
              </div>
            </header>

            <main className="flex flex-col gap-8 px-4 pb-32">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Choose Your Style</p>
                  <p className="text-slate-500 dark:text-white/60 text-base font-normal leading-normal">Select a style below to transform your photo</p>
                </div>
              </div>

              {/* Uploaded Photo Preview */}
              <div className="w-full">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Your Photo</h3>
                <div className="p-4 @container">
                  <div className="flex flex-col items-stretch justify-start rounded-2xl bg-white dark:bg-white/5 @xl:flex-row @xl:items-start p-4 border border-border-light dark:border-none">
                    <div 
                      className="w-full @xl:w-1/3 bg-center bg-no-repeat aspect-square @xl:aspect-video bg-cover rounded-xl shadow-inner" 
                      style={{ backgroundImage: `url("${uploadedImage}")` }}
                    ></div>
                    <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-6">
                      <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Uploaded Portrait</p>
                      <div className="flex items-end justify-between gap-3">
                        <p className="text-slate-500 dark:text-white/60 text-base font-normal leading-normal">This is the photo we'll apply the style to.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Style Grid */}
              <div className="w-full">
                <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Select a Style</h2>
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {STYLES.map((style) => {
                    const isSelected = selectedStyle?.id === style.id;
                    return (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-200
                          ${isSelected 
                            ? 'ring-4 ring-brand-blue ring-offset-2 ring-offset-app-bg-light dark:ring-offset-app-bg-dark' 
                            : 'ring-2 ring-transparent hover:ring-brand-blue/50'
                          }
                        `}
                      >
                        {/* Selection Overlay */}
                        <div className={`absolute inset-0 z-10 items-center justify-center bg-black/50 ${isSelected ? 'flex' : 'hidden group-hover:flex'}`}>
                          <div className="flex size-12 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg">
                            <span className="material-symbols-outlined !text-3xl">check</span>
                          </div>
                        </div>
                        
                        {/* Image */}
                        <div 
                          className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105" 
                          style={{ backgroundImage: `url("${style.imageUrl}")` }}
                        ></div>
                        
                        {/* Label */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-12">
                          <p className="text-lg font-bold text-white">{style.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
      
      {/* Sticky Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 flex w-full flex-col items-center gap-4 bg-gradient-to-t from-app-bg-light via-app-bg-light to-transparent dark:from-app-bg-dark dark:via-app-bg-dark px-4 py-8 z-20 pointer-events-none">
        <button 
          onClick={handleGenerate}
          disabled={!selectedStyle}
          className={`flex w-full max-w-sm items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold text-white transition-all shadow-lg pointer-events-auto
            ${selectedStyle 
              ? 'bg-brand-blue hover:bg-brand-blue/90 hover:scale-[1.02]' 
              : 'bg-slate-400 cursor-not-allowed opacity-50'
            }
          `}
        >
          <span>Generate Photos</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};