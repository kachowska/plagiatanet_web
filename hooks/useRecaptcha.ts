import { useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        getResponse: (optWidgetId?: number) => string;
        reset: (optWidgetId?: number) => void;
        render: (container: string | HTMLElement, parameters: any) => number;
        ready: (callback: () => void) => void;
        execute: (siteKey: string, params?: { action?: string }) => Promise<string>;
      };
    };
  }
}

export const useRecaptcha = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Проверяем, не загружен ли уже reCAPTCHA
    if (window.grecaptcha?.enterprise) {
      setLoaded(true);
      return;
    }

    // Проверяем, не загружается ли уже скрипт
    const existingScript = document.querySelector('script[src*="recaptcha/enterprise.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.grecaptcha?.enterprise) {
          setLoaded(true);
        }
      });
      existingScript.addEventListener('error', () => {
        setError(new Error('Failed to load reCAPTCHA'));
      });
      return;
    }

    // Создаём и загружаем скрипт с site key в URL (как указано в документации Google Cloud Console)
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LfiAhMsAAAAAJZ60cGtcDDTFMVchXhPtbYQ25x8';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Даём время reCAPTCHA инициализироваться
      if (window.grecaptcha?.enterprise?.ready) {
        window.grecaptcha.enterprise.ready(() => {
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
