import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../App';

export const LandingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setUploadedImage } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUploadedImage(base64);
      navigate('/style-selection');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-landing-bg-light dark:bg-landing-bg-dark text-slate-900 dark:text-white">
      {/* Main Content Wrapper */}
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center p-4 sm:p-6 md:p-8">
          <div className="flex w-full max-w-5xl flex-col items-center gap-12 md:gap-20">
            
            {/* TopNavBar */}
            <header className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-6 text-brand-yellow">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold">nano banana pro</h2>
              </div>
              <button className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-slate-200/80 px-4 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-300/80 dark:bg-slate-800/80 dark:text-white dark:hover:bg-slate-700/80">
                <span className="truncate">Sign In</span>
              </button>
            </header>

            {/* Hero & Upload Section */}
            <main className="flex w-full max-w-3xl flex-col items-center gap-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
                  Reimagine Your Photos in Seconds
                </h1>
                <p className="max-w-xl text-base text-muted-light dark:text-muted-dark sm:text-lg">
                  Upload a photo, choose a style, and let nano banana pro generate unique images of you from every angle.
                </p>
              </div>

              {/* EmptyState (Upload Area) */}
              <div className="w-full">
                <div 
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed border-border-light bg-surface-light p-8 transition-colors hover:border-brand-yellow/80 dark:border-border-dark dark:bg-surface-dark dark:hover:border-brand-yellow/80 sm:p-14"
                >
                  <span className="material-symbols-outlined text-4xl text-muted-light dark:text-muted-dark">cloud_upload</span>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-lg font-bold">Drag & Drop Your Photo Here</p>
                    <p className="text-sm text-muted-light dark:text-muted-dark">or click to browse your files</p>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-yellow px-6 text-base font-bold text-black transition-transform hover:scale-105 active:scale-95"
                  >
                    <span className="truncate">Upload Photo</span>
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </main>

            {/* FeatureSection (How It Works) */}
            <section className="flex w-full flex-col gap-10">
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Create stunning new portraits with AI</h2>
                <p className="max-w-2xl text-base text-muted-light dark:text-muted-dark sm:text-lg">
                  Our process is designed to be intuitive and fast, getting you from your original photo to a collection of new, stylized images in no time.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  { icon: 'upload', title: '1. Upload Your Photo', text: 'Start with a clear, high-quality photo of yourself. For best results, use a headshot with good lighting.' },
                  { icon: 'palette', title: '2. Choose Your Style', text: 'Browse through our library of artistic styles and select the one that best fits your vision.' },
                  { icon: 'auto_awesome', title: '3. Generate & Download', text: 'Our AI gets to work, generating a set of unique images from different angles in your chosen style.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-4 rounded-xl border border-border-light bg-surface-light p-6 text-center dark:border-border-dark dark:bg-surface-dark md:text-left">
                    <div className="flex justify-center md:justify-start">
                      <div className="flex size-12 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-yellow">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-light dark:text-muted-dark">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Example Gallery */}
            <section className="flex w-full flex-col gap-8 text-center pb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">See the Magic</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6dAOoIlchr9QeyjUyygkbWGmb0K-zNB59mMEi6-tqr9uwJechP1n5A1UDbXwvChN1eVriEWxGkXGVWGQQPdZsiNnCRsyGII5Fo-9FfeOw7pcTf2im0KvajeYLbVoDBM8K4oyFftHGp2p0B9FibVI2a-6FJkvZFqOdqYDSPHKFr0OqQGh8MXj_kjY70UPgiLrZ-sGxXg2QjaCYsAxN4sWG5SPDja-w4ZsBcLrw3GMlHzmyEWrU8fgtqaEj3sPzFq_74cfQNTssks',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDG7Z4MHpP3OXzoEo5TV4GM7TlUbZ0AbSzLbz-gQ7fSGWYG4iUPTGG21w3BxEMYNt6ejC85IiV5ABTV4s-PaIdEirSWkbJRQcQhhwsJ0mAFH1bJoP4CX8COxBbfvozzoxNU9DIDm1tca38ibdSa5iperQoypLV2cfLVM-kukeKc4L91rFRwl6ujpQFDaO0lV7GEEXjpnhwuGU91DQs_KNvTTF2q7qkDJSmHJEf9mdh8Bs0Bw-Uc7sj3kjA8yk8GAzV6zC5w2CjjxMo',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBmz-VzsFHmi7ld5Tbzh5yk2nME6J_Nyqmhf8IVB8AY47-86TB45GLcezJq3e670q-YJUckfR8Z3x-cNkCrMIq3Ku8BUUGcWOAq89WwrOvGQA-KCNeTYEA2u_8gXR7U-3SQhkwUI4mG16h0lWN9b9Rl4929cAY9b23YyCkqYI3rJxDKYqT91sjPjyBR9wIF2F3ncuJ9MJtQ5Rdzeu2EEaZ3h6Ot3mdppGykrNW9y7guHPwcKN9Qtu019GRgozqVGvnSm0IaTyVllJs',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBzfKvyUArVI9isGYo6AhOID5O0KvsWEHlpD3lSxTanVsyyh7re0QkLXj4LQRie-HWgTTiYCyjTZ-sDQ-lqg1utyyoRUuPpR0IHl24xhM3JfOzIk-trxJ3dHjIMeA8VxTpb2HCQw7zEf9u5iP3QWfRK44TwdPCZtpG6ZwDRKwq8mhodYdBsbVze4rPAKgVxLDSfOvnRLfdObe3v7DkHkV8FjRbax9QVeoaDjP0W9oNUbO_r6oAKlUT9QLWnceisLdRDa-UyP7YtBKA'
                ].map((url, i) => (
                  <div key={i} className="aspect-square w-full rounded-xl bg-cover bg-center" style={{ backgroundImage: `url('${url}')` }}></div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="flex w-full flex-col items-center gap-4 border-t border-border-light pt-8 pb-8 dark:border-border-dark">
              <div className="flex gap-6">
                {['Privacy Policy', 'Terms of Service', 'Contact'].map(link => (
                  <a key={link} href="#" className="text-sm text-muted-light transition-colors hover:text-slate-900 dark:text-muted-dark dark:hover:text-white">
                    {link}
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-light dark:text-muted-dark">© 2024 nano banana pro. All rights reserved.</p>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};