import { useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      getResponse: () => string;
      reset: () => void;
      render: (container: string | HTMLElement, parameters: any) => number;
      ready: (callback: () => void) => void;
    };
  }
}

export const useRecaptcha = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Проверяем, не загружен ли уже reCAPTCHA
    if (window.grecaptcha) {
      setLoaded(true);
      return;
    }

    // Проверяем, не загружается ли уже скрипт
    const existingScript = document.querySelector('script[src*="recaptcha"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.grecaptcha) {
          setLoaded(true);
        }
      });
      existingScript.addEventListener('error', () => {
        setError(new Error('Failed to load reCAPTCHA'));
      });
      return;
    }

    // Создаём и загружаем скрипт
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Даём время reCAPTCHA инициализироваться
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          setLoaded(true);
        });
      } else {
        // Fallback для старых версий
        setTimeout(() => {
          setLoaded(true);
        }, 100);
      }
    };
    
    script.onerror = () => {
      setError(new Error('Failed to load reCAPTCHA'));
    };

    document.head.appendChild(script);

    // Cleanup не удаляем скрипт, так как reCAPTCHA может использоваться повторно
    return () => {
      // Скрипт остаётся в DOM для повторного использования
    };
  }, []);

  return { loaded, error };
};
