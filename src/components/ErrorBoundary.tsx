import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('UI error', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto text-xl font-black">
              !
            </div>
            <h1 className="text-lg font-extrabold text-stone-900">Terjadi Kesalahan Tampilan</h1>
            <p className="text-xs text-stone-600 leading-relaxed">
              Aplikasi menemui kesalahan yang tidak terduga. Muat ulang halaman untuk kembali.
              Progres latihan di perangkat ini tetap tersimpan.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs cursor-pointer"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}